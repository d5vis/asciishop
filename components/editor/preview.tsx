import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";

const Preview = ({
  content,
  aspectRatio,
  zoom,
}: {
  content: string;
  aspectRatio: number;
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
      className="overflow-hidden flex items-center justify-center bg-black rounded-2xl"
    >
      <pre
        className="text-white"
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
