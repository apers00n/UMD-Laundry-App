import "./App.css";
import "@fontsource/jersey-10";
import "./index.css";
import RotatingSquare from "./rotating";
import { getRooms, getRoomSummaries, getMachines } from "./getInfo.tsx";

function App() {
  return (
    <div className="border-b-3 border-r-3 h-screen rounded-lg">
      <div className="flex border-b-2 p-4 border-[#918F8F] w-full flex-col">
        <p className="text-5xl font-jersey text-[#918F8F]">LAUNDRY</p>
      </div>
      <div className="flex border-double border-b-3 p-2 border-[#918F8F] w-full flex-row justify-between px-4">
        <p className="text-xl font-jersey text-[#393939]">UMD</p>
        <p className="text-xl font-jersey text-[#393939]">PFREDDY 7</p>
        <p className="text-xl font-jersey text-[#393939]">3 Wash</p>
        <p className="text-xl font-jersey text-[#393939]">3 Dry</p>
      </div>
      <div className="flex flex-col items-baseline p-20 gap-10">
        <div className="flex flex-row  items-end justify-evenly w-full">
          <RotatingSquare wash text="10m" />
          <RotatingSquare wash />
          <RotatingSquare wash />
        </div>
        <div className="flex flex-row  items-end justify-evenly w-full">
          <RotatingSquare wash={false} text="10m" />
          <RotatingSquare wash={false} />
          <RotatingSquare wash={false} />
        </div>
      </div>
    </div>
  );
}

export default App;
