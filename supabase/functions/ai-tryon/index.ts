import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

interface TryOnRequest {
  personImage: string; // base64 or URL
  clothingImage: string; // base64 or URL
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { personImage, clothingImage }: TryOnRequest = await req.json();

    // Validate input
    if (!personImage || !clothingImage) {
      return new Response(
        JSON.stringify({ error: "请提供人物照片和服装图片" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Processing AI virtual try-on...");

    // Call AI Gateway API with image generation model
    const response = await fetch(
      "https://ai.gateway.needware.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemini-3-pro-image-preview",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `You are an AI virtual try-on assistant. Your task is to generate a realistic image of the person wearing the clothing item shown.

Instructions:
1. Analyze the person's body shape, pose, and proportions from the first image
2. Analyze the clothing item from the second image (style, color, pattern, fit)
3. Generate a new image showing the same person wearing this clothing item naturally
4. Maintain the person's original pose, face, hair, and background
5. Make the clothing fit naturally on the person's body
6. Ensure realistic lighting and shadows

Generate a high-quality, photorealistic image of the virtual try-on result.`,
                },
                {
                  type: "image_url",
                  image_url: {
                    url: personImage,
                  },
                },
                {
                  type: "image_url",
                  image_url: {
                    url: clothingImage,
                  },
                },
              ],
            },
          ],
          temperature: 0.7,
          max_tokens: 4096,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI service error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "请求过于频繁，请稍后再试" }),
          {
            status: 429,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI 服务配额已用尽" }), {
          status: 402,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      throw new Error(`AI processing failed: ${errorText}`);
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;

    if (!result) {
      throw new Error("未能生成换装效果");
    }

    console.log("AI virtual try-on completed");

    // Extract image URL from result (could be base64 or URL)
    let resultImage = result;

    // If result contains markdown image syntax, extract the URL
    const imageMatch = result.match(/!\[.*?\]\((.*?)\)/);
    if (imageMatch) {
      resultImage = imageMatch[1];
    }

    // If result contains data:image prefix or https, use directly
    if (
      !resultImage.startsWith("data:image") &&
      !resultImage.startsWith("https://")
    ) {
      // Try to find base64 image data in result
      const base64Match = result.match(
        /data:image\/[a-zA-Z]+;base64,[A-Za-z0-9+/=]+/
      );
      if (base64Match) {
        resultImage = base64Match[0];
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        resultImage: resultImage,
        model: "gemini-3-pro-image-preview",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Virtual try-on error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "换装处理失败" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
