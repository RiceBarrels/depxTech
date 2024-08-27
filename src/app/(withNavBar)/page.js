import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { FlipWords } from "@/components/ui/flip-words";
import Recommends from "@/components/server/recommends";
import Search from "@/components/ui/search";

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
      <div className="h-2/5 flex flex-col pt-[50px]">
        <div className="flex flex-1 w-full p-6 border-white rounded-xl justify-center">
          <div className="text-[1.2em] md:text-3xl lg:text-6xl font-bold inter-var text-left w-full">
            Customize a
            <FlipWords className="text-color" words={words} /> <br />
            PCs with DepxTech
          </div>
        </div>
      </div>

      <Recommends />
    </>
  );
}

