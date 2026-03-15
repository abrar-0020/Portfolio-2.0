'use client'

import { useState, useRef, useEffect } from 'react'

export default function PortfolioTerminal() {
  const desktopWelcomeMessage = `
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║      █████╗ ██████╗ ██████╗  █████╗ ██████╗                  ║
║     ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗                 ║
║     ███████║██████╔╝██████╔╝███████║██████╔╝                 ║
║     ██╔══██║██╔══██╗██╔══██╗██╔══██║██╔══██╗                 ║
║     ██║  ██║██████╔╝██║  ██║██║  ██║██║  ██║                 ║
║     ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝                 ║
║                                                               ║
║              Blockchain Developer & Prompt Engineer          ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

[SYSTEM INITIALIZED] - Portfolio Terminal v1.0
[STATUS] System online and ready for interaction
[LOCATION] Bangalore, India

Type 'help' to see available commands.
Type 'about' to learn more about me.`

  const mobileWelcomeMessage = `
[SYSTEM INITIALIZED] - Portfolio Terminal v1.0
[STATUS] System online and ready for interaction
[LOCATION] Bangalore, India

ABRAR PASHA
Blockchain Developer & Prompt Engineer

Type 'help' to see available commands.
Type 'about' to learn more about me.`

  const [isMobileView, setIsMobileView] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  )
  const welcomeMessage = isMobileView ? mobileWelcomeMessage : desktopWelcomeMessage

  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
    { command: '/welcome', output: '' },
  ])
  const [currentCommand, setCurrentCommand] = useState('')
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isBootTyping, setIsBootTyping] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const sessionStartRef = useRef(Date.now())
  const commandCountRef = useRef(0)
  const validCommandCountRef = useRef(0)
  const commandUsageRef = useRef<Record<string, number>>({})

  const fortuneQuotes = [
    'Code is poetry when it solves a real problem.',
    'Ship small, learn fast, iterate hard.',
    'Smart contracts are strict teachers with expensive exams.',
    'Build tools that your future self thanks you for.',
    'AI plus blockchain is best when it serves real users.',
  ]

  const getSessionDuration = () => {
    const totalSeconds = Math.floor((Date.now() - sessionStartRef.current) / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}m ${seconds}s`
  }

  const getTopCommand = () => {
    const entries = Object.entries(commandUsageRef.current)
    if (entries.length === 0) return 'none'

    const [topName, topCount] = entries.sort((a, b) => b[1] - a[1])[0]
    return `${topName} (${topCount})`
  }

  const createMatrixNoise = () => {
    const glyphs = '01#@$%&*+=<>[]{}'
    return Array.from({ length: 8 }, () => (
      Array.from({ length: 54 }, () => glyphs[Math.floor(Math.random() * glyphs.length)]).join('')
    )).join('\n')
  }

  const playKeySound = (frequency: number, duration = 0.02, volume = 0.012) => {
    if (!soundEnabled || typeof window === 'undefined') return

    if (!audioContextRef.current) {
      const AudioContextCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AudioContextCtor) return
      audioContextRef.current = new AudioContextCtor()
    }

    const audioContext = audioContextRef.current
    if (!audioContext) return

    if (audioContext.state === 'suspended') {
      void audioContext.resume()
    }

    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()

    oscillator.type = 'square'
    oscillator.frequency.value = frequency
    gain.gain.value = volume

    oscillator.connect(gain)
    gain.connect(audioContext.destination)

    oscillator.start()
    oscillator.stop(audioContext.currentTime + duration)
  }

  const commands = {
    'help': () => `
┌─────────────────────────────────────────────────────────────┐
│                    AVAILABLE COMMANDS                        │
└─────────────────────────────────────────────────────────────┘

  about, a       Display personal information and summary
  experience, e  View work experience and internships
  education, ed  Show educational background
  skills, s      Display technical skills matrix
  projects, p    View project portfolio
  contact, c     Show contact information
  resume, r      Open/download CV resume
  socials, so    Show GitHub, LinkedIn & Email links
  clear          Clear terminal screen
  help, h        Display this help message

Type any command to execute. Use ↑/↓ arrows to navigate history.
    `,
    'a': function() { return commands['about'](); },
    'about': () => `
┌─────────────────────────────────────────────────────────────┐
│                        ABOUT ME                              │
└─────────────────────────────────────────────────────────────┘

Name: Abrar Pasha
Role: Blockchain Developer & Prompt Engineer
Location: 📍 Bangalore, India
Status: AI Research Intern (Jun 2025 – Sep 2025)

Bio:
Computer Science Engineering student specializing in Blockchain 
Technology at Presidency University, Bangalore. I build AI-powered 
and blockchain-enabled applications, focusing on rapid prototyping, 
smart contracts, and full-stack development.

Expertise Areas:
  • Blockchain & Smart Contracts (Solidity, Ethereum)
  • AI Integration & Machine Learning
  • Web3 Development
  • Full-Stack Development
  • Rapid Prototyping

Current Focus:
Building AI-powered application prototypes and contributing to 
AI-driven educational platforms.
    `,
    'e': function() { return commands['experience'](); },
    'experience': () => `
┌─────────────────────────────────────────────────────────────┐
│                    WORK EXPERIENCE                           │
└─────────────────────────────────────────────────────────────┘

[2025-06 to 2025-09] AI Research Intern
Coding Jr
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • Built AI-powered application prototypes
  • Integrated machine learning models and AI APIs
  • Contributed to AI-driven educational platforms
  • Tech Stack: Python, AI APIs, ML Integration

Status: Currently seeking opportunities in blockchain and AI development
    `,
    'ed': function() { return commands['education'](); },
    'education': () => `
┌─────────────────────────────────────────────────────────────┐
│                    EDUCATION                                 │
└─────────────────────────────────────────────────────────────┘

[2023-Present] B.Tech CSE (Blockchain Technology)
Presidency University, Bangalore
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • Specialization: Blockchain Technology
  • Projects: Decentralized voting, Smart contract security
  • Focus: Building production-ready blockchain applications

[2021-2023] PUC (Pre-University Course)
Presidency PU College, Bangalore
  • Score: 80%

[2009-2021] High School
Bharath English High School, Bangalore
  • Score: 86%
    `,
    's': function() { return commands['skills'](); },
    'skills': () => `
┌─────────────────────────────────────────────────────────────┐
│                   TECHNICAL SKILLS MATRIX                    │
└─────────────────────────────────────────────────────────────┘

PROGRAMMING LANGUAGES:
  Python                ████████████████████ 100%
  JavaScript            ██████████████████   90%
  Solidity              ██████████████████   90%
  Java                  ████████████████     80%
  C                     ████████████         60%
  HTML/CSS              ████████████████████ 100%

BLOCKCHAIN & WEB3:
  Smart Contracts       ██████████████████   90%
  Solidity              ██████████████████   90%
  Ethereum              ██████████████████   90%
  Web3.js               ████████████████     80%
  DeFi Concepts         ████████████         60%

AI & MACHINE LEARNING:
  AI APIs Integration   ██████████████████   90%
  ML Models             ████████████████     80%
  Python ML Libraries   ████████████████     80%
  Prompt Engineering    ████████████████████ 100%

TOOLS & FRAMEWORKS:
  React                 ████████████████     80%
  Flask                 ████████████████     80%
  Git/GitHub            ████████████████████ 100%
  Rapid Prototyping     ████████████████████ 100%
  Docker                ████████████         60%
    `,
    'p': function() { return commands['projects'](); },
    'projects': () => `
┌─────────────────────────────────────────────────────────────┐
│                   PROJECT PORTFOLIO                          │
└─────────────────────────────────────────────────────────────┘

[1] Decentralized E-Voting System
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Description: Blockchain voting platform ensuring transparency
  Tech Stack: Solidity, Ethereum, Web3.js, React
  GitHub: https://github.com/abrar-0020/Decentralized-E-Voting-System-for-College
  Features: Tamper-proof results, transparent voting, smart contracts

[2] Integri-Checker
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Description: File integrity verification tool using cryptographic hashing
  Tech Stack: Python, Tkinter, Cryptography
  GitHub: https://github.com/abrar-0020/Integri-Checker
  Features: Hash verification, file integrity checks, secure validation

[3] AI Chat Application
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Description: Context-aware conversational AI system
  Tech Stack: Python, Flask, AI APIs, JavaScript
  GitHub: https://github.com/abrar-0020/ai-chat-app
  Features: Natural language processing, context awareness, real-time chat

[4] Code-Canva-AI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Description: Converts design screenshots into functional code
  Tech Stack: Python, Computer Vision, AI APIs, React
  GitHub: https://github.com/abrar-0020/Code-Canva-AI
  Features: Design-to-code conversion, AI-powered code generation

[5] Voice Calculator
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Description: Android voice-based calculator
  Tech Stack: Java, Android SDK, Speech Recognition
  GitHub: https://github.com/abrar-0020/Voice-Calculator
  Features: Voice input, real-time calculation, mobile app

[6] Expense Tracker
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Description: Offline expense management app
  Tech Stack: Flutter, Dart, SQL
  GitHub: https://github.com/abrar-0020/Expense_Tracker
  Features: Offline tracking, expense categorization, data persistence
    `,
    'c': function() { return commands['contact'](); },
    'contact': () => `
┌─────────────────────────────────────────────────────────────┐
│                   CONTACT INFORMATION                        │
└─────────────────────────────────────────────────────────────┘

📧 Email:    abrarp952@gmail.com
🐙 GitHub:   https://github.com/abrar-0020
💼 LinkedIn: https://linkedin.com/in/abrar-pasha
📍 Location: Bangalore, India

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Feel free to reach out for opportunities, collaborations, or 
discussions about blockchain, AI, and full-stack development!

Response Time: Usually within 24 hours
Preferred Contact: Email or LinkedIn
    `,
    'clear': () => {
      setHistory([])
      return ''
    },
    'r': function() { return commands['resume'](); },
    'resume': () => {
      if (typeof window !== 'undefined') {
        window.open('https://drive.google.com/file/d/1ajFLKg1dO5fJ1up1GBtXi6q4y80IUWyI/view?usp=sharing', '_blank')
      }
      return `
┌─────────────────────────────────────────────────────────────┐
│                        RESUME                                │
└─────────────────────────────────────────────────────────────┘

Opening resume in a new tab...

Direct Link:
  https://drive.google.com/file/d/1ajFLKg1dO5fJ1up1GBtXi6q4y80IUWyI/view?usp=sharing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
If the tab did not open, click the link above.
      `
    },
    'so': function() { return commands['socials'](); },
    'socials': () => `
┌─────────────────────────────────────────────────────────────┐
│                        SOCIALS                               │
└─────────────────────────────────────────────────────────────┘

🐙 GitHub:   https://github.com/abrar-0020
💼 LinkedIn: https://linkedin.com/in/abrar-pasha
📧 Email:    abrarp952@gmail.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Click any link above to open it directly.
    `,
    'whoami': () => `
abrar
Role: Blockchain Developer + Prompt Engineer
Mode: Building production-ready ideas with AI and Web3
Status: Available for impactful internships and freelance projects
    `,
    'sudo hire me': () => `
[sudo] password for recruiter: ********
Access granted.

Why hire Abrar:
  • Builds fast prototypes that actually ship
  • Strong blend of AI, blockchain, and full-stack implementation
  • Product mindset with clean execution

Quick Actions:
  Resume: https://drive.google.com/file/d/1ajFLKg1dO5fJ1up1GBtXi6q4y80IUWyI/view?usp=sharing
  Email:  abrarp952@gmail.com
  GitHub: https://github.com/abrar-0020
    `,
    'matrix': () => `
┌─────────────────────────────────────────────────────────────┐
│                  MATRIX DIAGNOSTIC MODE                     │
└─────────────────────────────────────────────────────────────┘
${createMatrixNoise()}

Signal lock acquired.
Reality.exe is running in compatible mode.
    `,
    'fortune': () => {
      const pick = fortuneQuotes[Math.floor(Math.random() * fortuneQuotes.length)]
      return `
┌─────────────────────────────────────────────────────────────┐
│                         FORTUNE                             │
└─────────────────────────────────────────────────────────────┘

"${pick}"
      `
    },
    'stats': () => {
      const total = commandCountRef.current
      const valid = validCommandCountRef.current
      const invalid = total - valid
      return `
┌─────────────────────────────────────────────────────────────┐
│                       SESSION STATS                         │
└─────────────────────────────────────────────────────────────┘

Session Time:     ${getSessionDuration()}
Commands Run:     ${total}
Valid Commands:   ${valid}
Unknown Commands: ${invalid}
Top Command:      ${getTopCommand()}
      `
    },
    'unlock abrar': () => `
🔓 Secret unlocked: ABRAR-LABS

Prototype Drop:
  "ChainLens" - AI assistant that reads on-chain wallet behavior,
  labels transaction intent, and summarizes risk signals in plain language.

Stack:
  React, Python, EVM RPC, embeddings, vector search

Say "hireme" next time and this becomes real.
    `,
    'h': function() { return commands['help'](); },
  }

  const handleCommand = () => {
    const cmd = currentCommand.trim().toLowerCase()
    if (!cmd) {
      return
    }

    const commandFn = commands[cmd as keyof typeof commands]

    commandCountRef.current += 1
    if (commandFn) {
      validCommandCountRef.current += 1
      commandUsageRef.current[cmd] = (commandUsageRef.current[cmd] || 0) + 1
    }

    const output = commandFn ? commandFn() : `$ command not found: ${cmd}
Type 'help' to see available commands.`

    if (soundEnabled) {
      playKeySound(commandFn ? 360 : 220, commandFn ? 0.03 : 0.05, commandFn ? 0.015 : 0.02)
    }

    if (cmd !== 'clear') {
      setHistory(prev => [...prev, { command: currentCommand, output }])
    }
    
    setCurrentCommand('')
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      playKeySound(520, 0.03, 0.015)
      handleCommand()
    } else if (e.key === 'ArrowUp') {
      playKeySound(480, 0.02, 0.01)
      e.preventDefault()
      setHistoryIndex(prev => {
        const newIndex = Math.min(prev + 1, history.length - 1)
        if (history.length > 0) {
          setCurrentCommand(history[history.length - 1 - newIndex]?.command || '')
        }
        return newIndex
      })
    } else if (e.key === 'ArrowDown') {
      playKeySound(430, 0.02, 0.01)
      e.preventDefault()
      setHistoryIndex(prev => {
        const newIndex = Math.max(prev - 1, -1)
        setCurrentCommand(newIndex === -1 ? '' : history[history.length - 1 - newIndex]?.command || '')
        return newIndex
      })
    } else if (e.key === 'Backspace') {
      playKeySound(300, 0.015, 0.01)
    } else if (e.key.length === 1) {
      playKeySound(660, 0.012, 0.008)
    }
  }

  useEffect(() => {
    let index = 0
    const typingInterval = window.setInterval(() => {
      index += 2

      setHistory(prev => {
        if (prev.length === 0) return prev
        const next = [...prev]
        next[0] = {
          ...next[0],
          output: welcomeMessage.slice(0, index),
        }
        return next
      })

      if (index >= welcomeMessage.length) {
        window.clearInterval(typingInterval)
        setIsBootTyping(false)
      }
    }, 10)

    return () => window.clearInterval(typingInterval)
  }, [welcomeMessage])

  useEffect(() => {
    const onResize = () => {
      setIsMobileView(window.innerWidth < 640)
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus()
    }
    
    if (terminalRef.current) {
      terminalRef.current.addEventListener('click', handleClick)
    }
    
    return () => {
      if (terminalRef.current) {
        terminalRef.current.removeEventListener('click', handleClick)
      }
    }
  }, [])

  const renderOutput = (output: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g
    
    let parts = output.split(urlRegex)
    parts = parts.flatMap(part => 
      urlRegex.test(part) ? [part] : part.split(emailRegex)
    )
    
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-lime-400 hover:underline transition-colors cursor-pointer">
            {part}
          </a>
        )
      } else if (emailRegex.test(part)) {
        return (
          <a key={index} href={`mailto:${part}`} className="text-cyan-400 hover:text-lime-400 hover:underline transition-colors cursor-pointer">
            {part}
          </a>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  return (
    <div className="relative flex items-center justify-center min-h-[100dvh] bg-black text-cyan-400 p-2 sm:p-4 font-mono overflow-x-hidden" style={{
      backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663439873820/o5AQewRcV8tiTtnkrVKgEe/hero-terminal-background-JZiieCP7HeBTCqs8mkdnop.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'scroll'
    }}>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/70 pointer-events-none" />
      
      <div className="w-full max-w-5xl bg-black/80 rounded-lg overflow-hidden shadow-2xl border border-cyan-400 sm:border-2 relative z-10" style={{
        boxShadow: '0 0 20px rgba(0, 217, 255, 0.3), inset 0 0 20px rgba(0, 217, 255, 0.1)'
      }}>
        {/* Terminal Header */}
        <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 bg-gray-900 text-[10px] sm:text-xs text-gray-400 border-b border-cyan-400/30">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-lime-500 hover:bg-lime-400 transition-colors cursor-pointer" />
          </div>
          <div className="flex-1 text-center font-semibold text-cyan-400 truncate px-1">Terminal v1.0</div>
          <button
            type="button"
            onClick={() => {
              setSoundEnabled(prev => {
                const next = !prev
                if (next) {
                  playKeySound(740, 0.03, 0.015)
                }
                return next
              })
            }}
            className={`rounded border px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold transition-colors ${soundEnabled ? 'border-lime-400 text-lime-400 hover:bg-lime-400/10' : 'border-gray-500 text-gray-400 hover:bg-gray-700/40'}`}
          >
            {soundEnabled ? 'SFX ON' : 'SFX OFF'}
          </button>
          <div className="text-[10px] sm:text-xs whitespace-nowrap">
            <span className="text-lime-400 animate-pulse">●</span> ONLINE
          </div>
        </div>

        {/* Terminal Output */}
        <div 
          ref={terminalRef} 
          className="h-[68dvh] sm:h-[70vh] overflow-y-auto p-3 sm:p-6 space-y-3 bg-black/50 cursor-text"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#00D9FF #0A0E27'
          }}
        >
          {history.map((entry, i) => (
            <div key={i} className="space-y-2 animate-fadeIn">
              <div className="flex gap-2 min-w-0">
                <span className="text-lime-400 font-semibold hidden sm:inline whitespace-nowrap">abrar@portfolio:~$</span>
                <span className="text-lime-400 font-semibold sm:hidden whitespace-nowrap">$</span>
                <span className="text-white break-all">{entry.command}</span>
              </div>
              <div className={`${i === 0 ? 'whitespace-pre overflow-x-auto' : 'whitespace-pre-wrap break-words'} text-gray-300 pl-3 sm:pl-6 leading-relaxed text-xs sm:text-sm`}>
                {renderOutput(entry.output)}
                {i === 0 && isBootTyping && <span className="terminal-cursor text-cyan-400 ml-1">█</span>}
              </div>
            </div>
          ))}

          {/* Current Command Input */}
          <div className="flex gap-2 items-center min-w-0">
            <span className="text-lime-400 font-semibold hidden sm:inline whitespace-nowrap">abrar@portfolio:~$</span>
            <span className="text-lime-400 font-semibold sm:hidden whitespace-nowrap">$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={e => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isBootTyping}
              className="flex-1 min-w-0 bg-transparent outline-none text-white caret-cyan-400 text-sm sm:text-base"
              placeholder={isBootTyping ? 'Boot sequence running...' : 'Type a command...'}
              autoFocus
              spellCheck="false"
            />
          </div>

          {/* Auto-scroll anchor */}
          <div ref={bottomRef} />
        </div>
        
        {/* Terminal Footer */}
        <div className="bg-gray-900 px-3 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs text-gray-500 border-t border-cyan-400/30">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-3">
            <span className="text-cyan-400/70">Type 'help' for commands • Use ↑/↓ arrows for history</span>
            <span className="text-lime-400/70 hidden sm:inline">Press Ctrl+C to interrupt • 'clear' to reset</span>
          </div>
        </div>
      </div>
      <style>{`
        .terminal-cursor {
          animation: terminal-blink 1s steps(1, end) infinite;
        }

        @keyframes terminal-blink {
          0%, 50% {
            opacity: 1;
          }
          50.01%, 100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
