import { useEffect, useRef, useState } from "react";

const Preview = ({ content, scale }: { content: string; scale: number }) => {
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

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [content]);

  return (
    <div className="aspect-video overflow-hidden flex w-full items-center justify-center bg-black rounded-2xl">
      <pre
        className="text-white"
        style={{
          fontSize: `${fontSize * 4}px`,
          lineHeight: `${fontSize * 4}px`,
        }}
      >
        {content}
      </pre>
    </div>
  );
};

export default Preview;
