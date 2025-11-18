import { useState, useEffect } from "react";
import { getRooms } from "./getInfo";

interface RoomSelectorProps {
  selectedRoom: any | null;
  onSelectRoom: (room: any) => void;
}

export default function RoomSelector({
  selectedRoom,
  onSelectRoom,
}: RoomSelectorProps) {
  const [query, setQuery] = useState("");
  const [rooms, setRooms] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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
    onSelectRoom(room);
    setQuery("");
    setFiltered([]);
  };

  return (
    <div className="w-80 bg-white relative">
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
              {room.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
