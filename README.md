# Location Finder

A modern web application built with Next.js for finding and managing locations with interactive maps powered by Mapbox.

## Features

- 🗺️ Interactive map interface using Mapbox GL
- 🔍 Advanced location search functionality
- 🎨 Beautiful UI with DaisyUI and Tailwind CSS
- 🌙 Dark mode support
- 🔐 Secure authentication
- ⚡ Built with Next.js 15 and React 19
- 📱 Fully responsive design

## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Mapbox API key

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/NotTheSamAdamsGuy/location-finder-next.git
cd location-finder-next
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with your Mapbox access token and other required environment variables.

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests with Vitest
- `npm run coverage` - Generate test coverage report

## Technology Stack

- **Framework:** Next.js 15.5.0
- **UI Library:** React 19.1.0
- **Styling:** 
  - Tailwind CSS
  - DaisyUI
  - FontAwesome icons
- **Maps:** Mapbox GL
- **Testing:** Vitest
- **Form Validation:** Zod
- **Authentication:** Jose (JWT handling)

## Project Structure

```
src/
├── app/              # App router pages and layouts
├── components/       # React components
│   ├── features/    # Feature-specific components
│   ├── layout/      # Layout components
│   └── ui/          # Reusable UI components
├── formActions/     # Server actions for forms
├── lib/            # Utility functions and constants
└── types/          # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary. All rights reserved.

## Support

For support, please open an issue in the GitHub repository.
