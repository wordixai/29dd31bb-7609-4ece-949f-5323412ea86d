import { Check, Shirt } from "lucide-react";

const clothingItems = [
  {
    id: 1,
    name: "优雅西装",
    category: "正装",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=600&fit=crop",
  },
  {
    id: 2,
    name: "休闲卫衣",
    category: "休闲",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=600&fit=crop",
  },
  {
    id: 3,
    name: "连衣裙",
    category: "裙装",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
  },
  {
    id: 4,
    name: "牛仔夹克",
    category: "外套",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=600&fit=crop",
  },
  {
    id: 5,
    name: "运动套装",
    category: "运动",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop",
  },
  {
    id: 6,
    name: "针织衫",
    category: "休闲",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop",
  },
];

interface ClothingGalleryProps {
  selectedClothing: number | null;
  onSelectClothing: (id: number) => void;
}

export function ClothingGallery({ selectedClothing, onSelectClothing }: ClothingGalleryProps) {
  return (
    <div className="space-y-4" id="gallery">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
          <Shirt className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">选择服装</h3>
          <p className="text-sm text-muted-foreground">点击选择想要试穿的服装</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {clothingItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectClothing(item.id)}
            className={`
              group relative aspect-[3/4] rounded-2xl overflow-hidden
              transition-all duration-300 hover:scale-[1.02]
              ${selectedClothing === item.id
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                : ""
              }
            `}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

            {/* Selection indicator */}
            {selectedClothing === item.id && (
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                <Check className="w-5 h-5 text-primary-foreground" />
              </div>
            )}

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-primary/20 text-primary mb-2">
                {item.category}
              </span>
              <p className="text-foreground font-medium">{item.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
