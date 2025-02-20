"use client";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import Preview from "./preview";
import { ImageToAscii } from "@/util/ascii";
import { Button } from "../ui/button";

enum AspectRatio {
  Wide = 16 / 9,
  Tall = 9 / 16,
  Square = 1,
}

const DEFAULT_VALUES = {
  aspectRatio: AspectRatio.Wide,
  scale: 0.5,
  zoom: 1,
  brightness: 100,
  contrast: 100,
};

const Editor = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [ascii, setAscii] = useState<string>("");

  const [aspectRatio, setAspectRatio] = useState<number>(
    DEFAULT_VALUES.aspectRatio
  );
  const [scale, setScale] = useState<number>(DEFAULT_VALUES.scale);
  const [zoom, setZoom] = useState<number>(DEFAULT_VALUES.zoom);
  const [brightness, setBrightness] = useState<number>(
    DEFAULT_VALUES.brightness
  );
  const [contrast, setContrast] = useState<number>(DEFAULT_VALUES.contrast);
  const [invert, setInvert] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image")) {
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

  const handleExport = () => {
    if (!ascii) return;

    localStorage.setItem("ascii", ascii);
    const params = new URLSearchParams({
      aspectRatio: aspectRatio.toString(),
      invert: invert.toString(),
      zoom: zoom.toString(),
    });

    window.open(`/fullscreen?${params.toString()}`, "_blank");
  };

  const handleAspectRatioChange = (value: string) => {
    if (!value) return;
    setAspectRatio(parseFloat(value));
  };

  useEffect(() => {
    if (!image) return;

    const img = new Image();
    img.src = image.src;

    img.onload = () => {
      const ascii = ImageToAscii(img, scale, brightness, contrast);
      setAscii(ascii);
    };
  }, [image, scale, zoom, brightness, contrast]);

  return (
    <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] gap-4 w-full h-full">
      <div className="flex flex-col gap-4 items-center justify-center h-full  rounded-3xl p-4 transition-all">
        <Preview
          content={ascii}
          aspectRatio={aspectRatio}
          invert={invert}
          zoom={zoom}
        />
        <div className="z-10 flex flex-col sm:flex-row gap-2">
          <Input
            type="file"
            className="w-full rounded-2xl"
            onChange={handleFileChange}
          />
          <Button
            variant="outline"
            className="rounded-2xl"
            onClick={handleExport}
            disabled={!ascii}
          >
            Export
          </Button>
        </div>
      </div>
      <div className="z-10 flex flex-col gap-4 lg:min-w-96 h-full  rounded-3xl p-8">
        <h2>
          <b>Adjustments</b>
        </h2>
        <div className="flex flex-col gap-2">
          <Label htmlFor="aspect-ratio">Aspect Ratio</Label>
          <ToggleGroup
            id="aspect-ratio"
            type="single"
            variant="outline"
            value={aspectRatio.toString()}
            defaultValue={AspectRatio.Wide.toString()}
            onValueChange={handleAspectRatioChange}
            className="text-border"
          >
            <ToggleGroupItem
              value={AspectRatio.Wide.toString()}
              className="w-full rounded-2xl"
            >
              Wide
            </ToggleGroupItem>
            <ToggleGroupItem
              value={AspectRatio.Tall.toString()}
              className="w-full rounded-2xl"
              disabled
            >
              Tall
            </ToggleGroupItem>
            <ToggleGroupItem
              value={AspectRatio.Square.toString()}
              className="w-full rounded-2xl"
              disabled
            >
              Square
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="scale">Scale: {scale}</Label>
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
          <Label htmlFor="zoom">Zoom: {zoom}</Label>
          <Slider
            id="zoom"
            defaultValue={[1]}
            min={0.1}
            max={2}
            step={0.1}
            onValueChange={(value: number[]) => setZoom(value[0])}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="brightness">Brightness: {brightness}</Label>
          <Slider
            id="brightness"
            defaultValue={[100]}
            max={200}
            step={1}
            onValueChange={(value: number[]) => setBrightness(value[0])}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="contrast">Contrast: {contrast}</Label>
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
          <Label htmlFor="invert">Invert</Label>
        </div>
      </div>
    </div>
  );
};

export default Editor;
