import Recommends from "@/components/server/recommends";
import Search from "@/components/ui/search";
import { MarqueeDemo } from "@/components/magicui/users";
import WordRotate from "@/components/magicui/word-rotate";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import Particles from "@/components/magicui/particles";
import SparklesText from "@/components/magicui/sparkles-text";
import Link from "next/link";
import ShineBorder from "@/components/ui/shine-border";
import Marquee from "@/components/magicui/marquee";
import Image from 'next/image';
import { Button } from "@/components/ui/button";

export default async function HomeClient() {
  const words = ["Performance", "Cute", "Lovely", "Modern"];

  return (
    <div>
      <div>
        <Search />
      </div>

      <div className="h-[40dvh] flex flex-col my-6">
        <Carousel className="text-lg md:text-xl h-full lg:text-2xl font-bold inter-var text-left w-full" loop withIndicators>
          <CarouselSlide className="border bg-background h-[40dvh] p-8 pl-10">
            <div className="flex flex-col justify-center h-full hover:scale-105 transition-transform duration-200">
              <SparklesText className="text-4xl mb-4 w-2/3" text="Sell you PC parts in 5 min!" />
              <div className="w-2/3">
                <Link href="/trade"><Button className="w-full">Trade Now</Button></Link>
              </div>
            </div>
          </CarouselSlide>

          <CarouselSlide className="border bg-background h-[40dvh] p-8" slideGap="lg" controlsOffset="xs">
            <div className="hover:scale-105 transition-transform duration-200">
              Customize a <WordRotate
                className="text-[1.2em] md:text-3xl lg:text-6xl inline-block"
                words={words}
              />
              PCs with DepxTech
            </div>
            <Particles
              className="absolute inset-0"
              quantity={100}
              ease={80}
              color={"#777"}
              refresh
            />
          </CarouselSlide>
        </Carousel>
      </div>

      <div>
        <ShineBorder
          className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border background-card md:shadow-xl text-color"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          <h3 className="w-full hover:scale-105 transition-transform duration-200">
            Build Your PCs On:
          </h3>
          <Marquee className="[--duration:20s] w-full">
            <figure className="text-color mx-2"><Image 
              src="/img/intel.png"
              alt="Intel"
              width={32}
              height={32}
            /></figure>
            <figure className="text-color mx-2"><img alt="windows 11" className="h-8" src="./img/windows 11.png"/></figure>
            <figure className="text-color mx-2"><img alt="nvida" className="h-8" src="./img/nvidia.png"/></figure>
            <figure className="text-color mx-2"><img alt="gigabyte" className="h-8" src="./img/gigabyte.png"/></figure>
            <figure className="text-color mx-2"><img alt="nzxt" className="h-8" src="./img/nzxt.svg"/></figure>
          </Marquee>
        </ShineBorder>
      </div>

      <div>
        <Recommends />
      </div>

      <div>
        <MarqueeDemo/>
      </div>
    </div>
  );
}

