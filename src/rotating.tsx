// RotatingSquare.tsx
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function RotatingSquare({
  text,
  wash = true,
}: {
  text?: string;
  wash: boolean;
}) {
  const controls = useAnimation();

  useEffect(() => {
    async function sequence() {
      while (text) {
        await controls.start({
          rotate: [360, -15], // target rotation stays at 360
          transition: {
            type: "spring",
            stiffness: 40,
            damping: 8,
            mass: 2,
            velocity: 0,
            restSpeed: 3,
            restDelta: 2,
          },
        });
        await controls.start({
          rotate: [-15, 15], // target rotation stays at 360
          transition: { duration: 1.5, times: [0, 0.5, 1], ease: "easeInOut" },
        });
        await controls.start({
          rotate: [15, -15, 15], // target rotation stays at 360
          transition: { duration: 2, times: [0, 0.5, 1], ease: "easeInOut" },
        });
        await controls.start({
          rotate: [15, -15, 15], // target rotation stays at 360
          transition: { duration: 2, times: [0, 0.5, 1], ease: "easeInOut" },
        });

        // Reset to 0 so next rock works correctly
        // controls.set({ rotate: 0 });
      }
      controls.set({ rotate: 0 });
    }
    sequence();
  }, [controls, text]);

  return (
    <div className={text ? "opacity-70" : ""}>
      <p className="text-xl text-[#909090] text-left ml-[25%]">{text}</p>
      <svg
        className="w-32 h-32 "
        width="106"
        height="88"
        viewBox="0 0 106 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width="66.6915"
          height="17.7727"
          stroke="#909090"
          stroke-width="2"
        />
        <rect
          x="8.35034"
          y="6.43176"
          width="6.85046"
          height="6.90909"
          fill="#909090"
          stroke="#909090"
        />
        <rect
          x="0.5"
          y="-0.5"
          width="2.92523"
          height="2.95455"
          transform="matrix(1 0 0 -1 37.2896 12.8409)"
          fill="#909090"
          stroke="#909090"
        />
        <rect
          x="0.5"
          y="-0.5"
          width="2.92523"
          height="2.95455"
          transform="matrix(1 0 0 -1 45.1399 12.8409)"
          fill="#909090"
          stroke="#909090"
        />
        <rect
          x="0.5"
          y="-0.5"
          width="2.92523"
          height="2.95455"
          transform="matrix(1 0 0 -1 52.9907 12.8409)"
          fill="#909090"
          stroke="#909090"
        />

        <rect
          x="0.5"
          y="-0.5"
          width="2.92523"
          height="2.95455"
          transform="matrix(1 0 0 -1 60.8413 12.8409)"
          fill="#909090"
          stroke="#909090"
        />
        {!wash ? (
          <>
            <path
              d="M68 50.3262L66 52.9629V21H2V76H51.5107L49.9268 78H0V19H68V50.3262ZM68 78H67.7363L68 77.6299V78ZM62.8232 78H61.1211L62.5479 76H64.249L62.8232 78ZM67.4746 71.4775L66 73.5449V69.71L67.4746 71.4775ZM68 65.8633L66 63.4668V59.5801L68 56.9443V65.8633Z"
              fill="#909090"
            />
            <path
              d="M49 84L59 71.3824L50 61.6765L59 51"
              stroke="#909090"
              stroke-width="1.5"
            />
            <path
              d="M55 84L64 71.3824L55.9 61.6765L64 51"
              stroke="#909090"
              stroke-width="1.5"
            />
            <path
              d="M61 84L70 71.3824L61.9 61.6765L70 51"
              stroke="#909090"
              stroke-width="1.5"
            />
          </>
        ) : (
          <>
            <path
              d="M68.6914 63.8535L66.6914 64.6904V21.7725H2V77.0908H56.8359L58.3486 79.0908H0V19.7725H68.6914V63.8535Z"
              fill="#909090"
            />
            <path
              d="M49.0654 63.2727L51.028 65.7703M105 63.2727L99.8481 70.1932M51.028 65.7703L67.7103 87H87.3364L99.8481 70.1932M51.028 65.7703L62.8037 71.1818L72.6168 67.2273L83.4112 71.1818L90.2803 67.2273L99.8481 70.1932"
              stroke="#909090"
              stroke-width="1.5"
            />
            <path
              d="M49.0654 63.2727L51.028 65.7703M105 63.2727L99.8481 70.1932M51.028 65.7703L67.7103 87H87.3364L99.8481 70.1932M51.028 65.7703L62.8037 71.1818L72.6168 67.2273L83.4112 71.1818L90.2803 67.2273L99.8481 70.1932"
              stroke="#909090"
              stroke-width="1.5"
            />
            <path
              d="M49.0654 63.2727L51.028 65.7703M105 63.2727L99.8481 70.1932M51.028 65.7703L67.7103 87H87.3364L99.8481 70.1932M51.028 65.7703L62.8037 71.1818L72.6168 67.2273L83.4112 71.1818L90.2803 67.2273L99.8481 70.1932"
              stroke="#909090"
              stroke-width="1.5"
            />
          </>
        )}
        <motion.rect
          x="17"
          y="35"
          width="33.33"
          height="31.61"
          stroke="#909090"
          strokeWidth="2"
          transformOrigin="center"
          animate={controls}
        />
      </svg>
    </div>
  );
}
