import { useState } from "react";
import { Wand2, Download, RefreshCw, Sparkles } from "lucide-react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

interface ResultPreviewProps {
  uploadedImage: string | null;
  selectedClothing: number | null;
  clothingImage: string | null;
}

export function ResultPreview({ uploadedImage, selectedClothing, clothingImage }: ResultPreviewProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const canGenerate = uploadedImage && selectedClothing && clothingImage;

  const handleGenerate = async () => {
    if (!canGenerate) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-tryon', {
        body: {
          personImage: uploadedImage,
          clothingImage: clothingImage,
        }
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.resultImage) {
        setGeneratedImage(data.resultImage);
        toast.success("换装效果生成成功！");
      } else {
        throw new Error("未能获取生成结果");
      }
    } catch (error) {
      console.error("AI try-on error:", error);
      toast.error(error instanceof Error ? error.message : "换装生成失败，请重试");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `ai-tryon-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("图片已下载");
  };

  return (
    <div className="glass rounded-3xl p-6 md:p-8 sticky top-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
          <Wand2 className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">AI 换装效果</h3>
          <p className="text-sm text-muted-foreground">生成你的专属试穿效果</p>
        </div>
      </div>

      {/* Preview Area */}
      <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted/50 mb-6">
        {generatedImage ? (
          <div className="relative w-full h-full">
            <img
              src={generatedImage}
              alt="Generated Result"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg glass text-xs font-medium text-foreground">
              <Sparkles className="w-3 h-3 inline mr-1.5" />
              AI 生成
            </div>
          </div>
        ) : isGenerating ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
              <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
            </div>
            <div className="text-center">
              <p className="text-foreground font-medium">AI 正在创作中...</p>
              <p className="text-sm text-muted-foreground">通常需要 10-30 秒</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-6 text-center">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
              <Wand2 className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <p className="text-foreground font-medium mb-1">等待生成</p>
              <p className="text-sm text-muted-foreground">
                {!uploadedImage && !selectedClothing
                  ? "请先上传照片并选择服装"
                  : !uploadedImage
                    ? "请上传你的照片"
                    : "请选择想要试穿的服装"
                }
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleGenerate}
          disabled={!canGenerate || isGenerating}
          className={`
            w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2
            transition-all duration-300
            ${canGenerate && !isGenerating
              ? "bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-glow-lg hover:scale-[1.02]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
            }
          `}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              生成中...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              生成换装效果
            </>
          )}
        </button>

        {generatedImage && (
          <button
            onClick={handleDownload}
            className="w-full py-4 rounded-xl font-semibold glass text-foreground flex items-center justify-center gap-2 hover:bg-card/80 transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            下载图片
          </button>
        )}
      </div>
    </div>
  );
}
