import React from 'react';
import { X, Book, Lightbulb, Zap, Terminal } from 'lucide-react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <Book className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100">Documentation</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-8 text-slate-600 dark:text-slate-300">
          
          <section className="space-y-3">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-indigo-500" />
              About FixMyStack.ai
            </h4>
            <p className="leading-relaxed">
              FixMyStack.ai is an intelligent error analysis tool designed for developers of all levels. 
              By leveraging AI logic, it parses complex stack traces, logs, and error messages to provide 
              human-readable explanations, root causes, and copy-pasteable fixes.
            </p>
          </section>

          <section className="space-y-3">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              How to Use
            </h4>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li><strong className="text-slate-800 dark:text-slate-200">Paste your error:</strong> Simply copy the error message from your terminal or console.</li>
              <li><strong className="text-slate-800 dark:text-slate-200">Upload logs:</strong> You can upload text files, logs, screenshots, or even audio recordings of the error description.</li>
              <li><strong className="text-slate-800 dark:text-slate-200">Select Stack:</strong> Choose your technology (React, Node, Python, etc.) or let the Auto-Detect feature identify it.</li>
              <li><strong className="text-slate-800 dark:text-slate-200">Analyze:</strong> Click the button to get a comprehensive breakdown including prevention tips.</li>
            </ol>
          </section>

          <section className="space-y-3">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-emerald-500" />
              Tips & Tricks
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                <strong className="block text-slate-900 dark:text-slate-100 mb-1">Context Matters</strong>
                <p className="text-sm">Include the lines of code *before* the error occurred for better context analysis.</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                <strong className="block text-slate-900 dark:text-slate-100 mb-1">Auto-Detect</strong>
                <p className="text-sm">Not sure which stack? Use "Auto-Detect". The AI scans for keywords like `useEffect` (React) or `def` (Python).</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                <strong className="block text-slate-900 dark:text-slate-100 mb-1">History</strong>
                <p className="text-sm">Access your previous fixes using the History button in the top navigation bar.</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                <strong className="block text-slate-900 dark:text-slate-100 mb-1">Multimodal Input</strong>
                <p className="text-sm">Drag and drop screenshots of errors! The system can extract text from images to analyze the issue.</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default DocumentationModal;