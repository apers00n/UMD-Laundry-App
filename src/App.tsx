import { useEffect, useState } from "react";
import "@fontsource/jersey-10";
import "./index.css";
import RotatingSquare from "./rotating";
import { getMachines } from "./getInfo.tsx";
import RoomSelector from "./roomSelector.tsx";

declare global {
  interface Window {
    electronAPI: {
      close: () => void;
      minimize: () => void;
      toggleMaximize: () => void;
    };
  }
}

type Room = {
  label: string;
  roomId: string;
};

interface Machine {
  opaqueId: string;
  type: "washer" | "dryer";
  mode: string;
  timeRemaining: number;
  available: boolean;
}

export default function App() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    if (!selectedRoom) return;

    async function fetchMachines() {
      try {
        if (selectedRoom) {
          const machineData = await getMachines(selectedRoom.roomId);
          setMachines(machineData);
        }
      } catch (err) {
        console.error("Error fetching machines:", err);
      }
    }

    fetchMachines();
    const interval = setInterval(fetchMachines, 60000); // update every minute
    return () => clearInterval(interval);
  }, [selectedRoom]);

  const washers = machines.filter((m) => m.type === "washer");
  const dryers = machines.filter((m) => m.type === "dryer");

  return (
    <div className="overflow-hidden scrollbar-none border-b-3 border-r-3 h-screen rounded-lg">
      <div className="bg-[#A5D1F9] flex border-t-0 border-4 p-4 border-black w-full flex-row justify-between">
        <p className="text-5xl font-jersey text-white text-start">LAUNDRY</p>
        <div className="gap-2 flex flex-row">
          <button
            onClick={window.electronAPI.close}
            className="bg-[#E8E3E0] rounded-none flex justify-center items-center w-0 h-0 p-2 text-center border-b-2 border-r-2 "
          >
            <p className="text-xl ">X</p>
          </button>
          <button
            onClick={window.electronAPI.minimize}
            className="bg-[#E8E3E0] flex justify-center items-center w-0 h-0 p-2 text-center border-b-2 border-r-2"
          >
            <p className="text-xl ">-</p>
          </button>
          <button
            onClick={window.electronAPI.toggleMaximize}
            className="bg-[#E8E3E0] flex justify-center items-center w-0 h-0 p-2 text-center border-b-2 border-r-2"
          >
            <p className="text-xl">⤢</p>
          </button>
        </div>
      </div>

      {/* Info bar */}
      <div className="bg-[#F0E7DF] items-center flex border-double border-3 p-2 border-[#918F8F] w-full flex-row justify-start gap-10 px-4">
        <p className="text-xl font-jersey text-[#393939]">UMD</p>
        <p className="text-xl font-jersey text-[#393939]">
          {selectedRoom ? selectedRoom.label : "Select a room"}
        </p>
        <p className="text-xl font-jersey text-[#393939]">
          {washers.length} Wash
        </p>
        <p className="text-xl font-jersey text-[#393939]">
          {dryers.length} Dry
        </p>
        <RoomSelector onSelectRoom={setSelectedRoom} />
      </div>

      {/* Machines */}
      <div className="flex flex-col items-baseline p-20 gap-10">
        <div className="flex flex-row items-end justify-evenly w-full">
          {washers.map((machine) => (
            <RotatingSquare
              key={machine.opaqueId}
              wash
              text={
                !machine.available ? `${machine.timeRemaining}m` : undefined
              }
            />
          ))}
        </div>
        <div className="flex flex-row items-end justify-evenly w-full">
          {dryers.map((machine) => (
            <RotatingSquare
              key={machine.opaqueId}
              wash={false}
              text={
                machine.timeRemaining > 0
                  ? `${machine.timeRemaining}m`
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
