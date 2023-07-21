// app/page.tsx

import { ThreeBackground, LandingCard } from "@/components/Landing";

export default function Home() {
  return (
    <div className="relative -mt-20">
      <ThreeBackground />
      <LandingCard />
    </div>
  );
}
