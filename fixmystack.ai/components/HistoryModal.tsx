import React from 'react';
import { HistoryItem } from '../types';
import { X, Clock, Trash2, ArrowRight, FileCode } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ 
  isOpen, 
  onClose, 
  history, 
  onSelect,
  onClear
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Analysis History</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="overflow-y-auto p-4 space-y-3 flex-1">
          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No history yet. Analyze some errors!</p>
            </div>
          ) : (
            history.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelect(item);
                  onClose();
                }}
                className="w-full text-left bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all group group-hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-2">
                   <div className="flex items-center gap-2">
                     <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                        item.stack === 'React' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                        item.stack === 'Node.js' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                        'bg-slate-500/10 text-slate-500 border-slate-500/20'
                     }`}>
                       {item.stack}
                     </span>
                     <span className="text-xs text-slate-400">
                       {new Date(item.timestamp).toLocaleString()}
                     </span>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded text-slate-400">
                    <FileCode className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                      {item.result.whatWentWrong}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 truncate font-mono mt-0.5 opacity-70">
                      {item.errorInput.substring(0, 60)}...
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end">
            <button
              onClick={onClear}
              className="flex items-center gap-2 text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 px-3 py-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Clear History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryModal;