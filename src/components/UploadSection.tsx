import { useState, useCallback } from "react";
import { Upload, User, X, ImagePlus } from "lucide-react";

interface UploadSectionProps {
  onImageUpload: (file: File | null) => void;
  uploadedImage: string | null;
}

export function UploadSection({ onImageUpload, uploadedImage }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      onImageUpload(files[0]);
    }
  }, [onImageUpload]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onImageUpload(files[0]);
    }
  };

  const clearImage = () => {
    onImageUpload(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
          <User className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">上传照片</h3>
          <p className="text-sm text-muted-foreground">支持 JPG、PNG 格式</p>
        </div>
      </div>

      {uploadedImage ? (
        <div className="relative group">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden glass">
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={clearImage}
            className="absolute top-3 right-3 p-2 rounded-xl bg-background/80 backdrop-blur-sm text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
            <label className="cursor-pointer px-4 py-2 rounded-xl glass text-sm font-medium text-foreground hover:bg-card/80 transition-colors">
              <ImagePlus className="w-4 h-4 inline mr-2" />
              更换照片
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
          </div>
        </div>
      ) : (
        <label
          className={`
            relative flex flex-col items-center justify-center
            aspect-[3/4] rounded-2xl border-2 border-dashed
            cursor-pointer transition-all duration-300
            ${isDragging
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50 hover:bg-card/50"
            }
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-4 p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-primary/20 flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-medium mb-1">
                拖放图片到这里
              </p>
              <p className="text-sm text-muted-foreground">
                或点击选择文件
              </p>
            </div>
          </div>
        </label>
      )}
    </div>
  );
}
