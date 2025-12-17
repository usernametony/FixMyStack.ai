import React from 'react';
import { Bot, Sun, Moon, History, Book } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  onHistoryClick: () => void;
  onDocsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme, onHistoryClick, onDocsClick }) => {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              FixMyStack.ai
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            <button 
              onClick={onDocsClick}
              className="flex items-center gap-1.5 hover:text-primary transition-colors focus:outline-none"
            >
               <Book className="w-4 h-4" />
               Documentation
            </button>
          </div>

          <div className="flex items-center gap-2 pl-2 md:pl-0 border-l md:border-l-0 border-slate-200 dark:border-slate-800">
            <button
              onClick={onHistoryClick}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors focus:outline-none flex items-center gap-2"
              title="View History"
            >
              <History className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">History</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;