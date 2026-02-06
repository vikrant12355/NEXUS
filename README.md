# Project Nexus

## Project Status

**Platform**: Native iOS & Android app, exportable to web (Project Nexus)
**Framework**: Expo Router + React Native

## Getting Started

Follow these steps to run the application locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/vikrant12355/NEXUS.git
    cd NEXUS
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or if you use bun
    bun install
    ```

### Running the App

#### Web (Localhost)

To launch the web application on your local host:

```bash
npm run web
```

The application runs on [http://localhost:8081](http://localhost:8081) by default.

> **Note**: If port 8081 is busy, the app will automatically pick the next available port (e.g., 8082). Check your terminal output for the exact URL.

#### iOS / Android

To run on a mobile device or simulator:

```bash
npm start
```

-   Scan the QR code with your phone (using Expo Go).
-   Press `a` for Android Emulator.
-   Press `i` for iOS Simulator.

## Technologies

This project is built with a modern tech stack:

-   **React Native** - Cross-platform native mobile development.
-   **Expo** - The React Native platform.
-   **Expo Router** - File-based routing.
-   **TypeScript** - Type-safe JavaScript.
-   **React Query** - Data fetching and state management.
-   **Lucide React Native** - Icons.

## Project Structure

```
├── app/                    # App screens (Expo Router)
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── _layout.tsx    # Tab layout configuration
│   │   └── index.tsx      # Home tab screen
│   ├── _layout.tsx        # Root layout
│   ├── modal.tsx          # Modal screen example
│   └── +not-found.tsx     # 404 screen
├── assets/                # Static assets (images, fonts)
├── constants/            # App constants
├── app.json             # Expo configuration
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Deployment

### Web

Build for web:

```bash
npx expo export --platform web
```

### Mobile (iOS/Android)

Build using EAS (Expo Application Services):

```bash
npm install -g eas-cli
eas build
```
