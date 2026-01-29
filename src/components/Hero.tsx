import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">AI 驱动的智能换装</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-foreground">让 AI 为你</span>
          <br />
          <span className="text-gradient">试穿万千服饰</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          上传照片，选择心仪服装，AI 将为你呈现逼真的试穿效果。
          <br className="hidden md:block" />
          足不出户，尽享时尚体验。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#try-now"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            立即体验
          </a>
          <a
            href="#gallery"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl glass text-foreground font-semibold hover:bg-card/80 transition-all duration-300"
          >
            浏览服装库
          </a>
        </div>
      </div>
    </section>
  );
}
