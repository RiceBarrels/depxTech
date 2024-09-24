import Link from "next/link";
import { TransitionLink } from "@/components/client/pageTransition";
import { auth, currentUser } from "@clerk/nextjs/server";
import Recommends from "@/components/server/recommends";
import Search from "@/components/ui/search";
import { MarqueeDemo } from "@/components/magicui/users";
import WordRotate from "@/components/magicui/word-rotate";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import Particles from "@/components/magicui/particles";
import SparklesText from "@/components/magicui/sparkles-text";
import { RainbowButton } from "@/components/magicui/rainbow-button";


export default async function Page() {
  const { userId } = auth();
  const user = await currentUser();
  const words = ["Performance", "Cute", "Lovely", "Modern"];

  console.log(user);
  let username;
  let great = "Hello, ";
  if (userId) {
    username = <Link href="./accounts"><u>{user.firstName} {user.lastName}</u></Link>;
  } else {
    username = <Link href="./accounts">Guest <small>(Click to Sign In)</small></Link>;
  }
  
  let date = new Date();
  let hours = date.getHours();

  if (hours < 12) {
    great = <>Good Morning, {username}.</>;
  } else if (hours < 18) {
    great = <>Good Afternoon, {username}.</>;
  } else if (hours < 20){
    great = <>Good Evening, {username}.</>;
  } else {
    great = <>It&apos;s time to go to sleep {username}!</>;
  }
  return (
    <>
      <Search />
      <div className="h-[40dvh] flex flex-col my-6">
        <Carousel className="text-lg md:text-xl h-full lg:text-2xl font-bold inter-var text-left w-full px-12" loop withIndicators>
          <CarouselSlide className="border bg-background rounded-lg h-[40dvh] p-8" slideGap="lg" controlsOffset="xs">
            <div className="">
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
          <CarouselSlide className="border bg-background rounded-lg h-[40dvh] p-8 flex items-center justify-center">
            <div>
              <SparklesText className="text-4xl mb-4" text="Sell you PC parts in 5 min!" />
              <RainbowButton url="tradeIn">Sell Now</RainbowButton>
            </div>
          </CarouselSlide>
        </Carousel>
      </div>

      <MarqueeDemo/>

      <Recommends />
    </>
  );
}

