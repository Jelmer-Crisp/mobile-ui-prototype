# Mobile UI Prototype for Grocery Shopping

A React-based mobile UI prototype for a Dutch grocery shopping experience, featuring an intuitive product browsing interface with interactive controls and smooth animations.

## Core Features

- **Category-Based Navigation**
  - Quick access to product categories (Kaas, Melk, Noten, etc.)
  - Expandable category system with primary and extra categories
  - Smooth transitions between category views

- **Interactive Product Tiles**
  - Visual product representation with emojis
  - Product name and category display
  - Built-in quantity controls (+/- buttons)
  - Animated transitions for user interactions
  - Touch-friendly interface

- **Smart Product Organization**
  - Categorized product listings
  - Dutch product catalog with common grocery items
  - Hierarchical category structure
  - Easy product filtering by category

- **Responsive Design**
  - Mobile-optimized viewport
  - Touch-friendly controls with appropriate spacing
  - Fixed header for app title
  - Bottom options panel for additional controls
  - Smooth scrolling product list

## Technical Implementation

- Built with React and modern JavaScript
- Styled-components for maintainable CSS
- React Transition Group for smooth animations
- Component-based architecture for modularity
- Efficient state management for UI interactions

## Project Structure

- `/src/components/` - React components including ProductTileList and CategoryButtons
- `/src/components/styled/` - Styled components for consistent UI design
- `/src/data/` - Product and category data management
- `/src/utils/` - Utility functions for product operations

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. View the prototype at http://localhost:3000

## Building for Production

Create an optimized production build:
```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.
