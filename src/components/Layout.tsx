/**
 * Main layout component with header and content area
 */

import { Search } from "lucide-react";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { searchQueryAtom } from "@/store/atoms";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="font-instrument-italic text-xl text-foreground">
              TaskHunt.ai
            </span>
          </Link>

          {/* Search */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4",
                "text-sm text-foreground placeholder:text-muted-foreground",
                "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              )}
            />
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <a
              href="https://github.com/refreshdotdev/taskhunt.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-6">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-muted-foreground">
          <p>
            TaskHunt.ai - Explore Terminal Bench tasks across all benchmarks
          </p>
        </div>
      </footer>
    </div>
  );
}
