import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';
import Footer from './components/Footer';
import HistoryModal from './components/HistoryModal';
import DocumentationModal from './components/DocumentationModal';
import { TechStack, ExplainLevel, AnalysisResult, HistoryItem } from './types';
import { analyzeError } from './utils/mockAi';

function App() {
  // App State
  const [errorInput, setErrorInput] = useState('');
  const [selectedStack, setSelectedStack] = useState<TechStack>(TechStack.AUTO);
  const [selectedLevel, setSelectedLevel] = useState<ExplainLevel>(ExplainLevel.BEGINNER);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Modal States
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  useEffect(() => {
    // Check local storage or system preference on mount
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
    } else {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    // Load History
    const storedHistory = localStorage.getItem('errorHistory');
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const saveToHistory = (item: HistoryItem) => {
    const newHistory = [item, ...history].slice(0, 50); // Keep last 50
    setHistory(newHistory);
    localStorage.setItem('errorHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('errorHistory');
  };

  const loadHistoryItem = (item: HistoryItem) => {
    setErrorInput(item.errorInput);
    setSelectedStack(item.stack); // Keep original or detected? Let's use stored.
    setSelectedLevel(item.level);
    setAnalysisResult(item.result);
  };

  const handleAnalyze = async () => {
    if (!errorInput.trim()) return;

    setIsAnalyzing(true);
    setAnalysisResult(null); // Reset previous result

    try {
      const result = await analyzeError(errorInput, selectedStack, selectedLevel);
      setAnalysisResult(result);
      
      // If Auto-Detect was used, update the UI selection to show what was detected
      const finalStack = result.detectedStack || selectedStack;
      if (selectedStack === TechStack.AUTO && result.detectedStack) {
        setSelectedStack(result.detectedStack);
      }

      // Save to History
      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        errorInput,
        stack: finalStack === TechStack.AUTO ? TechStack.GENERAL : finalStack,
        level: selectedLevel,
        result
      };
      saveToHistory(historyItem);

    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/30 selection:text-primary dark:selection:text-white transition-colors duration-300">
      <Header 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        onHistoryClick={() => setIsHistoryOpen(true)}
        onDocsClick={() => setIsDocsOpen(true)}
      />
      
      <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-12">
          <InputSection 
            errorInput={errorInput}
            setErrorInput={setErrorInput}
            selectedStack={selectedStack}
            setSelectedStack={setSelectedStack}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
          />
          
          <OutputSection result={analysisResult} />
        </div>
      </main>

      <Footer />
      
      <HistoryModal 
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelect={loadHistoryItem}
        onClear={clearHistory}
      />

      <DocumentationModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      {/* Global CSS animation keyframes injection for simple fade-ins */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}

export default App;