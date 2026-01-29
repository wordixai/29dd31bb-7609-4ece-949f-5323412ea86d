import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient">AI 换装</span>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#try-now" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              开始体验
            </a>
            <a href="#gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              服装库
            </a>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              功能特点
            </a>
          </nav>

          {/* CTA */}
          <a
            href="#try-now"
            className="px-5 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
          >
            立即体验
          </a>
        </div>
      </div>
    </header>
  );
}
