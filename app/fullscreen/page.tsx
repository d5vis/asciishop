"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Preview from "@/components/editor/preview";

const Fullscreen = () => {
  const searchParams = useSearchParams();
  const aspectRatio = searchParams.get("aspectRatio");
  const invert = searchParams.get("invert");
  const zoom = searchParams.get("zoom");
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
      fullscreen
    />
  );
};

export default Fullscreen;
