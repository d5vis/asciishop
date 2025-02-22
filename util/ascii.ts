export const ImageToAscii = (
  image: HTMLImageElement,
  fontScale: number,
  brightness: number,
  contrast: number,
  invertText: boolean
): string => {
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
  const data = imageData.data;

  const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
  for (let i = 0; i < data.length; i += 4) {
    // Red
    data[i] = factor * (data[i] - 128) + 128 + brightness;
    // Green
    data[i + 1] = factor * (data[i + 1] - 128) + 128 + brightness;
    // Blue
    data[i + 2] = factor * (data[i + 2] - 128) + 128 + brightness;

    if (invertText) {
      // Red
      data[i] = 255 - data[i];
      // Green
      data[i + 1] = 255 - data[i + 1];
      // Blue
      data[i + 2] = 255 - data[i + 2];
    }
  }
  context.putImageData(imageData, 0, 0);

  const asciiData = context.getImageData(0, 0, width, height).data;
  let ascii = "";
  for (let i = 0; i < asciiData.length; i += 4) {
    const brightness = (asciiData[i] + asciiData[i + 1] + asciiData[i + 2]) / 3;
    const index = Math.floor(
      (brightness / 255) * (ascii_characters.length - 1)
    );
    ascii += ascii_characters[index];
    if ((i / 4) % width === 0) {
      ascii += "\n";
    }
  }
  return ascii;
};

const ascii_characters = [
  " ", // 0 (black)
  ".", // 1
  "'", // 2
  ":", // 3
  "^", // 4
  "-", // 5
  "~", // 6
  "*", // 7 (dark gray)
  "#", // 8
  "@", // 9
  "$", // 10
  "%", // 11
  "&", // 12
  "=", // 13
  "+", // 14
  "x", // 15 (medium gray)
  "X", // 16
  "o", // 17
  "O", // 18
  "0", // 19
  "Q", // 20
  "E", // 21
  "C", // 22
  "H", // 23
  "G", // 24
  "T", // 25 (lighter gray)
  "B", // 26
  "L", // 27
  "F", // 28
  "I", // 29
  "J", // 30
  "1", // 31
  "#", // 32 (mid-gray, repeat for smoother transition)
  "&", // 33 (repeat for smoother transition)
  "%", // 34
  "$", // 35
  "@", // 36
  "*", // 37
  "=", // 38
  "+", // 39
  "x", // 40 (lighter gray)
  "X", // 41
  "o", // 42
  "O", // 43
  "0", // 44
  "Q", // 45
  "E", // 46
  "C", // 47
  "H", // 48
  "G", // 49
  "T", // 50 (white)
  "7", // 51 (repeat for smoother transition)
  "9", // 52 (repeat for smoother transition)
  "B", // 53
  "L", // 54
  "F", // 55
  "I", // 56
  "J", // 57
  "1", // 58
  " ", // 59 (white, repeat for smoother transition)
  " ", // 60
  " ", // 61
  " ", // 62
  " ", // 63
  " ", // 64
  " ", // 65
  " ", // 66
  " ", // 67
  " ", // 68
  " ", // 69
];
