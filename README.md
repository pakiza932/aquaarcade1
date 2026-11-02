# AquaArcade - Deep-Sea Gaming Store (React.js)

An original e-commerce website with an underwater arcade theme.

## Features
- Animated flowing waves and rising bubbles (pure CSS/SVG)
- Product catalog with search, category filter and price sorting
- Game-style rarity cards (Common, Rare, Epic, Legendary) and stat bars
- Product detail page with dynamic routing
- Inventory (cart): add, remove, change quantity, saved in localStorage
- XP progress bar for free-delivery unlock
- Login and signup (passwords hashed with SHA-256, session saved in localStorage)
- Wishlist (save favourite products with a heart button)
- Checkout (login required) with validation and 3 payment options: Cash on Delivery, Card (demo) and JazzCash/Easypaisa (demo)
- Order history page for each user
- Live stock: low-stock labels, sold-out products, stock reduced on every order
- Admin panel (/admin/login): dashboard with sales stats, product management (add / edit / delete), order management (update status), customer list

## Colour scheme (60-30-10 rule, three colours)
- Deep Navy `#0a1128` - 60% (backgrounds)
- Aqua `#22d3ee` - 30% (waves, buttons, borders)
- Coral `#ff4d6d` - 10% (prices, badges, highlights)

## Tech
React 18, React Router v6, Vite, Context API + useReducer, CSS3

## Run
```bash
npm install
npm run dev
```
