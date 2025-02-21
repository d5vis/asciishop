"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Preview from "@/components/editor/preview";

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

  if (!content) {
    return null;
  }

  return (
    <Preview
      content={content}
      aspectRatio={parseFloat(aspectRatio as string)}
      invert={invert === "true"}
      zoom={parseFloat(zoom as string)}
      grain={parseFloat(grain as string)}
      fullscreen
    />
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
