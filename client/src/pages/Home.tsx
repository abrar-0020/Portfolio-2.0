import PortfolioTerminal from "@/components/PortfolioTerminal";

/**
 * Abrar Pasha's Portfolio - Interactive Terminal Interface
 * 
 * Design Philosophy: Cyberpunk Terminal Aesthetic
 * - Neon cyan (#00D9FF), electric lime (#39FF14), hot pink (#FF006E)
 * - Deep charcoal background (#0A0E27)
 * - Monospace typography (IBM Plex Mono, Space Mono)
 * - Interactive terminal-style interface
 * - Keyboard-driven navigation
 */
export default function Home() {
  return (
    <div className="min-h-screen w-full bg-black">
      <PortfolioTerminal />
    </div>
  );
}
