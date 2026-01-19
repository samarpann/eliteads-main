import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useRetroSound } from "@/lib/retroSound";

const SoundToggle = () => {
  const { isMuted, toggleMute } = useRetroSound();

  return (
    <motion.button
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-xl glass-card border-2 border-primary/30 flex items-center justify-center text-primary hover:border-primary/60 transition-all duration-300 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      title={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      {/* Pixel-style indicator */}
      <motion.div
        className={`absolute -top-1 -right-1 w-3 h-3 rounded-sm ${isMuted ? 'bg-destructive' : 'bg-primary'}`}
        animate={{ 
          scale: isMuted ? 1 : [1, 1.2, 1],
          boxShadow: isMuted 
            ? "0 0 5px hsl(var(--destructive) / 0.8)" 
            : [
                "0 0 5px hsl(var(--primary) / 0.5)",
                "0 0 15px hsl(var(--primary) / 0.8)",
                "0 0 5px hsl(var(--primary) / 0.5)",
              ]
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      
      <motion.div
        animate={{ opacity: isMuted ? 0.5 : 1 }}
        className="relative"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </motion.div>

      {/* Sound waves animation when not muted */}
      {!isMuted && (
        <>
          <motion.div
            className="absolute right-0 w-1 h-1 bg-primary rounded-full"
            animate={{ 
              x: [0, 8, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="absolute right-0 w-1 h-1 bg-primary rounded-full"
            animate={{ 
              x: [0, 12, 0],
              opacity: [0, 0.7, 0],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
        </>
      )}

      {/* Label on hover */}
      <motion.span
        className="absolute right-full mr-3 font-pixel text-[8px] text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {isMuted ? "SOUND OFF" : "SOUND ON"}
      </motion.span>
    </motion.button>
  );
};

export default SoundToggle;
