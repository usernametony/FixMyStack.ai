import React, { useState } from 'react';
import { Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (success: boolean) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'FixMyStack.ai') {
      onLogin(true);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="text-center mb-10">
           <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              FixMyStack.ai
            </h1>
            <p className="text-slate-500 dark:text-slate-400">Restricted Access</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-lg pl-4 pr-10 py-3 outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400 ${
                    error 
                      ? 'border-red-500 ring-2 ring-red-500/20' 
                      : 'border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-primary/50 focus:border-primary'
                  } ${shake ? 'animate-shake' : ''}`}
                  placeholder="Enter access password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {error && (
                <p className="text-xs text-red-500 animate-fade-in">Incorrect password. Hint: FixMyStack.ai</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-indigo-500 hover:to-indigo-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            >
              Access System <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
       <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};

export default LoginScreen;