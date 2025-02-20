import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "../ui/aspect-ratio";

const Preview = ({
  content,
  aspectRatio,
  invert,
  zoom,
}: {
  content: string;
  aspectRatio: number;
  invert: boolean;
  zoom: number;
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
        `overflow-hidden flex items-center justify-center rounded-2xl ${
          invert ? "bg-white text-black" : "bg-black text-white"
        }`
      )}
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
    </AspectRatio>
  );
};

export default Preview;
