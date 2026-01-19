import { motion } from "framer-motion";

type EmojiType = 
  | "brain" 
  | "ninja" 
  | "rocket" 
  | "target" 
  | "lightning" 
  | "chart" 
  | "gear" 
  | "flask" 
  | "crown"
  | "fire"
  | "diamond"
  | "skull"
  | "robot"
  | "coin"
  | "heart"
  | "gamepad"
  | "code"
  | "sun"
  | "building"
  | "graduate"
  | "cart"
  | "users";

interface PixelEmojiProps {
  type: EmojiType;
  size?: number;
  className?: string;
  animate?: boolean;
}

const PixelEmoji = ({ type, size = 32, className = "", animate = true }: PixelEmojiProps) => {
  const pixelSize = size / 8;
  
  const emojiPatterns: Record<EmojiType, { pixels: [number, number, string][]; glow: string }> = {
    brain: {
      pixels: [
        // Brain shape - pink/magenta
        [2, 1, "primary"], [3, 1, "primary"], [4, 1, "primary"], [5, 1, "primary"],
        [1, 2, "primary"], [2, 2, "accent"], [3, 2, "primary"], [4, 2, "accent"], [5, 2, "primary"], [6, 2, "primary"],
        [1, 3, "primary"], [2, 3, "primary"], [3, 3, "accent"], [4, 3, "primary"], [5, 3, "accent"], [6, 3, "primary"],
        [1, 4, "accent"], [2, 4, "primary"], [3, 4, "primary"], [4, 4, "primary"], [5, 4, "primary"], [6, 4, "accent"],
        [2, 5, "primary"], [3, 5, "accent"], [4, 5, "accent"], [5, 5, "primary"],
        [2, 6, "primary"], [3, 6, "primary"], [4, 6, "primary"], [5, 6, "primary"],
      ],
      glow: "primary"
    },
    ninja: {
      pixels: [
        // Ninja face with headband
        [2, 0, "dark"], [3, 0, "dark"], [4, 0, "dark"], [5, 0, "dark"],
        [1, 1, "dark"], [2, 1, "dark"], [3, 1, "dark"], [4, 1, "dark"], [5, 1, "dark"], [6, 1, "dark"],
        [1, 2, "secondary"], [2, 2, "secondary"], [3, 2, "secondary"], [4, 2, "secondary"], [5, 2, "secondary"], [6, 2, "secondary"], // headband
        [1, 3, "dark"], [2, 3, "primary"], [3, 3, "dark"], [4, 3, "dark"], [5, 3, "primary"], [6, 3, "dark"], // eyes
        [1, 4, "dark"], [2, 4, "dark"], [3, 4, "dark"], [4, 4, "dark"], [5, 4, "dark"], [6, 4, "dark"],
        [2, 5, "dark"], [3, 5, "dark"], [4, 5, "dark"], [5, 5, "dark"],
        [3, 6, "dark"], [4, 6, "dark"],
      ],
      glow: "secondary"
    },
    rocket: {
      pixels: [
        [3, 0, "accent"], [4, 0, "accent"],
        [2, 1, "foreground"], [3, 1, "foreground"], [4, 1, "foreground"], [5, 1, "foreground"],
        [2, 2, "foreground"], [3, 2, "accent"], [4, 2, "accent"], [5, 2, "foreground"],
        [2, 3, "foreground"], [3, 3, "foreground"], [4, 3, "foreground"], [5, 3, "foreground"],
        [2, 4, "foreground"], [3, 4, "foreground"], [4, 4, "foreground"], [5, 4, "foreground"],
        [1, 5, "secondary"], [2, 5, "foreground"], [3, 5, "foreground"], [4, 5, "foreground"], [5, 5, "foreground"], [6, 5, "secondary"],
        [2, 6, "primary"], [3, 6, "secondary"], [4, 6, "secondary"], [5, 6, "primary"],
        [3, 7, "primary"], [4, 7, "primary"],
      ],
      glow: "primary"
    },
    target: {
      pixels: [
        [2, 0, "secondary"], [3, 0, "secondary"], [4, 0, "secondary"], [5, 0, "secondary"],
        [1, 1, "secondary"], [2, 1, "foreground"], [3, 1, "foreground"], [4, 1, "foreground"], [5, 1, "foreground"], [6, 1, "secondary"],
        [0, 2, "secondary"], [1, 2, "foreground"], [2, 2, "secondary"], [3, 2, "secondary"], [4, 2, "secondary"], [5, 2, "secondary"], [6, 2, "foreground"], [7, 2, "secondary"],
        [0, 3, "secondary"], [1, 3, "foreground"], [2, 3, "secondary"], [3, 3, "primary"], [4, 3, "primary"], [5, 3, "secondary"], [6, 3, "foreground"], [7, 3, "secondary"],
        [0, 4, "secondary"], [1, 4, "foreground"], [2, 4, "secondary"], [3, 4, "primary"], [4, 4, "primary"], [5, 4, "secondary"], [6, 4, "foreground"], [7, 4, "secondary"],
        [0, 5, "secondary"], [1, 5, "foreground"], [2, 5, "secondary"], [3, 5, "secondary"], [4, 5, "secondary"], [5, 5, "secondary"], [6, 5, "foreground"], [7, 5, "secondary"],
        [1, 6, "secondary"], [2, 6, "foreground"], [3, 6, "foreground"], [4, 6, "foreground"], [5, 6, "foreground"], [6, 6, "secondary"],
        [2, 7, "secondary"], [3, 7, "secondary"], [4, 7, "secondary"], [5, 7, "secondary"],
      ],
      glow: "secondary"
    },
    lightning: {
      pixels: [
        [4, 0, "secondary"], [5, 0, "secondary"],
        [3, 1, "secondary"], [4, 1, "secondary"],
        [2, 2, "secondary"], [3, 2, "secondary"], [4, 2, "secondary"],
        [2, 3, "secondary"], [3, 3, "secondary"], [4, 3, "secondary"], [5, 3, "secondary"],
        [3, 4, "secondary"], [4, 4, "secondary"],
        [3, 5, "secondary"], [4, 5, "secondary"],
        [2, 6, "secondary"], [3, 6, "secondary"],
        [2, 7, "secondary"],
      ],
      glow: "secondary"
    },
    chart: {
      pixels: [
        [6, 0, "primary"], [7, 0, "primary"],
        [6, 1, "primary"], [7, 1, "primary"],
        [4, 2, "accent"], [5, 2, "accent"], [6, 2, "primary"], [7, 2, "primary"],
        [4, 3, "accent"], [5, 3, "accent"], [6, 3, "primary"], [7, 3, "primary"],
        [2, 4, "secondary"], [3, 4, "secondary"], [4, 4, "accent"], [5, 4, "accent"], [6, 4, "primary"], [7, 4, "primary"],
        [2, 5, "secondary"], [3, 5, "secondary"], [4, 5, "accent"], [5, 5, "accent"], [6, 5, "primary"], [7, 5, "primary"],
        [0, 6, "foreground"], [1, 6, "foreground"], [2, 6, "secondary"], [3, 6, "secondary"], [4, 6, "accent"], [5, 6, "accent"], [6, 6, "primary"], [7, 6, "primary"],
        [0, 7, "foreground"], [1, 7, "foreground"], [2, 7, "foreground"], [3, 7, "foreground"], [4, 7, "foreground"], [5, 7, "foreground"], [6, 7, "foreground"], [7, 7, "foreground"],
      ],
      glow: "primary"
    },
    gear: {
      pixels: [
        [3, 0, "muted"], [4, 0, "muted"],
        [2, 1, "muted"], [3, 1, "foreground"], [4, 1, "foreground"], [5, 1, "muted"],
        [0, 2, "muted"], [1, 2, "foreground"], [2, 2, "foreground"], [3, 2, "accent"], [4, 2, "accent"], [5, 2, "foreground"], [6, 2, "foreground"], [7, 2, "muted"],
        [0, 3, "muted"], [1, 3, "foreground"], [2, 3, "accent"], [3, 3, "foreground"], [4, 3, "foreground"], [5, 3, "accent"], [6, 3, "foreground"], [7, 3, "muted"],
        [0, 4, "muted"], [1, 4, "foreground"], [2, 4, "accent"], [3, 4, "foreground"], [4, 4, "foreground"], [5, 4, "accent"], [6, 4, "foreground"], [7, 4, "muted"],
        [0, 5, "muted"], [1, 5, "foreground"], [2, 5, "foreground"], [3, 5, "accent"], [4, 5, "accent"], [5, 5, "foreground"], [6, 5, "foreground"], [7, 5, "muted"],
        [2, 6, "muted"], [3, 6, "foreground"], [4, 6, "foreground"], [5, 6, "muted"],
        [3, 7, "muted"], [4, 7, "muted"],
      ],
      glow: "accent"
    },
    flask: {
      pixels: [
        [3, 0, "foreground"], [4, 0, "foreground"],
        [3, 1, "foreground"], [4, 1, "foreground"],
        [2, 2, "foreground"], [3, 2, "foreground"], [4, 2, "foreground"], [5, 2, "foreground"],
        [2, 3, "foreground"], [3, 3, "primary"], [4, 3, "primary"], [5, 3, "foreground"],
        [1, 4, "foreground"], [2, 4, "primary"], [3, 4, "accent"], [4, 4, "primary"], [5, 4, "primary"], [6, 4, "foreground"],
        [0, 5, "foreground"], [1, 5, "primary"], [2, 5, "primary"], [3, 5, "primary"], [4, 5, "accent"], [5, 5, "primary"], [6, 5, "primary"], [7, 5, "foreground"],
        [0, 6, "foreground"], [1, 6, "accent"], [2, 6, "primary"], [3, 6, "primary"], [4, 6, "primary"], [5, 6, "primary"], [6, 6, "accent"], [7, 6, "foreground"],
        [0, 7, "foreground"], [1, 7, "foreground"], [2, 7, "foreground"], [3, 7, "foreground"], [4, 7, "foreground"], [5, 7, "foreground"], [6, 7, "foreground"], [7, 7, "foreground"],
      ],
      glow: "primary"
    },
    crown: {
      pixels: [
        [0, 2, "secondary"], [2, 2, "secondary"], [4, 2, "secondary"], [5, 2, "secondary"], [7, 2, "secondary"],
        [0, 3, "secondary"], [1, 3, "secondary"], [2, 3, "secondary"], [3, 3, "secondary"], [4, 3, "secondary"], [5, 3, "secondary"], [6, 3, "secondary"], [7, 3, "secondary"],
        [0, 4, "secondary"], [1, 4, "primary"], [2, 4, "secondary"], [3, 4, "primary"], [4, 4, "primary"], [5, 4, "secondary"], [6, 4, "primary"], [7, 4, "secondary"],
        [0, 5, "secondary"], [1, 5, "secondary"], [2, 5, "secondary"], [3, 5, "secondary"], [4, 5, "secondary"], [5, 5, "secondary"], [6, 5, "secondary"], [7, 5, "secondary"],
        [1, 6, "secondary"], [2, 6, "secondary"], [3, 6, "secondary"], [4, 6, "secondary"], [5, 6, "secondary"], [6, 6, "secondary"],
      ],
      glow: "secondary"
    },
    fire: {
      pixels: [
        [3, 0, "secondary"], [4, 0, "secondary"],
        [2, 1, "secondary"], [3, 1, "secondary"], [4, 1, "secondary"], [5, 1, "secondary"],
        [2, 2, "secondary"], [3, 2, "secondary"], [4, 2, "secondary"], [5, 2, "secondary"],
        [1, 3, "secondary"], [2, 3, "secondary"], [3, 3, "accent"], [4, 3, "accent"], [5, 3, "secondary"], [6, 3, "secondary"],
        [1, 4, "secondary"], [2, 4, "accent"], [3, 4, "accent"], [4, 4, "accent"], [5, 4, "accent"], [6, 4, "secondary"],
        [2, 5, "secondary"], [3, 5, "accent"], [4, 5, "accent"], [5, 5, "secondary"],
        [2, 6, "secondary"], [3, 6, "secondary"], [4, 6, "secondary"], [5, 6, "secondary"],
        [3, 7, "secondary"], [4, 7, "secondary"],
      ],
      glow: "secondary"
    },
    diamond: {
      pixels: [
        [3, 0, "accent"], [4, 0, "accent"],
        [2, 1, "accent"], [3, 1, "primary"], [4, 1, "primary"], [5, 1, "accent"],
        [1, 2, "accent"], [2, 2, "primary"], [3, 2, "accent"], [4, 2, "accent"], [5, 2, "primary"], [6, 2, "accent"],
        [0, 3, "accent"], [1, 3, "primary"], [2, 3, "accent"], [3, 3, "primary"], [4, 3, "primary"], [5, 3, "accent"], [6, 3, "primary"], [7, 3, "accent"],
        [1, 4, "accent"], [2, 4, "primary"], [3, 4, "accent"], [4, 4, "accent"], [5, 4, "primary"], [6, 4, "accent"],
        [2, 5, "accent"], [3, 5, "primary"], [4, 5, "primary"], [5, 5, "accent"],
        [3, 6, "accent"], [4, 6, "accent"],
      ],
      glow: "accent"
    },
    skull: {
      pixels: [
        [2, 0, "foreground"], [3, 0, "foreground"], [4, 0, "foreground"], [5, 0, "foreground"],
        [1, 1, "foreground"], [2, 1, "foreground"], [3, 1, "foreground"], [4, 1, "foreground"], [5, 1, "foreground"], [6, 1, "foreground"],
        [1, 2, "foreground"], [2, 2, "dark"], [3, 2, "foreground"], [4, 2, "foreground"], [5, 2, "dark"], [6, 2, "foreground"],
        [1, 3, "foreground"], [2, 3, "foreground"], [3, 3, "foreground"], [4, 3, "foreground"], [5, 3, "foreground"], [6, 3, "foreground"],
        [2, 4, "foreground"], [3, 4, "dark"], [4, 4, "dark"], [5, 4, "foreground"],
        [2, 5, "foreground"], [3, 5, "foreground"], [4, 5, "foreground"], [5, 5, "foreground"],
        [2, 6, "dark"], [3, 6, "foreground"], [4, 6, "foreground"], [5, 6, "dark"],
      ],
      glow: "foreground"
    },
    robot: {
      pixels: [
        [3, 0, "accent"], [4, 0, "accent"],
        [2, 1, "muted"], [3, 1, "muted"], [4, 1, "muted"], [5, 1, "muted"],
        [1, 2, "muted"], [2, 2, "primary"], [3, 2, "muted"], [4, 2, "muted"], [5, 2, "primary"], [6, 2, "muted"],
        [1, 3, "muted"], [2, 3, "muted"], [3, 3, "muted"], [4, 3, "muted"], [5, 3, "muted"], [6, 3, "muted"],
        [2, 4, "muted"], [3, 4, "accent"], [4, 4, "accent"], [5, 4, "muted"],
        [0, 5, "muted"], [1, 5, "muted"], [2, 5, "muted"], [3, 5, "muted"], [4, 5, "muted"], [5, 5, "muted"], [6, 5, "muted"], [7, 5, "muted"],
        [2, 6, "muted"], [3, 6, "muted"], [4, 6, "muted"], [5, 6, "muted"],
        [2, 7, "muted"], [3, 7, "dark"], [4, 7, "dark"], [5, 7, "muted"],
      ],
      glow: "accent"
    },
    coin: {
      pixels: [
        [2, 0, "secondary"], [3, 0, "secondary"], [4, 0, "secondary"], [5, 0, "secondary"],
        [1, 1, "secondary"], [2, 1, "accent"], [3, 1, "accent"], [4, 1, "accent"], [5, 1, "accent"], [6, 1, "secondary"],
        [1, 2, "secondary"], [2, 2, "accent"], [3, 2, "secondary"], [4, 2, "secondary"], [5, 2, "accent"], [6, 2, "secondary"],
        [1, 3, "secondary"], [2, 3, "accent"], [3, 3, "secondary"], [4, 3, "accent"], [5, 3, "accent"], [6, 3, "secondary"],
        [1, 4, "secondary"], [2, 4, "accent"], [3, 4, "secondary"], [4, 4, "secondary"], [5, 4, "accent"], [6, 4, "secondary"],
        [1, 5, "secondary"], [2, 5, "accent"], [3, 5, "accent"], [4, 5, "accent"], [5, 5, "accent"], [6, 5, "secondary"],
        [2, 6, "secondary"], [3, 6, "secondary"], [4, 6, "secondary"], [5, 6, "secondary"],
      ],
      glow: "secondary"
    },
    heart: {
      pixels: [
        [1, 1, "primary"], [2, 1, "primary"], [5, 1, "primary"], [6, 1, "primary"],
        [0, 2, "primary"], [1, 2, "accent"], [2, 2, "primary"], [3, 2, "primary"], [4, 2, "primary"], [5, 2, "accent"], [6, 2, "primary"], [7, 2, "primary"],
        [0, 3, "primary"], [1, 3, "primary"], [2, 3, "primary"], [3, 3, "primary"], [4, 3, "primary"], [5, 3, "primary"], [6, 3, "primary"], [7, 3, "primary"],
        [1, 4, "primary"], [2, 4, "primary"], [3, 4, "primary"], [4, 4, "primary"], [5, 4, "primary"], [6, 4, "primary"],
        [2, 5, "primary"], [3, 5, "primary"], [4, 5, "primary"], [5, 5, "primary"],
        [3, 6, "primary"], [4, 6, "primary"],
      ],
      glow: "primary"
    },
    gamepad: {
      pixels: [
        [1, 1, "muted"], [2, 1, "muted"], [3, 1, "muted"], [4, 1, "muted"], [5, 1, "muted"], [6, 1, "muted"],
        [0, 2, "muted"], [1, 2, "muted"], [2, 2, "muted"], [3, 2, "muted"], [4, 2, "muted"], [5, 2, "muted"], [6, 2, "muted"], [7, 2, "muted"],
        [0, 3, "muted"], [1, 3, "accent"], [2, 3, "muted"], [3, 3, "muted"], [4, 3, "muted"], [5, 3, "primary"], [6, 3, "muted"], [7, 3, "muted"],
        [0, 4, "muted"], [1, 4, "muted"], [2, 4, "muted"], [3, 4, "muted"], [4, 4, "primary"], [5, 4, "muted"], [6, 4, "primary"], [7, 4, "muted"],
        [1, 5, "muted"], [2, 5, "muted"], [3, 5, "muted"], [4, 5, "muted"], [5, 5, "muted"], [6, 5, "muted"],
      ],
      glow: "primary"
    },
    code: {
      pixels: [
        [1, 1, "primary"], [2, 1, "primary"], [5, 1, "primary"], [6, 1, "primary"],
        [2, 2, "primary"], [5, 2, "primary"],
        [3, 3, "primary"], [4, 3, "primary"],
        [3, 4, "primary"], [4, 4, "primary"],
        [2, 5, "primary"], [5, 5, "primary"],
        [1, 6, "primary"], [2, 6, "primary"], [5, 6, "primary"], [6, 6, "primary"],
      ],
      glow: "primary"
    },
    sun: {
      pixels: [
        [3, 0, "secondary"], [4, 0, "secondary"],
        [0, 1, "secondary"], [3, 1, "secondary"], [4, 1, "secondary"], [7, 1, "secondary"],
        [1, 2, "secondary"], [2, 2, "accent"], [3, 2, "accent"], [4, 2, "accent"], [5, 2, "accent"], [6, 2, "secondary"],
        [0, 3, "secondary"], [2, 3, "accent"], [3, 3, "secondary"], [4, 3, "secondary"], [5, 3, "accent"], [7, 3, "secondary"],
        [0, 4, "secondary"], [2, 4, "accent"], [3, 4, "secondary"], [4, 4, "secondary"], [5, 4, "accent"], [7, 4, "secondary"],
        [1, 5, "secondary"], [2, 5, "accent"], [3, 5, "accent"], [4, 5, "accent"], [5, 5, "accent"], [6, 5, "secondary"],
        [0, 6, "secondary"], [3, 6, "secondary"], [4, 6, "secondary"], [7, 6, "secondary"],
        [3, 7, "secondary"], [4, 7, "secondary"],
      ],
      glow: "secondary"
    },
    building: {
      pixels: [
        [2, 0, "muted"], [3, 0, "muted"], [4, 0, "muted"], [5, 0, "muted"],
        [2, 1, "muted"], [3, 1, "accent"], [4, 1, "accent"], [5, 1, "muted"],
        [2, 2, "muted"], [3, 2, "accent"], [4, 2, "accent"], [5, 2, "muted"],
        [1, 3, "muted"], [2, 3, "muted"], [3, 3, "accent"], [4, 3, "accent"], [5, 3, "muted"], [6, 3, "muted"],
        [1, 4, "muted"], [2, 4, "accent"], [3, 4, "muted"], [4, 4, "muted"], [5, 4, "accent"], [6, 4, "muted"],
        [1, 5, "muted"], [2, 5, "accent"], [3, 5, "muted"], [4, 5, "muted"], [5, 5, "accent"], [6, 5, "muted"],
        [1, 6, "muted"], [2, 6, "muted"], [3, 6, "muted"], [4, 6, "muted"], [5, 6, "muted"], [6, 6, "muted"],
        [1, 7, "muted"], [2, 7, "muted"], [3, 7, "secondary"], [4, 7, "secondary"], [5, 7, "muted"], [6, 7, "muted"],
      ],
      glow: "accent"
    },
    graduate: {
      pixels: [
        [1, 1, "dark"], [2, 1, "dark"], [3, 1, "dark"], [4, 1, "dark"], [5, 1, "dark"], [6, 1, "dark"],
        [0, 2, "dark"], [1, 2, "dark"], [2, 2, "dark"], [3, 2, "dark"], [4, 2, "dark"], [5, 2, "dark"], [6, 2, "dark"], [7, 2, "dark"],
        [2, 3, "dark"], [3, 3, "dark"], [4, 3, "dark"], [5, 3, "dark"],
        [2, 4, "foreground"], [3, 4, "foreground"], [4, 4, "foreground"], [5, 4, "foreground"],
        [1, 5, "foreground"], [2, 5, "foreground"], [3, 5, "foreground"], [4, 5, "foreground"], [5, 5, "foreground"], [6, 5, "foreground"],
        [6, 3, "secondary"], [7, 4, "secondary"], [7, 5, "secondary"], [7, 6, "secondary"],
      ],
      glow: "secondary"
    },
    cart: {
      pixels: [
        [1, 1, "muted"], [2, 1, "muted"], [3, 1, "muted"], [4, 1, "muted"], [5, 1, "muted"], [6, 1, "muted"],
        [0, 2, "muted"], [1, 2, "accent"], [2, 2, "accent"], [3, 2, "accent"], [4, 2, "accent"], [5, 2, "accent"], [6, 2, "muted"],
        [0, 3, "muted"], [1, 3, "accent"], [2, 3, "accent"], [3, 3, "accent"], [4, 3, "accent"], [5, 3, "accent"], [6, 3, "muted"],
        [1, 4, "muted"], [2, 4, "accent"], [3, 4, "accent"], [4, 4, "accent"], [5, 4, "muted"],
        [2, 5, "muted"], [3, 5, "muted"], [4, 5, "muted"],
        [2, 6, "secondary"], [3, 6, "secondary"], [4, 6, "secondary"], [5, 6, "secondary"],
      ],
      glow: "accent"
    },
    users: {
      pixels: [
        [1, 0, "primary"], [2, 0, "primary"], [5, 0, "secondary"], [6, 0, "secondary"],
        [0, 1, "primary"], [1, 1, "accent"], [2, 1, "primary"], [3, 1, "primary"], [4, 1, "secondary"], [5, 1, "accent"], [6, 1, "secondary"], [7, 1, "secondary"],
        [0, 2, "primary"], [1, 2, "primary"], [2, 2, "primary"], [3, 2, "primary"], [4, 2, "secondary"], [5, 2, "secondary"], [6, 2, "secondary"], [7, 2, "secondary"],
        [1, 3, "primary"], [2, 3, "primary"], [5, 3, "secondary"], [6, 3, "secondary"],
        [0, 4, "primary"], [1, 4, "primary"], [2, 4, "primary"], [3, 4, "primary"], [4, 4, "secondary"], [5, 4, "secondary"], [6, 4, "secondary"], [7, 4, "secondary"],
        [0, 5, "primary"], [1, 5, "primary"], [2, 5, "primary"], [3, 5, "primary"], [4, 5, "secondary"], [5, 5, "secondary"], [6, 5, "secondary"], [7, 5, "secondary"],
      ],
      glow: "primary"
    },
  };

  const pattern = emojiPatterns[type];
  
  const colorMap: Record<string, string> = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
    foreground: "bg-foreground",
    muted: "bg-muted-foreground",
    dark: "bg-background",
  };

  const glowMap: Record<string, string> = {
    primary: "hsl(var(--primary))",
    secondary: "hsl(var(--secondary))",
    accent: "hsl(var(--accent))",
    foreground: "hsl(var(--foreground))",
  };

  return (
    <motion.div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      animate={animate ? { 
        y: [0, -2, 0],
      } : {}}
      transition={{ 
        duration: 2, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 blur-sm opacity-50"
        style={{
          background: `radial-gradient(circle, ${glowMap[pattern.glow]} 0%, transparent 70%)`,
        }}
      />
      
      {/* Pixels */}
      {pattern.pixels.map(([x, y, color], i) => (
        <motion.div
          key={i}
          className={`absolute ${colorMap[color]}`}
          style={{
            width: pixelSize,
            height: pixelSize,
            left: x * pixelSize,
            top: y * pixelSize,
            imageRendering: "pixelated",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.01, duration: 0.2 }}
        />
      ))}
    </motion.div>
  );
};

export default PixelEmoji;
