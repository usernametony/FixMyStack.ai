import { TechStack, AnalysisResult, ExplainLevel } from '../types';

const detectTechStack = (text: string): TechStack => {
  const lower = text.toLowerCase();
  
  if (lower.includes('react') || lower.includes('useeffect') || lower.includes('usestate') || lower.includes('jsx') || lower.includes('component')) return TechStack.REACT;
  if (lower.includes('node') || lower.includes('npm') || lower.includes('module.exports') || lower.includes('console.log') || lower.includes('process.env')) return TechStack.NODE;
  if (lower.includes('java') || lower.includes('system.out') || lower.includes('nullpointerexception') || lower.includes('public class') || lower.includes('maven')) return TechStack.JAVA;
  if (lower.includes('python') || lower.includes('def ') || lower.includes('import ') || lower.includes('traceback') || lower.includes('indentationerror')) return TechStack.PYTHON;
  if (lower.includes('sql') || lower.includes('select') || lower.includes('insert') || lower.includes('update') || lower.includes('table')) return TechStack.SQL;
  if (lower.includes('docker') || lower.includes('container') || lower.includes('image') || lower.includes('build') || lower.includes('volume')) return TechStack.DOCKER;
  
  return TechStack.GENERAL;
};

// A simple simulation of AI logic based on keywords and selected stack
export const analyzeError = async (
  errorText: string,
  stack: TechStack,
  level: ExplainLevel
): Promise<AnalysisResult> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  let activeStack = stack;
  let detectedStack: TechStack | undefined;

  // Auto-detection logic
  if (stack === TechStack.AUTO) {
    activeStack = detectTechStack(errorText);
    detectedStack = activeStack;
  }

  const lowerError = errorText.toLowerCase();

  // 1. REACT SCENARIOS
  if (activeStack === TechStack.REACT) {
    if (lowerError.includes('map') && lowerError.includes('undefined')) {
      return {
        detectedStack,
        whatWentWrong: "You are trying to loop through a list (array) to display it, but the list doesn't exist yet.",
        rootCause: "The variable you are calling `.map()` on is `undefined`. This often happens when data is fetched asynchronously but the component renders before the data arrives.",
        fixCode: `// Option 1: Optional Chaining (easiest)
{items?.map(item => (
  <div key={item.id}>{item.name}</div>
))}

// Option 2: Default Value in State
const [items, setItems] = useState([]); // Initialize with empty array`,
        prevention: [
          "Always initialize state arrays with `[]` instead of leaving them empty.",
          "Use optional chaining `?.` when accessing properties of potentially undefined objects.",
          "Implement loading states while fetching data."
        ],
        learningInsight: "In JavaScript, `undefined` is not an object, so it has no methods. When React tries to execute `undefined.map(...)`, the runtime throws an error because the prototype chain is broken immediately."
      };
    }
    if (lowerError.includes('too many re-renders') || lowerError.includes('infinite loop')) {
       return {
        detectedStack,
        whatWentWrong: "Your component is stuck in a loop where it updates itself, which causes it to update itself again, forever.",
        rootCause: "You likely called a state setter function (like `setCount`) directly inside the component body or inside an `useEffect` without proper dependencies.",
        fixCode: `// WRONG:
// <button onClick={handleClick()}>Click</button>

// CORRECT: Pass a function, don't call it immediately
<button onClick={() => handleClick()}>Click</button>

// OR check useEffect
useEffect(() => {
  // Logic here
}, []); // <--- Ensure dependency array is correct`,
        prevention: [
          "Don't invoke functions in JSX event handlers; pass the reference.",
          "Verify `useEffect` dependency arrays.",
          "Avoid setting state directly in the render body."
        ],
        learningInsight: "React's render phase must be pure. Side effects (like setting state) should only happen in event handlers or `useEffect`. Triggering a state update during render forces an immediate re-render."
      };
    }
  }

  // 2. NODE.JS SCENARIOS
  if (activeStack === TechStack.NODE) {
    if (lowerError.includes('eaddrinuse')) {
      return {
        detectedStack,
        whatWentWrong: "The port you are trying to start your server on is already taken by another process.",
        rootCause: "An instance of your server is likely already running in the background, or another application is using that port.",
        fixCode: `// Find the process using port 3000 (Mac/Linux)
lsof -i :3000
kill -9 <PID>

// Or change the port in your code
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(\`Server running on \${PORT}\`));`,
        prevention: [
          "Handle `process.on('SIGTERM')` to shut down gracefully.",
          "Use tools like `nodemon` which handle restarts better.",
          "Check for orphan node processes."
        ],
        learningInsight: "Ports are operating system resources. Only one process can bind to a specific TCP port at a time. `EADDRINUSE` stands for Error Address In Use."
      };
    }
  }

  // 3. PYTHON SCENARIOS
  if (activeStack === TechStack.PYTHON) {
    if (lowerError.includes('indentationerror')) {
      return {
        detectedStack,
        whatWentWrong: "Your code is not lined up correctly.",
        rootCause: "Python relies on whitespace (indentation) to define code blocks. You likely mixed tabs and spaces or missed a level of indentation.",
        fixCode: `# Ensure consistent indentation (usually 4 spaces)
def my_function():
    if True:
        print("This is correct")
    else:
        print("This is also correct")`,
        prevention: [
          "Configure your editor to 'Insert Spaces' instead of Tabs.",
          "Use a linter like `flake8` or formatter like `black`.",
          "Enable 'Render Whitespace' in your IDE."
        ],
        learningInsight: "Unlike C-family languages that use `{}` braces, Python uses indentation to determine scope. This enforces readability but requires strict discipline with whitespace characters."
      };
    }
  }

  // 4. SQL SCENARIOS
  if (activeStack === TechStack.SQL) {
    if (lowerError.includes('syntax error')) {
       return {
        detectedStack,
        whatWentWrong: " The database couldn't understand your command due to a typo or incorrect grammar.",
        rootCause: "Common causes include missing commas, mismatched quotes, or using reserved keywords as column names.",
        fixCode: `-- Check for reserved keywords and quote them if necessary
SELECT "order", total FROM orders;

-- Ensure string literals use single quotes
SELECT * FROM users WHERE name = 'John';`,
        prevention: [
          "Use an IDE with SQL highlighting.",
          "Avoid using reserved words (like `ORDER`, `User`, `Table`) for custom names.",
          "Always test complex queries in isolation."
        ],
        learningInsight: "SQL engines parse queries in specific orders (FROM -> WHERE -> SELECT). A syntax error usually means the parser failed to tokenize the string into a valid command tree."
      };
    }
  }

  // FALLBACK / GENERAL
  return {
    detectedStack,
    whatWentWrong: "It looks like a runtime error or configuration issue in your application.",
    rootCause: "Based on the input, this seems to be an unhandled exception or a misconfiguration in your " + activeStack + " environment.",
    fixCode: `// 1. Check your logs for the specific line number.
// 2. Wrap the suspicious code in a try-catch block (if applicable)

try {
  // Your code here
} catch (error) {
  console.error("Caught error:", error);
}

// 3. Verify environment variables and imports.`,
    prevention: [
      "Implement robust error handling.",
      "Add logging to trace execution flow.",
      "Review recent code changes."
    ],
    learningInsight: `Debugging is the process of removing bugs. Programming is the process of putting them in. ${level === ExplainLevel.BEGINNER ? 'Start by reading the error message carefully—it usually tells you exactly where to look.' : 'Analyze the stack trace from top to bottom to identify the first line of your own code involved.'}`
  };
};