import React from 'react';
import { Palette } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 py-10 border-t border-slate-200 dark:border-slate-800 text-center transition-colors duration-300">
      <div className="flex flex-col items-center gap-4">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Powered by <span className="text-slate-700 dark:text-slate-200 font-medium">Google AI Studio (Gemini)</span>
        </p>
        
        {/* Designer Tag */}
        <div className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-default">
          <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400">
            <Palette className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col items-start text-xs text-left">
            <span className="text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase text-[10px] leading-tight">AI Product Designer</span>
            <span className="font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-sm">
              Vinay Kumar Perumalla
            </span>
          </div>
        </div>

        <p className="text-slate-400 dark:text-slate-600 text-xs mt-4">
          &copy; {new Date().getFullYear()} FixMyStack.ai. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;