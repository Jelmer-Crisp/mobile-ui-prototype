# Mobile UI Prototype

A React-based mobile UI prototype featuring a responsive layout, touch-friendly controls, and bottom navigation.

## Features

- Mobile-optimized viewport settings
- Fixed header with app title
- Scrollable content area with card-based layout
- Fixed bottom navigation with interactive tabs
- Touch-friendly controls with proper spacing
- Styled components for maintainable styling
- Proper state management for navigation

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

## Customization

### Styling
The prototype uses styled-components for styling. You can modify the styles in `src/App.js` by updating the styled components.

### Components
- `AppContainer`: Main container with flex layout
- `Header`: Fixed top header
- `Content`: Scrollable content area
- `Card`: Content card component
- `BottomNav`: Fixed bottom navigation
- `NavButton`: Navigation button component

### Adding New Features
1. Create new components in the `src` directory
2. Import and use them in `App.js`
3. Add new routes/tabs in the bottom navigation by updating the `activeTab` state

## Building for Production

To create a production build:
```bash
npm run build
```

This will create an optimized build in the `build` folder.
