"use client";

import { useState, useRef, useEffect } from "react";

type MenuItem = {
  label?: string;
  action?: () => void;
  shortcut?: string;
  divider?: boolean;
  disabled?: boolean;
};

type Menu = {
  label: string;
  items: MenuItem[];
};

type MenuBarProps = {
  activeApp?: string;
  onMinimize?: () => void;
  onFullscreen?: () => void;
  isFullscreen?: boolean;
};

export default function MenuBar({ activeApp, onMinimize, onFullscreen, isFullscreen }: MenuBarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Menús estándar de macOS
  const menus: Menu[] = [
    {
      label: "File",
      items: [
        { label: "New Window", shortcut: "⌘N", action: () => console.log("New Window") },
        { label: "New Tab", shortcut: "⌘T", action: () => console.log("New Tab") },
        { divider: true, label: "" },
        { label: "Open...", shortcut: "⌘O", action: () => console.log("Open") },
        { label: "Open Recent", action: () => console.log("Open Recent") },
        { divider: true, label: "" },
        { label: "Close Window", shortcut: "⌘W", action: () => console.log("Close Window") },
        { label: "Close Tab", shortcut: "⌘W", action: () => console.log("Close Tab") },
        { divider: true, label: "" },
        { label: "Get Info", shortcut: "⌘I", action: () => console.log("Get Info") },
        { divider: true, label: "" },
        { label: "Compress", action: () => console.log("Compress") },
        { divider: true, label: "" },
        { label: "Duplicate", shortcut: "⌘D", action: () => console.log("Duplicate") },
        { label: "Make Alias", shortcut: "⌘L", action: () => console.log("Make Alias") },
        { divider: true, label: "" },
        { label: "Quick Look", shortcut: "⌘Y", action: () => console.log("Quick Look") },
        { divider: true, label: "" },
        { label: "Show Original", shortcut: "⌘R", action: () => console.log("Show Original") },
        { divider: true, label: "" },
        { label: "Move to Trash", shortcut: "⌘⌫", action: () => console.log("Move to Trash") },
        { divider: true, label: "" },
        { label: "Eject", shortcut: "⌘E", action: () => console.log("Eject") },
      ],
    },
    {
      label: "Edit",
      items: [
        { label: "Undo", shortcut: "⌘Z", disabled: true },
        { label: "Redo", shortcut: "⇧⌘Z", disabled: true },
        { divider: true, label: "" },
        { label: "Cut", shortcut: "⌘X", disabled: true },
        { label: "Copy", shortcut: "⌘C", disabled: true },
        { label: "Paste", shortcut: "⌘V", disabled: true },
        { label: "Select All", shortcut: "⌘A", action: () => console.log("Select All") },
        { divider: true, label: "" },
        { label: "Show Clipboard", action: () => console.log("Show Clipboard") },
        { divider: true, label: "" },
        { label: "Start Dictation...", shortcut: "⌃⌘D", action: () => console.log("Start Dictation") },
        { label: "Emoji & Symbols", shortcut: "⌃⌘Space", action: () => console.log("Emoji & Symbols") },
      ],
    },
    {
      label: "View",
      items: [
        { label: "as Icons", shortcut: "⌘1", action: () => console.log("as Icons") },
        { label: "as List", shortcut: "⌘2", action: () => console.log("as List") },
        { label: "as Columns", shortcut: "⌘3", action: () => console.log("as Columns") },
        { label: "as Gallery", shortcut: "⌘4", action: () => console.log("as Gallery") },
        { divider: true, label: "" },
        { label: "Use Stacks", shortcut: "⌃⌘0", action: () => console.log("Use Stacks") },
        { label: "Sort By", action: () => console.log("Sort By") },
        { label: "Clean Up", action: () => console.log("Clean Up") },
        { label: "Clean Up By", action: () => console.log("Clean Up By") },
        { divider: true, label: "" },
        { label: "Hide Sidebar", shortcut: "⌃⌘S", action: () => console.log("Hide Sidebar") },
        { label: "Show Preview", shortcut: "⇧⌘P", action: () => console.log("Show Preview") },
        { divider: true },
        { label: "Hide Toolbar", shortcut: "⌥⌘T", action: () => console.log("Hide Toolbar") },
        { label: "Show All Tabs", shortcut: "⇧⌘\\", action: () => console.log("Show All Tabs") },
        { divider: true },
        { label: "Show Tab Bar", shortcut: "⇧⌘T", action: () => console.log("Show Tab Bar") },
        { divider: true },
        { label: "Show Path Bar", shortcut: "⌥⌘P", action: () => console.log("Show Path Bar") },
        { label: "Show Status Bar", shortcut: "⌘/", action: () => console.log("Show Status Bar") },
        { divider: true },
        { label: "Customize Toolbar...", action: () => console.log("Customize Toolbar") },
        { divider: true },
        { label: "Show View Options", shortcut: "⌘J", action: () => console.log("Show View Options") },
      ],
    },
    {
      label: "Go",
      items: [
        { label: "Back", shortcut: "⌘[", action: () => console.log("Back") },
        { label: "Forward", shortcut: "⌘]", action: () => console.log("Forward") },
        { label: "Enclosing Folder", shortcut: "⌘↑", action: () => console.log("Enclosing Folder") },
        { divider: true },
        { label: "Recents", shortcut: "⇧⌘F", action: () => console.log("Recents") },
        { label: "Documents", shortcut: "⇧⌘O", action: () => console.log("Documents") },
        { label: "Desktop", shortcut: "⇧⌘D", action: () => console.log("Desktop") },
        { label: "Downloads", shortcut: "⌥⌘L", action: () => console.log("Downloads") },
        { label: "Home", shortcut: "⇧⌘H", action: () => console.log("Home") },
        { label: "Computer", shortcut: "⇧⌘C", action: () => console.log("Computer") },
        { label: "AirDrop", shortcut: "⇧⌘R", action: () => console.log("AirDrop") },
        { label: "Network", shortcut: "⇧⌘K", action: () => console.log("Network") },
        { label: "iCloud Drive", shortcut: "⇧⌘I", action: () => console.log("iCloud Drive") },
        { divider: true },
        { label: "Applications", shortcut: "⇧⌘A", action: () => console.log("Applications") },
        { label: "Utilities", shortcut: "⇧⌘U", action: () => console.log("Utilities") },
        { divider: true },
        { label: "Go to Folder...", shortcut: "⇧⌘G", action: () => console.log("Go to Folder") },
        { label: "Connect to Server...", shortcut: "⌘K", action: () => console.log("Connect to Server") },
      ],
    },
    {
      label: "Window",
      items: [
        { label: "Minimize", shortcut: "⌘M", action: () => onMinimize?.() },
        { label: isFullscreen ? "Exit Full Screen" : "Enter Full Screen", shortcut: "⌃⌘F", action: () => onFullscreen?.() },
        { divider: true },
        { label: "Move Window to Left Side of Screen", action: () => console.log("Move Left") },
        { label: "Move Window to Right Side of Screen", action: () => console.log("Move Right") },
        { divider: true },
        { label: "Tile Window to Left of Screen", shortcut: "⌃⌘←", action: () => console.log("Tile Left") },
        { label: "Tile Window to Right of Screen", shortcut: "⌃⌘→", action: () => console.log("Tile Right") },
        { divider: true },
        { label: "Cycle Through Windows", shortcut: "⌘`", action: () => console.log("Cycle Windows") },
        { divider: true },
        { label: "Show Previous Tab", shortcut: "⌃⇧⇥", action: () => console.log("Show Previous Tab") },
        { label: "Show Next Tab", shortcut: "⌃⇥", action: () => console.log("Show Next Tab") },
        { label: "Move Tab to New Window", action: () => console.log("Move Tab to New Window") },
        { divider: true },
        { label: "Bring All to Front", action: () => console.log("Bring All to Front") },
      ],
    },
    {
      label: "Help",
      items: [
        { label: `${activeApp || "Finder"} Help`, shortcut: "⌘?", action: () => console.log("Help") },
        { divider: true },
        { label: "macOS Help", action: () => console.log("macOS Help") },
      ],
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenu) {
        const menuElement = menuRefs.current[openMenu];
        if (menuElement && !menuElement.contains(event.target as Node)) {
          setOpenMenu(null);
        }
      }
    };

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [openMenu]);

  const handleMenuClick = (menuLabel: string) => {
    setOpenMenu(openMenu === menuLabel ? null : menuLabel);
  };

  return (
    <div className="flex items-center gap-1">
      {menus.map((menu) => (
        <div key={menu.label} className="relative" ref={(el) => { if (el) menuRefs.current[menu.label] = el; }}>
          <button
            onClick={() => handleMenuClick(menu.label)}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              openMenu === menu.label
                ? "bg-white/20 text-white"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            {menu.label}
          </button>
          {openMenu === menu.label && (
            <div className="absolute top-full left-0 mt-1 bg-gray-800/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl py-1 min-w-[200px] z-50">
              {menu.items.map((item, index) => {
                if (item.divider) {
                  return <div key={`divider-${index}`} className="h-px bg-white/10 my-1" />;
                }
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.action) {
                        item.action();
                      }
                      setOpenMenu(null);
                    }}
                    disabled={item.disabled}
                    className={`w-full text-left px-4 py-1.5 text-xs flex items-center justify-between transition-colors ${
                      item.disabled
                        ? "text-white/30 cursor-not-allowed"
                        : "text-white/90 hover:bg-blue-500/50 cursor-pointer"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <span className="text-white/50 ml-4 font-mono text-[10px]">
                        {item.shortcut}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

