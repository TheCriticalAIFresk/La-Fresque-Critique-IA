// src/app/page.tsx
import CardDisplay from "@/components/Card";
import cards from "@/data/cards.json";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-4 md:p-8 ">
      <h1 className="text-3xl font-bold">All Cards</h1>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 w-full max-w-5xl">
        {cards.map((card) => (
          <CardDisplay
            key={card.number}
            title={card.title_en}
            description={card.description_en}
            number={card.number}
            img={card.img}
          />
        ))}
      </div>
    </main>
  );
}
