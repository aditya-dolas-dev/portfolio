import React, { useState, useEffect, useRef } from "react";
import AsciiComponent from "../components/AsciiComponent";
import { commands, commandButtons } from "../data/Commands";

const TerminalPortfolio = () => {
  const [commandInput, setCommandInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const terminalContentRef = useRef(null);
  const inputRef = useRef(null);
  const scrollAnchorRef = useRef(null); // Scroll anchor

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
      setCommandHistory((prev) => [
        ...prev,
        {
          type: "output",
          content: `<div class="text-green-300">Type <span class="text-blue-400">'help'</span> to get started, or click any command above!</div>`,
        },
      ]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [commandHistory]);

  const executeCommand = (cmd) => {
    const command = cmd.toLowerCase();

    // Add command to history
    setCommandHistory((prev) => [
      ...prev,
      {
        type: "command",
        content: command,
      },
    ]);

    // Clear command
    if (command === "clear" || command === "cls") {
      setCommandHistory([]);
      return;
    }

    // Add response
    let response;
    if (commands[command]) {
      response = commands[command];
    } else {
      response = `
        <div class="text-pink-400 font-semibold">Command not found: ${command}</div>
        <div class="text-green-300">Type 'help' to see available commands.</div>
      `;
    }

    setCommandHistory((prev) => [
      ...prev,
      {
        type: "response",
        content: response,
      },
    ]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && commandInput.trim()) {
      executeCommand(commandInput.trim());
      setCommandInput("");
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-green-400 font-mono relative overflow-x-auto">
      {/* Animated background particles */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute w-full h-full animate-pulse bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-5 min-h-screen flex flex-col">
        <div className="flex-1 bg-slate-900/95 rounded-xl border border-green-400/30 backdrop-blur-lg shadow-2xl shadow-green-400/10 flex flex-col overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-gradient-to-r from-green-400/10 to-green-400/5 p-3 border-b border-green-400/20 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <div className="ml-3 text-sm font-medium text-green-400 drop-shadow-lg">
              aditya_dolas@portfolio:~
            </div>
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalContentRef}
            className="flex-1 p-5 text-sm leading-relaxed overflow-y-auto cursor-text"
            onClick={handleClick}
          >
            {/* ASCII Art */}
            <AsciiComponent />

            {/* Initial content */}
            <div className="space-y-2 mb-4">
              <div className="text-pink-400 font-semibold">
                Portfolio OS v2.0.1
              </div>

              <div className="text-green-400">
                ─────────────────────────────────────────────────────────
              </div>
            </div>

            {/* Intro section */}
            <div className="bg-green-400/5 border-l-2 border-green-400 p-4 mb-4 rounded-r-lg">
              <div className="text-pink-400 font-semibold">
                Welcome! I'm Aditya Dolas
              </div>
              <div className="text-green-300">
                Full Stack Developer | MERN Stack Enthusiast
              </div>
              <div className="text-green-300">
                Passionate About Building Secure & Scalable Web Applications
              </div>
            </div>

            {/* Command buttons */}
            <div className="text-blue-400 mb-4">Available Commands:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
              {commandButtons.map((btn, index) => (
                <div
                  key={index}
                  onClick={() => executeCommand(btn.cmd)}
                  className="bg-green-400/10 border border-green-400/20 rounded-lg p-3 cursor-pointer hover:bg-green-400/20 hover:border-green-400/50 transition-all duration-300 hover:translate-x-1 flex items-center gap-2"
                >
                  <span className="text-pink-400 font-bold min-w-[20px]">
                    {btn.icon}
                  </span>
                  <div>
                    <div className="text-blue-400">{btn.cmd}</div>
                    <div className="text-green-300 text-xs">{btn.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-green-300 mb-4">
              Type any command above or use the input below:
            </div>

            {/* Command History */}
            {commandHistory.map((item, index) => (
              <div key={index} className="mb-2">
                {item.type === "command" && (
                  <div>
                    <br />
                    <span className="text-green-400">
                      aditya_dolas@portfolio:~$
                    </span>
                    <span className="text-blue-400 ml-2">{item.content}</span>
                  </div>
                )}
                {item.type === "response" && (
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                )}
                {item.type === "output" && (
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                )}
              </div>
            ))}

            {/* Scroll Anchor */}
            <div ref={scrollAnchorRef} />

            {/* Input area */}
            <div className="flex items-center gap-2 mt-5 p-2 bg-green-400/5 rounded-lg border border-green-400/20">
              <span className="text-green-400">aditya_dolas@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a command..."
                className="bg-transparent border-none text-green-400 font-mono text-sm outline-none flex-1"
                autoFocus
              />
              <div className="w-2 h-4 bg-green-400 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalPortfolio;
