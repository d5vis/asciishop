import init, { image_to_ascii } from "@/rust/pkg/image_to_ascii";

let wasmInitialized = false;
const initializeWasm = async () => {
  if (wasmInitialized) {
    return;
  }

  await init();
  wasmInitialized = true;
};

export const ImageToAscii = async (
  image: HTMLImageElement,
  fontScale: number,
  brightness: number,
  contrast: number,
  invertText: boolean
): Promise<string> => {
  await initializeWasm();

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Failed to get 2d context");
  }
  const width = Math.floor(image.width * fontScale * 0.5);
  const height = Math.floor(image.height * fontScale * 0.5);
  canvas.width = width;
  canvas.height = height;

  context.drawImage(image, 0, 0, width, height);

  const imageData = context.getImageData(0, 0, width, height);

  return image_to_ascii(imageData, width, brightness, contrast, invertText);
};
