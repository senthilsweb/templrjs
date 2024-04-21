// Import necessary Nuxt/Vue functions
import { ref, computed } from 'vue';

// Export a function to initialize configuration
export function useCloudinaryConfig(pageTitle,cloudinaryUrl,cloudinaryPublicId) {
  return ref({
    baseUrl: cloudinaryUrl, // Use environment variable
    transformations: [
      {
        width: 700,
        crop: "fit",
        textOverlay: {
          font: "Arial",
          size: 60,
          weight: "bold",
          color: "ffffff",
          content: pageTitle.replace(/,/g, " "),
          gravity: "north_west",
          xOffset: 300,
          yOffset: 25,
        },
      },
    ],
    publicId: cloudinaryPublicId,
  });
}

// Utility function to generate Cloudinary URL transformation string
export function generateTransformationString(transformation) {
  const parts = [
    `w_${transformation.width || 800}`,
    `c_${transformation.crop || "fit"}`,
  ];

  if (transformation.textOverlay) {
    const { textOverlay } = transformation;
    const color = `rgb:${textOverlay.color || "000000"}`;
    parts.push(
      `l_text:${textOverlay.font}_${textOverlay.size}_${textOverlay.weight}:` +
      `${encodeURIComponent(textOverlay.content)}`,
      `g_${textOverlay.gravity}`,
      `x_${textOverlay.xOffset}`,
      `y_${textOverlay.yOffset}`
    );
  }

  return parts.join(",");
}

// Function to compute the final Cloudinary URL
export function computeCloudinaryURL(config) {
//console.log("Inside computeCloudinaryURL")
//console.log(config)
  const transformationStrings = config.transformations
    .map(generateTransformationString)
    .join("/");
  return `${config.baseUrl}/image/upload/${transformationStrings}/${config.publicId}`;
}
