import { Zap, Shield, Palette, Smartphone } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "极速生成",
    description: "先进的 AI 模型，秒级生成逼真换装效果",
  },
  {
    icon: Shield,
    title: "隐私保护",
    description: "照片仅用于生成，不会被存储或分享",
  },
  {
    icon: Palette,
    title: "海量服装",
    description: "涵盖各类风格，从正装到休闲应有尽有",
  },
  {
    icon: Smartphone,
    title: "随时随地",
    description: "支持手机和电脑，随时体验虚拟试衣",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            为什么选择我们
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            我们运用最先进的 AI 技术，为你带来前所未有的虚拟试衣体验
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl glass hover:bg-card/80 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary/20 flex items-center justify-center mb-4 group-hover:bg-gradient-primary group-hover:shadow-glow transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
