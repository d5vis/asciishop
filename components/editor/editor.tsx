"use client";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ImageToAscii } from "@/util/ascii";
import { Button } from "../ui/button";

import Preview from "@/components/editor/preview";

enum AspectRatio {
  Wide = 16 / 9,
  Tall = 9 / 16,
  Square = 1,
}

const DEFAULT_VALUES = {
  aspectRatio: AspectRatio.Wide,
  fontScale: 0.3,
  zoom: 1,
  brightness: 0,
  contrast: 0,
  grain: 0,
};

const Editor = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [ascii, setAscii] = useState<string>("");

  const [aspectRatio, setAspectRatio] = useState<number>(
    DEFAULT_VALUES.aspectRatio
  );
  const [fontScale, setFontScale] = useState<number>(DEFAULT_VALUES.fontScale);
  const [zoom, setZoom] = useState<number>(DEFAULT_VALUES.zoom);
  const [brightness, setBrightness] = useState<number>(
    DEFAULT_VALUES.brightness
  );
  const [contrast, setContrast] = useState<number>(DEFAULT_VALUES.contrast);
  const [grain, setGrain] = useState<number>(DEFAULT_VALUES.grain);
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
      grain: grain.toString(),
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
      const ascii = ImageToAscii(img, fontScale, brightness, contrast);
      setAscii(ascii);
    };
  }, [image, fontScale, zoom, brightness, contrast, grain]);

  return (
    <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] gap-4 w-full h-full">
      <div className="flex flex-col gap-4 items-center h-full rounded-3xl p-4 transition-all">
        <Preview
          content={ascii}
          aspectRatio={aspectRatio}
          invert={invert}
          zoom={zoom}
          grain={grain}
        />
        <div className="z-20 flex flex-col sm:flex-row gap-2">
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
      <div className="flex flex-col gap-4 min-w-72 h-full rounded-3xl p-4 transition-all">
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
            disabled={!image}
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
            >
              Tall
            </ToggleGroupItem>
            <ToggleGroupItem
              value={AspectRatio.Square.toString()}
              className="w-full rounded-2xl"
            >
              Square
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="fontScale">Font Scale: {fontScale}</Label>
          <Slider
            id="fontScale"
            defaultValue={[DEFAULT_VALUES.fontScale]}
            min={0.1}
            max={2}
            step={0.1}
            onValueChange={(value: number[]) => setFontScale(value[0])}
            disabled={!image}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="zoom">Zoom: {zoom}</Label>
          <Slider
            id="zoom"
            defaultValue={[DEFAULT_VALUES.zoom]}
            min={0.1}
            max={2}
            step={0.1}
            onValueChange={(value: number[]) => setZoom(value[0])}
            disabled={!image}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="brightness">Brightness: {brightness}</Label>
          <Slider
            id="brightness"
            defaultValue={[DEFAULT_VALUES.brightness]}
            min={-100}
            max={100}
            step={1}
            onValueChange={(value: number[]) => setBrightness(value[0])}
            disabled={!image}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="contrast">Contrast: {contrast}</Label>
          <Slider
            id="contrast"
            defaultValue={[DEFAULT_VALUES.contrast]}
            min={-100}
            max={100}
            step={1}
            onValueChange={(value: number[]) => setContrast(value[0])}
            disabled={!image}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="grain">Grain: {grain}</Label>
          <Slider
            id="grain"
            defaultValue={[DEFAULT_VALUES.grain]}
            max={100}
            step={1}
            onValueChange={(value: number[]) => setGrain(value[0])}
            disabled={!image}
          />
        </div>
        <div className="flex flex-row gap-2">
          <Checkbox
            id="invert"
            onCheckedChange={(checked: boolean) => setInvert(checked)}
            disabled={!image}
          />
          <Label htmlFor="invert">Invert</Label>
        </div>
      </div>
    </div>
  );
};

export default Editor;
