import Editor from "@/components/editor/editor";
import Title from "@/components/title";

export default function Home() {
  return (
    <div className="crt motion-blur-in-sm motion-delay-150 grid grid-rows-[1fr_auto] items-center justify-center min-h-screen p-4 gap-2 font-[family-name:var(--font-vt323)]">
      <div>
        <header className="px-4 lg:px-12">
          <Title />
        </header>
        <main className="flex flex-col gap-4 items-center justify-center w-[85vw] max-w-[1440px] h-full lg:px-8">
          <Editor />
        </main>
      </div>
      <footer className="flex gap-1 flex-wrap items-center justify-center pt-4">
        Made with <span className="text-red-500">&lt;3</span> by{" "}
        <a
          href="https://github.com/d5vis"
          target="_blank"
          className="text-[#adceed]"
        >
          @d5vis
        </a>{" "}
        {"// "}
        <a href="https://buymeacoffee.com/d5vis" target="_blank">
          Buy me a ☕️
        </a>
      </footer>
    </div>
  );
}
