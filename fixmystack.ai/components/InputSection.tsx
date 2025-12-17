import React, { useRef, useState } from 'react';
import { TechStack, ExplainLevel } from '../types';
import { Sparkles, Code, Layers, AlertCircle, Upload, FileText, X } from 'lucide-react';

interface InputSectionProps {
  errorInput: string;
  setErrorInput: (value: string) => void;
  selectedStack: TechStack;
  setSelectedStack: (stack: TechStack) => void;
  selectedLevel: ExplainLevel;
  setSelectedLevel: (level: ExplainLevel) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({
  errorInput,
  setErrorInput,
  selectedStack,
  setSelectedStack,
  selectedLevel,
  setSelectedLevel,
  onAnalyze,
  isAnalyzing,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      readFile(file);
    }
  };

  const readFile = (file: File) => {
    // Check file type to determine how to read it
    const isImage = file.type.startsWith('image/');
    const isAudio = file.type.startsWith('audio/');
    const isText = file.type.startsWith('text/') || file.name.endsWith('.js') || file.name.endsWith('.ts') || file.name.endsWith('.json') || file.name.endsWith('.md');
    
    if (isText) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setErrorInput(text);
      };
      reader.readAsText(file);
    } else {
      // Simulate extraction for binary files (Images, Audio, Word docs)
      // In a real app, this would use an API or local WASM library.
      // We inject simulation text so the mock AI has something to analyze.
      let simulatedContent = `[System: Attached file "${file.name}"]\n`;
      
      if (isImage) {
        simulatedContent += `[Simulated OCR] detected text:\nTypeError: Cannot read property 'map' of undefined\n    at Component (App.js:12)\n\n(This is a simulated extraction for the demo)`;
      } else if (isAudio) {
        simulatedContent += `[Simulated Transcription]: "I'm trying to run my Node server but getting an EADDRINUSE error on port 3000."`;
      } else {
        simulatedContent += `[Simulated Document Extraction]:\njava.lang.NullPointerException\n    at com.example.MyClass.method(MyClass.java:10)`;
      }
      
      setErrorInput(simulatedContent);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      readFile(file);
    }
  };

  const handleClear = () => {
    setErrorInput('');
    // Also clear file input value so same file can be selected again if needed
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="text-center space-y-3 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">
          Paste the error. <span className="text-primary">Get the fix.</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Understand why your code broke and how to fix it in seconds.
        </p>
      </div>

      {/* Main Input Card */}
      <div className="bg-surface rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl dark:shadow-2xl overflow-hidden p-1 transition-colors duration-300">
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 md:p-6 space-y-6 transition-colors duration-300">
          
          {/* Text Area with Drag & Drop */}
          <div 
            className={`relative group ${isDragging ? 'ring-2 ring-primary ring-offset-2 ring-offset-slate-900' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
             <div className="absolute top-3 left-3 pointer-events-none text-slate-400 dark:text-slate-500">
                <AlertCircle className="w-5 h-5" />
             </div>
             
             <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
               {/* Clear Button (Visible only if there is input) */}
               {errorInput && (
                 <button 
                   onClick={handleClear}
                   className="flex items-center justify-center p-1.5 rounded-md text-slate-500 hover:text-red-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                   title="Clear input"
                 >
                   <X className="w-4 h-4" />
                 </button>
               )}
               
               {/* File Upload Button */}
               <input 
                 type="file" 
                 ref={fileInputRef}
                 className="hidden"
                 accept="image/*,audio/*,.txt,.log,.js,.ts,.py,.java,.sql,.json,.md,.doc,.docx"
                 onChange={handleFileChange}
               />
               <button 
                 onClick={() => fileInputRef.current?.click()}
                 className="flex items-center gap-2 text-xs font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-primary hover:text-primary dark:hover:text-primary px-3 py-1.5 rounded-md transition-all shadow-sm"
                 title="Upload Log File, Image, or Audio"
               >
                 <Upload className="w-3.5 h-3.5" />
                 <span className="hidden sm:inline">Upload</span>
               </button>
             </div>

            <textarea
              value={errorInput}
              onChange={(e) => setErrorInput(e.target.value)}
              placeholder="Paste error logs, or drop images/audio files here..."
              className={`w-full h-48 bg-white dark:bg-slate-950 border rounded-lg p-4 pl-10 pt-10 text-slate-800 dark:text-slate-300 font-mono text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all ${isDragging ? 'border-primary bg-primary/5' : 'border-slate-300 dark:border-slate-800'}`}
            />
            
            {isDragging && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 rounded-lg pointer-events-none backdrop-blur-sm z-20">
                <div className="text-center text-white">
                  <FileText className="w-10 h-10 mx-auto mb-2 text-primary" />
                  <p className="font-bold text-lg">Drop file to analyze</p>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tech Stack Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Code className="w-4 h-4" /> Tech Stack
              </label>
              <div className="relative">
                <select
                  value={selectedStack}
                  onChange={(e) => setSelectedStack(e.target.value as TechStack)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg px-4 py-2.5 appearance-none focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer"
                >
                  {Object.values(TechStack).map((stack) => (
                    <option key={stack} value={stack}>
                      {stack === TechStack.AUTO ? '✨ Auto-Detect' : stack}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <Layers className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Explanation Level */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 dark:text-slate-400">Explanation Level</label>
              <div className="grid grid-cols-3 gap-2 bg-slate-200 dark:bg-slate-800 p-1 rounded-lg border border-slate-300 dark:border-slate-700 transition-colors">
                {Object.values(ExplainLevel).map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`text-xs font-medium py-2 rounded-md transition-all ${
                      selectedLevel === level
                        ? 'bg-primary text-white shadow-md'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onAnalyze}
            disabled={isAnalyzing || !errorInput.trim()}
            className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] ${
              isAnalyzing || !errorInput.trim()
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white shadow-lg shadow-primary/25'
            }`}
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing Error...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Analyze Error
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputSection;