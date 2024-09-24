import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Understandable-Jawa#7922",
    date: "9/18/2024",
    title: "DDR4 3200Mhz SeiWhale 16GB (2 x 8GB) CL18-22-22-42.",
    body: "Fast shipping",
    img: "https://res.cloudinary.com/jawa/image/upload/f_auto,ar_1:1,c_fill,w_64,q_auto/production/listings/htqtiutsxxctfuat3lov",
  },
  {
    name: "Beloved-Jawa#6142",
    date: "9/11/2024",
    title: "For SALE: R5-5600|RX 6600|1TB M.2|16GB RAM-DeepHuo Brand NEW Pre-Built PC",
    body: "Pc works great!! Would recommended this seller!! Had no problems at all",
    img: "https://res.cloudinary.com/jawa/image/upload/f_auto,ar_1:1,c_fill,w_64,q_auto/production/listings/oqkfmemzxlh1obtilbz6",
  },
  {
    name: "overlord",
    date: "9/10/2024",
    title: "Intel Core i9-12900K Gaming Desktop Processor with Integrated Graphics and 16 (8P+8E) Cores",
    body: "complete and good responses",
    img: "https://res.cloudinary.com/jawa/image/upload/f_auto,ar_1:1,c_fill,w_64,q_auto/production/listings/ourh5uc64np2oowfjqou",
  },
  {
    name: "Advantageous-Jawa#4664",
    date: "7/10/2024",
    title: "For SALE: RX 7600|R5-5500|1TB M.2|16GB RAM-DeepHuo Brand NEW Pre-Built PC",
    body: "Seller is very attentive and has made a fantastic product! I got my PC on time and in perfect working condition! I absolutely endorse this seller for prebuilt PC needs.",
    img: "https://res.cloudinary.com/jawa/image/upload/f_auto,ar_1:1,c_fill,w_64,q_auto/production/listings/k35nwosqheluqff3u3dj",
  },
  {
    name: "Glad-Jawa#1695",
    date: "6/29/2024",
    title: "For SALE: RTX 4060 | i5-12600KF | 16GB RAM | 1TB SSD - DeepHuo Brand NEW Pre-Built PC",
    body: "Great seller that'll gladly work with you and help where need be. Quick shipping and is in mint condition, no problems at all. Definitely deserving of 5 stars!",
    img: "https://res.cloudinary.com/jawa/image/upload/f_auto,ar_1:1,c_fill,w_64,q_auto/production/listings/vufabpi7fmwpw4fnlkmr",
  },
  {
    name: "Aqua Electronics",
    date: "5/31/2024",
    title: "GeForce GTX 970 GAMING LE 100ME",
    body: "Completely nice seller, incredibly fast shipping, and it arrived basically brand new. I will 100% buy from them again when I can!",
    img: "https://res.cloudinary.com/jawa/image/upload/f_auto,ar_1:1,c_fill,w_64,q_auto/production/listings/vhkxa0srbxvprtftb9sn",
  },
];

const firstRow = reviews;
const secondRow = reviews;

const ReviewCard = ({
  img,
  name,
  date,
  body,
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{date}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[356px] m-2 w-[100%-1rem] flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.date} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.date} {...review} />
        ))}
      </Marquee>
    </div>
  );
}
