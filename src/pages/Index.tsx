import { useState } from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { UploadSection } from "../components/UploadSection";
import { ClothingGallery, clothingItems } from "../components/ClothingGallery";
import { ResultPreview } from "../components/ResultPreview";
import { Features } from "../components/Features";
import { Footer } from "../components/Footer";

export default function Index() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedClothing, setSelectedClothing] = useState<number | null>(null);

  const handleImageUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedImage(null);
    }
  };

  // Get selected clothing image URL
  const selectedClothingImage = selectedClothing
    ? clothingItems.find(item => item.id === selectedClothing)?.image || null
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Main Try-on Section */}
      <section id="try-now" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              开始你的 AI 换装之旅
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              只需三步：上传照片 → 选择服装 → 生成效果
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload Column */}
            <div className="glass rounded-3xl p-6 md:p-8">
              <UploadSection
                onImageUpload={handleImageUpload}
                uploadedImage={uploadedImage}
              />
            </div>

            {/* Clothing Selection Column */}
            <div className="glass rounded-3xl p-6 md:p-8">
              <ClothingGallery
                selectedClothing={selectedClothing}
                onSelectClothing={setSelectedClothing}
              />
            </div>

            {/* Result Column */}
            <div>
              <ResultPreview
                uploadedImage={uploadedImage}
                selectedClothing={selectedClothing}
                clothingImage={selectedClothingImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Footer */}
      <Footer />
    </div>
  );
}
