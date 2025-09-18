import { motion } from "framer-motion";

export default function GasTruckLogo() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-sky-300 to-sky-500">
      {/* === Moving Clouds === */}
      <motion.div
        className="absolute top-10 left-0 w-[200%] h-32 bg-[url('https://svgshare.com/i/13vy.svg')] bg-repeat-x bg-contain"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />

      {/* === Road === */}
      <motion.div
        className="absolute bottom-0 left-0 w-[200%] h-32 bg-[url('https://svgshare.com/i/13w9.svg')] bg-repeat-x bg-contain"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
      />

      {/* === Truck === */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 600 400"
        className="w-[300px] h-[200px] z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Truck Base */}
        <rect x="120" y="200" width="280" height="100" rx="10" fill="#FF6B35" />

        {/* Cabin */}
        <rect x="360" y="160" width="120" height="140" rx="12" fill="#FFD93D" />
        <rect x="380" y="180" width="80" height="60" rx="8" fill="#74C0FC" />

        {/* Gas Cylinder */}
        <ellipse cx="180" cy="160" rx="45" ry="55" fill="#E63946" />
        <rect x="170" y="105" width="20" height="30" fill="#B71C1C" />

        {/* Wheels */}
        {[180, 340, 440].map((posX, i) => (
          <motion.g
            key={i}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            transform={`translate(${posX}, 320)`}
          >
            <circle cx="0" cy="0" r="35" fill="#333" />
            <circle cx="0" cy="0" r="15" fill="#111" />
          </motion.g>
        ))}

        {/* Exhaust Smoke */}
        <motion.circle
          cx="120"
          cy="190"
          r="10"
          fill="#999"
          animate={{ y: [-10, -40], opacity: [0.8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.circle
          cx="140"
          cy="185"
          r="7"
          fill="#aaa"
          animate={{ y: [-5, -35], opacity: [0.7, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
        />

        {/* Logo Text */}
        <text
          x="260"
          y="360"
          textAnchor="middle"
          fontSize="28"
          fill="#FFFFFF"
          className="font-bold"
        >
          HALOGAS
        </text>
      </motion.svg>
    </div>
  );
}
