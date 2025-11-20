"use client";

import { useState, useRef, useEffect } from "react";

type AppleMenuItem = {
  label?: string;
  action?: () => void;
  shortcut?: string;
  divider?: boolean;
  disabled?: boolean;
};

type AppleMenuProps = {
  onClose?: () => void;
  onShutdown?: () => void;
  onLogout?: () => void;
};

export default function AppleMenu({ onClose, onShutdown, onLogout }: AppleMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems: AppleMenuItem[] = [
    { label: "About This Mac", action: () => console.log("About This Mac") },
    { divider: true, label: "" },
    { label: "System Settings...", action: () => console.log("System Settings") },
    { label: "App Store...", action: () => console.log("App Store") },
    { divider: true, label: "" },
    { label: "Recent Items", action: () => console.log("Recent Items") },
    { divider: true, label: "" },
    { label: "Force Quit...", shortcut: "⌥⌘⎋", action: () => console.log("Force Quit") },
    { divider: true, label: "" },
    { label: "Sleep", action: () => console.log("Sleep") },
    { label: "Restart...", action: () => console.log("Restart") },
    { label: "Shut Down...", action: () => onShutdown?.() },
    { divider: true, label: "" },
    { label: "Lock Screen", shortcut: "⌃⌘Q", action: () => console.log("Lock Screen") },
    { label: "Log Out...", shortcut: "⇧⌘Q", action: () => onLogout?.() },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-2 py-1 rounded text-base font-medium transition-colors ${
          isOpen
            ? "bg-white/20 text-white"
            : "text-white/90 hover:bg-white/10 hover:text-white"
        }`}
      >
        
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-gray-800/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl py-1 min-w-[220px] z-50">
          {menuItems.map((item, index) => {
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
                  setIsOpen(false);
                  if (onClose) onClose();
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
  );
}

