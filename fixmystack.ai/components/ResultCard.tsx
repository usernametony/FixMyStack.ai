import React, { ReactNode } from 'react';

interface ResultCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  colorClass?: string;
  delay?: number;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, icon, children, colorClass = "text-slate-700 dark:text-slate-200", delay = 0 }) => {
  return (
    <div 
      className="bg-surface border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-lg animate-fade-in-up transition-colors duration-300"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-900 ${colorClass}`}>
          {icon}
        </div>
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{title}</h3>
      </div>
      <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default ResultCard;