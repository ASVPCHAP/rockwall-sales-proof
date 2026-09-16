import Image from "next/image";

import { cn } from "@/lib/utils";

type CultureFigureProps = {
  image: string;
  alt: string;
  width: number;
  height: number;
  kicker: string;
  title: string;
  body: string;
  className?: string;
};

export function CultureFigure({
  image,
  alt,
  width,
  height,
  kicker,
  title,
  body,
  className,
}: CultureFigureProps) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-sm border border-[var(--rule)] lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.95fr)]",
        className,
      )}
    >
      <Image
        src={image}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full"
        sizes="(min-width: 1024px) 42rem, 100vw"
      />
      <figcaption className="flex flex-col justify-center border-t border-[var(--rule)] p-6 sm:p-8 lg:border-t-0 lg:border-l">
        <p className="text-[0.7rem] tracking-[0.16em] text-[var(--brass)] uppercase">
          {kicker}
        </p>
        <h3 className="font-heading mt-3 text-2xl tracking-tight sm:text-3xl">
          {title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {body}
        </p>
      </figcaption>
    </figure>
  );
}
