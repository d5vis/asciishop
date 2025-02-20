"use client";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import Preview from "./preview";
import { ImageToAscii } from "@/util/ascii";

const Editor = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [ascii, setAscii] = useState<string>("");

  const [invert, setInvert] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(0.5);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.onload = () => {
        setImage(image);
      };
      image.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!image) return;

    const img = new Image();
    img.src = image.src;

    img.onload = () => {
      const ascii = ImageToAscii(img, invert, scale, brightness, contrast);
      setAscii(ascii);
    };
  }, [image, invert, scale, brightness, contrast]);

  return (
    <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] gap-4 w-full h-full">
      <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-3xl p-4">
        <Preview content={ascii} scale={scale} />
      </div>
      <div className="flex flex-col gap-4 min-w-64 h-full bg-gray-100 rounded-3xl p-8">
        <h2>
          <b>upload</b>
        </h2>
        <div className="flex flex-col gap-2">
          <Input
            type="file"
            className="w-full sm:max-w-64"
            onChange={handleFileChange}
          />
        </div>
        <h2>
          <b>adjustments</b>
        </h2>
        <div className="flex flex-col gap-2">
          <Label htmlFor="scale">scale: {scale}</Label>
          <Slider
            id="scale"
            defaultValue={[1]}
            min={0.1}
            max={2}
            step={0.1}
            onValueChange={(value: number[]) => setScale(value[0])}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="brightness">brightness: {brightness}</Label>
          <Slider
            id="brightness"
            defaultValue={[100]}
            max={200}
            step={1}
            onValueChange={(value: number[]) => setBrightness(value[0])}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="contrast">contrast: {contrast}</Label>
          <Slider
            id="contrast"
            defaultValue={[100]}
            max={200}
            step={1}
            onValueChange={(value: number[]) => setContrast(value[0])}
          />
        </div>
        <div className="flex flex-row gap-2">
          <Checkbox
            id="invert"
            onCheckedChange={(checked: boolean) => setInvert(checked)}
          />
          <Label htmlFor="invert">invert colors</Label>
        </div>
      </div>
    </div>
  );
};

export default Editor;
