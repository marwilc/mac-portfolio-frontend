# 🍎 macOS Portfolio

A stunning, interactive portfolio website that recreates the macOS desktop experience in your browser. Built with Next.js, React, and Tailwind CSS, this project transforms your portfolio into an immersive macOS-like environment where visitors can explore your work through familiar desktop interactions.

![macOS Portfolio](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🚀 Core Experience
- **Boot Screen**: Authentic macOS boot animation with startup sound
- **Login Screen**: Elegant login interface with user profile
- **Desktop Environment**: Fully interactive macOS desktop with draggable icons
- **Window Management**: Resizable, minimizable, and fullscreen-capable windows
- **Dock**: macOS-style dock with magnification effect on hover
- **Menu Bar**: Complete macOS menu bar with contextual menus (File, Edit, View, Go, Window, Help)
- **Apple Menu**: System menu with shutdown and logout functionality

### 🎨 Interactive Elements
- **Draggable Desktop Icons**: Move icons around the desktop
- **Window Controls**: Red, yellow, and green traffic light buttons (close, minimize, fullscreen)
- **Double-Click Resize**: Toggle between compact and expanded window sizes
- **Active Window Management**: Click to bring windows to foreground
- **Launchpad**: Applications launcher similar to macOS Launchpad
- **System Information**: Real-time battery level, network status (Wi-Fi/Ethernet), time, and date

### 📱 Applications
- **Finder**: Welcome and navigation
- **About Me**: Personal introduction and background
- **Projects**: Portfolio projects showcase
- **Contact**: Contact information and social links
- **Resume**: Downloadable CV/resume
- **Applications**: Launchpad for custom user applications

## 🛠️ Technologies

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **Browser APIs** - Battery API, Network Information API, Fullscreen API

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mac-portfolio-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Usage

### Development
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Customization

#### Adding Applications
Edit `lib/apps.ts` to add or modify applications:
```typescript
export const APPS: AppConfig[] = [
  { id: "my-app", name: "My App", icon: "🎯" },
  // ... more apps
];
```

#### Custom User Applications
Edit `lib/userApps.ts` to add projects to the Launchpad:
```typescript
export const USER_APPS: UserApp[] = [
  {
    id: "my-project",
    name: "My Project",
    icon: "🚀",
    description: "Project description",
    url: "https://example.com",
    technologies: ["React", "TypeScript"],
  },
];
```

#### Window Content
Modify window content in `components/Desktop.tsx` by editing the JSX inside each `AppWindow` component.

## 📁 Project Structure

```
mac-portfolio-frontend/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── AppleMenu.tsx        # Apple menu component
│   ├── AppWindow.tsx        # Window component with controls
│   ├── BootScreen.tsx       # Boot screen with animation
│   ├── Desktop.tsx          # Main desktop component
│   ├── DesktopIcon.tsx      # Draggable desktop icon
│   ├── Dock.tsx             # macOS-style dock
│   ├── Launchpad.tsx        # Applications launcher
│   ├── LoginScreen.tsx      # Login interface
│   ├── MenuBar.tsx          # macOS menu bar
│   └── ShutdownDialog.tsx   # Shutdown confirmation
├── lib/
│   ├── apps.ts              # Application configurations
│   └── userApps.ts          # User application definitions
└── public/
    └── macos-startup.mp3    # macOS startup sound
```

## 🎯 Key Features Explained

### Window Management
- **Drag**: Click and drag window headers to move windows
- **Resize**: Drag window edges or corners to resize
- **Minimize**: Click the yellow button to minimize windows
- **Fullscreen**: Click the green button or use Window menu
- **Compact Mode**: Double-click window header to toggle compact/expanded size

### Desktop Icons
- **Move**: Click and drag icons to reposition them
- **Open**: Click icons to open applications
- **Z-Index**: Icons always stay beneath windows

### Dock
- **Magnification**: Icons grow on hover, with smooth transitions
- **Active Indicators**: Shows which applications are open
- **Click to Toggle**: Click dock icons to open/close applications

### System Features
- **Battery Detection**: Real-time battery percentage (if available)
- **Network Status**: Displays Wi-Fi or Ethernet connection
- **Time & Date**: Live clock and date display
- **Session Management**: Login state persists across page reloads

## 🎨 Customization Guide

### Changing the Wallpaper
Edit the `wallpaperUrl` in `components/Desktop.tsx`:
```typescript
const wallpaperUrl = "https://your-image-url.jpg";
```

### Modifying Colors
Update Tailwind classes in components or modify `app/globals.css` for global color changes.

### Adding Sound Effects
Place audio files in `public/` and reference them in components.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Deploy with default settings

### Other Platforms
```bash
npm run build
npm run start
```

The application will be optimized for production automatically.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by macOS design language
- Built with modern web technologies
- Icons and UI elements styled after macOS Sonoma/Ventura

## 📧 Contact

For questions, suggestions, or collaboration opportunities, please open an issue or reach out through your preferred contact method.

---

**Made with ❤️ using Next.js and React**
