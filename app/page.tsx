import Editor from "@/components/editor/editor";
import Title from "@/components/title";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-center min-h-screen p-4 gap-2 font-[family-name:var(--font-dm-sans)]">
      <header className="px-8">
        <Title />
      </header>
      <main className="flex flex-col gap-4 items-center justify-center w-screen h-full px-8">
        <Editor />
      </main>
      <footer className="flex gap-1 flex-wrap items-center justify-center pt-4">
        made with <span className="text-red-500">&lt;3</span> by{" "}
        <a
          href="https://github.com/d5vis"
          target="_blank"
          className="text-[#adceed]"
        >
          @d5vis
        </a>
      </footer>
    </div>
  );
}
