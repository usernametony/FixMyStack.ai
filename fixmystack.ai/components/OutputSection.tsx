import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import ResultCard from './ResultCard';
import { AlertTriangle, Search, Wrench, ShieldCheck, BookOpen, Copy, Check } from 'lucide-react';

interface OutputSectionProps {
  result: AnalysisResult | null;
}

const OutputSection: React.FC<OutputSectionProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!result) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(result.fixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: What Went Wrong */}
        <ResultCard 
          title="What Went Wrong" 
          icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
          colorClass="text-amber-500"
          delay={100}
        >
          <p>{result.whatWentWrong}</p>
        </ResultCard>

        {/* Card 2: Root Cause */}
        <ResultCard 
          title="Why This Happened" 
          icon={<Search className="w-5 h-5 text-blue-500" />}
          colorClass="text-blue-500"
          delay={200}
        >
          <p>{result.rootCause}</p>
        </ResultCard>
      </div>

      {/* Card 3: The Fix */}
      <ResultCard 
        title="How to Fix It" 
        icon={<Wrench className="w-5 h-5 text-emerald-500" />}
        colorClass="text-emerald-500"
        delay={300}
      >
        <div className="relative group">
          <div className="absolute right-2 top-2">
            <button
              onClick={handleCopy}
              className="p-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700"
              title="Copy code"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-sm font-mono text-slate-800 dark:text-slate-300 transition-colors duration-300">
            <code>{result.fixCode}</code>
          </pre>
        </div>
      </ResultCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 4: Prevention */}
        <ResultCard 
          title="Prevent This in Future" 
          icon={<ShieldCheck className="w-5 h-5 text-purple-500" />}
          colorClass="text-purple-500"
          delay={400}
        >
          <ul className="list-disc list-inside space-y-2 marker:text-purple-500">
            {result.prevention.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </ResultCard>

        {/* Card 5: Learning Insight */}
        <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-lg animate-fade-in-up transition-colors duration-300" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
           <button 
             onClick={() => setIsExpanded(!isExpanded)}
             className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
           >
             <div className="flex items-center gap-3">
               <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-pink-500">
                 <BookOpen className="w-5 h-5" />
               </div>
               <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Learning Insight</h3>
             </div>
             <span className="text-sm text-primary font-medium">
               {isExpanded ? 'Show Less' : 'Read More'}
             </span>
           </button>
           
           {isExpanded && (
             <div className="px-6 pb-6 pt-0 text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800/50 mt-2 pt-4 animate-in slide-in-from-top-2">
               {result.learningInsight}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default OutputSection;