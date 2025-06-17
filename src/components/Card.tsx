// src/components/Card.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

type Props = {
  title: string;
  description: string;
  number: number;
  img: string;
};

export default function CardDisplay({ title, description, img }: Props) {
  return (
    <Card className="group relative w-full overflow-hidden border shadow-sm transition-all duration-200 h-80 p-2">
      <Image
        src={`/${img}`} // Ensure this path is correct relative to /public
        alt={title}
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-80 z-10" />

      <div className="flex flex-col relative z-20 p-2 flex-1">
        <CardHeader className="p-0">
          <CardTitle className="text-white text-lg font-semibold text-center bg-black/50 p-2 rounded-md">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center p-0 flex-1 justify-center">
          <p className="text-md text-gray-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-center">
            {description}
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
