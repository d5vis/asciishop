"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import Preview from "@/components/editor/preview";
import { Button } from "@/components/ui/button";

const FullscreenContent = () => {
  const searchParams = useSearchParams();
  const aspectRatio = searchParams.get("aspectRatio");
  const invert = searchParams.get("invert");
  const zoom = searchParams.get("zoom");
  const grain = searchParams.get("grain");
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    const storedContent = localStorage.getItem("ascii");
    setContent(storedContent);
  }, []);

  const handleExport = async () => {
    const element = document.getElementById("preview");
    if (!element) return;

    const canvas = await html2canvas(element, {
      width: element.offsetWidth,
      height: element.offsetHeight,
      scale: 4,
    });
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "asciishop.png";
    link.click();
  };

  if (!content) {
    return null;
  }

  return (
    <div className="relative w-full h-full">
      <Preview
        content={content}
        aspectRatio={parseFloat(aspectRatio as string)}
        invert={invert === "true"}
        zoom={parseFloat(zoom as string)}
        grain={parseFloat(grain as string)}
        fullscreen
      />
      <div className="z-20 sticky bottom-0 p-4 flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => navigator.clipboard.writeText(content)}
        >
          Copy as Text
        </Button>
        <Button variant="outline" onClick={handleExport}>
          Save as PNG
        </Button>
      </div>
    </div>
  );
};

const Fullscreen = () => {
  return (
    <Suspense fallback={null}>
      <FullscreenContent />
    </Suspense>
  );
};

export default Fullscreen;
