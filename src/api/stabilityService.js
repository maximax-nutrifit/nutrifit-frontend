// api/stabilityService.js
export const generateStabilityImage = async (prompt, type = 'meal') => {
    const STABILITY_API_KEY = "sk-VjQ2aHfdkiq0zrDVZ8cCNLSD9J2oeKbBxrln2kAVW9vVo6Wck"; // Never hardcode in production!
    
    try {
      if (!prompt || prompt.length > 200) {
        throw new Error('Invalid prompt length');
      }

      let fullPrompt = prompt;
      if (type === 'meal') {
        fullPrompt += ', professional food photography, Nigerian cuisine';
      } else if (type === 'exercise') {
        fullPrompt += ', professional fitness photography, clear form demonstration, gym setting';
      }

      const formData = new FormData();
      formData.append('prompt', fullPrompt);
      formData.append('model', 'sd3');
      formData.append('output_format', 'webp');
      formData.append('aspect_ratio', '1:1');
      formData.append('negative_prompt', 'blurry, text, watermark');

      const response = await fetch(
        'https://api.stability.ai/v2beta/stable-image/generate/core',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${STABILITY_API_KEY}`,
            'Accept': 'image/*'
          },
          body: formData
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      return await response.arrayBuffer();
    } catch (error) {
      console.error('Image generation failed:', error);
      throw error;
    }
};