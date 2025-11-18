import { useState, useEffect } from "react";
import { getRooms } from "./getInfo"; // adjust path

export default function RoomSelector() {
  const [query, setQuery] = useState(""); // what user types
  const [rooms, setRooms] = useState<any[]>([]); // all results from API
  const [filtered, setFiltered] = useState<any[]>([]); // filtered results
  const [selected, setSelected] = useState<any>(null); // selected room
  const [loading, setLoading] = useState(false);

  // search rooms when query changes
  useEffect(() => {
    if (!query) {
      setFiltered([]);
      return;
    }

    setLoading(true);
    getRooms(query)
      .then((res) => {
        setRooms(res);
        setFiltered(res);
      })
      .finally(() => setLoading(false));
  }, [query]);

  const handleSelect = (room: any) => {
    setSelected(room);
    setQuery(""); // clear search box if you like
    setFiltered([]);
  };

  return (
    <div className="w-80 relative">
      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Search for a room..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && (
        <div className="absolute bg-white border p-2 w-full">Loading...</div>
      )}
      {filtered.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full max-h-48 overflow-auto mt-1 rounded shadow">
          {filtered.map((room) => (
            <li
              key={room.roomId}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(room)}
            >
              {room.label} {/* or room.name if available */}
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div className="mt-2 p-2 bg-gray-100 rounded">
          Selected Room: {selected.roomId}
        </div>
      )}
    </div>
  );
}
