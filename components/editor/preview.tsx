import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "../ui/aspect-ratio";

const Preview = ({
  content,
  aspectRatio,
  invert,
  zoom,
  grain,
  fullscreen,
}: {
  content: string;
  aspectRatio: number;
  invert: boolean;
  zoom: number;
  grain: number;
  fullscreen?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number>(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => {
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const lines = content.split("\n");
      const maxLineLength = Math.max(...lines.map((line) => line.length));

      const newFontSize = Math.min(
        containerWidth / maxLineLength,
        containerHeight / lines.length
      );

      setFontSize(newFontSize);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    handleResize();

    return () => {
      resizeObserver.disconnect();
    };
  }, [content]);

  return (
    <AspectRatio
      ratio={aspectRatio}
      ref={containerRef}
      className={cn(
        `relative overflow-hidden flex items-center justify-center transition-all duration-100 ${
          invert ? "bg-white text-black" : "bg-black text-white"
        } ${fullscreen ? "" : "rounded-2xl"}`
      )}
      style={
        content && !fullscreen
          ? {
              boxShadow: `0 0px 96px rgba(255, 255, 255, ${
                invert ? "0.75" : "0.1"
              }`,
            }
          : {}
      }
    >
      <pre
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: `${fontSize}px`,
          transform: `scale(${zoom})`,
        }}
      >
        {content}
      </pre>
      <div
        className="z-10 absolute inset-0 flex items-center justify-center bg-grain bg-[512px] rounded-2xl"
        style={{ opacity: `${grain}%` }}
      />
    </AspectRatio>
  );
};

export default Preview;
