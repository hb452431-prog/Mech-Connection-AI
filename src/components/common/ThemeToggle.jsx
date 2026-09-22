import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

/**
 * ThemeToggle - Top right corner theme switcher button
 * Shows Sun in light mode, toggles to Moon in dark mode.
 */
export const ThemeToggle = ({ className = '', size = 'md' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-10 h-10 text-base'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4.5 h-4.5',
    lg: 'w-5 h-5'
  };

  const currentSizeClass = sizeClasses[size] || sizeClasses.md;
  const currentIconSize = iconSizes[size] || iconSizes.md;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
      title={isDark ? 'Switch to Light mode (Sun)' : 'Switch to Dark mode (Moon)'}
      className={`relative inline-flex items-center justify-center rounded-xl transition-all duration-300 select-none active:scale-90 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        isDark
          ? 'bg-slate-800/90 text-amber-300 hover:text-amber-200 border border-slate-700/80 shadow-md hover:bg-slate-700/80 hover:border-amber-400/40 hover:shadow-amber-500/10'
          : 'bg-white/95 text-amber-600 hover:text-amber-700 border border-slate-200 shadow-xs hover:bg-amber-50/80 hover:border-amber-300 hover:shadow-amber-500/15'
      } ${currentSizeClass} ${className}`}
    >
      {/* Dynamic Animated Sun / Moon Icon */}
      <div className="relative flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
        {isDark ? (
          // Moon icon for Dark Mode (click to switch to Light)
          <div className="flex items-center justify-center text-indigo-300 dark:text-cyan-300">
            <Moon className={`${currentIconSize} transition-all duration-300 filter drop-shadow-[0_0_6px_rgba(56,189,248,0.5)]`} />
            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
          </div>
        ) : (
          // Sun icon for Light Mode (click to switch to Dark)
          <div className="flex items-center justify-center text-amber-500">
            <Sun className={`${currentIconSize} transition-all duration-300 group-hover:rotate-45 filter drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]`} />
            <span className="absolute inset-0 rounded-full bg-amber-400/20 blur-xs -z-10 group-hover:scale-125 transition-transform" />
          </div>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
