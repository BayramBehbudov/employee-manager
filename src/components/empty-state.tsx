import { motion } from "framer-motion";
import { useAtoms } from "../hooks/useAtoms";

export function EmptyState() {
  const { setVisible, setEditParams } = useAtoms();
  return (
    <motion.div
      className="flex flex-col justify-center items-center p-8 min-h-[400px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative max-w-md text-center">
        <motion.div
          className="flex justify-center items-center bg-gradient-to-r from-gray-400 to-gray-600 mx-auto mb-6 rounded-full w-20 h-20"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="mb-3 font-bold text-surface-900 dark:text-surface-0 text-2xl">
            No Workers Found
          </h3>
          <p className="mb-6 text-surface-600 dark:text-surface-400">
            It looks like there are no workers in the system yet. Add your first
            worker to get started!
          </p>

          <motion.button
            onClick={() => {
              setEditParams("");
              setVisible(true);
            }}
            className="bg-gradient-to-r from-green-500 to-blue-500 shadow-lg hover:shadow-xl px-6 py-3 rounded-lg font-medium cursor-pointer text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add First Worker
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
