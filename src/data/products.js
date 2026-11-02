export const FREE_DELIVERY_AT = 25000;
export const DELIVERY_FEE = 300;

export const formatPrice = (n) => "Rs " + n.toLocaleString("en-PK");

export const categories = ["All", "Consoles", "Audio", "Peripherals", "VR & Retro"];
export const productCategories = categories.slice(1);
export const rarities = ["Common", "Rare", "Epic", "Legendary"];

// rarity: Common | Rare | Epic | Legendary
export const products = [
  { id: 1, stock: 15, title: "Tidal Pro Controller", category: "Consoles", price: 12500, emoji: "🎮", rarity: "Rare",
    description: "Wireless pro controller with hall-effect sticks, remappable back paddles and 40-hour battery life.",
    stats: { power: 82, comfort: 90, durability: 85 } },
  { id: 2, stock: 5, title: "Kraken X Console", category: "Consoles", price: 89999, emoji: "🕹️", rarity: "Legendary",
    description: "Next-gen console with 1TB SSD, 4K 120fps gaming and ray tracing. The ruler of the deep.",
    stats: { power: 99, comfort: 70, durability: 92 } },
  { id: 3, stock: 8, title: "Pocket Reef Handheld", category: "Consoles", price: 34999, emoji: "📱", rarity: "Epic",
    description: "Portable handheld with a 7-inch OLED screen and 8 hours of play. Game anywhere, even underwater dreams.",
    stats: { power: 75, comfort: 88, durability: 80 } },
  { id: 4, stock: 20, title: "Sonar Wireless Headset", category: "Audio", price: 15999, emoji: "🎧", rarity: "Epic",
    description: "7.1 surround sound, noise-cancelling mic and soft memory-foam cushions for all-night sessions.",
    stats: { power: 88, comfort: 94, durability: 78 } },
  { id: 5, stock: 40, title: "Bubble Buds", category: "Audio", price: 4999, emoji: "🔊", rarity: "Common",
    description: "Low-latency gaming earbuds with a light 5g body and a 20-hour charging case.",
    stats: { power: 60, comfort: 82, durability: 65 } },
  { id: 6, stock: 12, title: "Wave RGB Keyboard", category: "Peripherals", price: 9500, emoji: "⌨️", rarity: "Rare",
    description: "Mechanical keyboard with hot-swappable switches and flowing wave lighting effects.",
    stats: { power: 80, comfort: 84, durability: 90 } },
  { id: 7, stock: 25, title: "Jellyfish Mouse", category: "Peripherals", price: 5500, emoji: "🖱️", rarity: "Common",
    description: "Ultra-light 58g mouse with a 26K DPI sensor and glowing underside lights.",
    stats: { power: 78, comfort: 80, durability: 70 } },
  { id: 8, stock: 3, title: "Abyss 27\" 240Hz Monitor", category: "Peripherals", price: 64999, emoji: "🖥️", rarity: "Legendary",
    description: "27-inch QHD monitor with a 240Hz refresh rate and 1ms response time. No blur, only victory.",
    stats: { power: 96, comfort: 80, durability: 88 } },
  { id: 9, stock: 4, title: "Neptune VR Headset", category: "VR & Retro", price: 54999, emoji: "🥽", rarity: "Epic",
    description: "Standalone VR headset with inside-out tracking and a wide field of view. Enter the game world.",
    stats: { power: 90, comfort: 76, durability: 82 } },
  { id: 10, stock: 9, title: "Retro Coral Arcade Stick", category: "VR & Retro", price: 11999, emoji: "👾", rarity: "Rare",
    description: "Arcade fight stick with clicky buttons and a classic ball-top joystick. Perfect for fighting games.",
    stats: { power: 72, comfort: 78, durability: 95 } },
  { id: 11, stock: 30, title: "Mini Retro Cabinet", category: "VR & Retro", price: 7999, emoji: "🏆", rarity: "Common",
    description: "Desktop mini arcade cabinet with 300 built-in classic games. Pure nostalgia.",
    stats: { power: 50, comfort: 85, durability: 72 } },
  { id: 12, stock: 7, title: "Trident Gaming Chair", category: "Peripherals", price: 28999, emoji: "💺", rarity: "Epic",
    description: "Ergonomic gaming chair with lumbar support, 4D armrests and a 180-degree recline.",
    stats: { power: 70, comfort: 98, durability: 86 } },
];
