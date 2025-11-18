import { useEffect, useState } from "react";
import "./App.css";
import "@fontsource/jersey-10";
import "./index.css";
import RotatingSquare from "./rotating";
import { getRooms, getMachines } from "./getInfo.tsx";
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

interface Machine {
  opaqueId: string;
  type: "washer" | "dryer";
  mode: string;
  timeRemaining: number;
  available: boolean;
  // add other props if needed
}

export default function App() {
  const [machines, setMachines] = useState<Machine[]>([]);

  useEffect(() => {
    async function fetchMachines() {
      try {
        const rooms = await getRooms("Prince Frederick FL7");
        if (rooms.length === 0) return;

        const machineData = await getMachines(rooms[0].roomId);
        console.log(machineData);
        setMachines(machineData);
      } catch (err) {
        console.error("Error fetching machines:", err);
      }
    }

    fetchMachines();
    // Update every minute (60000ms)
    const interval = setInterval(fetchMachines, 60000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Separate washers and dryers
  const washers = machines.filter((m) => m.type === "washer");
  const dryers = machines.filter((m) => m.type === "dryer");

  return (
    <div className=" overflow-hidden scrollbar-none border-b-3 border-r-3 h-screen rounded-lg">
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

      <RoomSelector />

      <div className="bg-[#F0E7DF] flex border-double border-3 p-2 border-[#918F8F] w-full flex-row justify-start gap-10 px-4">
        <p className="text-xl font-jersey text-[#393939]">UMD</p>
        <p className="text-xl font-jersey text-[#393939]">
          PRINCE FREDERICK FL7
        </p>
        <p className="text-xl font-jersey text-[#393939]">
          {washers.length} Wash
        </p>
        <p className="text-xl font-jersey text-[#393939]">
          {dryers.length} Dry
        </p>
      </div>

      <div className="flex flex-col items-baseline p-20 gap-10">
        {/* Washers Row */}
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

        {/* Dryers Row */}
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
