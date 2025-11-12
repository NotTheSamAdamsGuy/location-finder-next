import background from "@/../public/hero-bg.webp"; // Adjust path as needed
import HeroSearchForm from "@/components/features/hero/HeroSearchForm";

export default function Home() {
  return (
    <div className="font-sans min-h-[calc(100vh-64px)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <HeroSearchForm background={background} />
      </main>
    </div>
  );
}
