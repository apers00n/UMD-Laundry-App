import { useState, useEffect } from "react";
import { getRooms } from "./getInfo";

interface RoomSelectorProps {
  onSelectRoom: (room: Room) => void;
}

type Room = {
  label: string;
  roomId: string;
};

export default function RoomSelector({ onSelectRoom }: RoomSelectorProps) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lastSelectedRoom");
    if (saved) {
      try {
        const room = JSON.parse(saved);
        onSelectRoom(room);
      } catch (err) {
        console.warn("Failed to parse saved room:", err);
        localStorage.removeItem("lastSelectedRoom"); // optional: clear bad data
      }
    }
  }, [onSelectRoom]);

  useEffect(() => {
    if (!query) {
      setFiltered([]);
      return;
    }

    setLoading(true);
    getRooms(query)
      .then((res) => {
        setFiltered(res);
      })
      .finally(() => setLoading(false));
  }, [query]);

  const handleSelect = (room: Room) => {
    onSelectRoom(room);
    setQuery("");
    setFiltered([]);

    localStorage.setItem("lastSelectedRoom", JSON.stringify(room));
  };

  return (
    <div className="w-80 relative">
      <div className="flex-row flex items-center gap-2  bg-white border p-2 rounded w-full">
        <input
          type="text"
          className="w-full"
          placeholder="Search for a room..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {query && (
          <button
            onClick={() => setQuery("")}
            className="px-2 rounded-full bg-[#EB5854] flex items-center justify-center"
          >
            <span className="text-white text-sm">X</span>
          </button>
        )}
      </div>
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
