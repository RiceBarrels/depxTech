import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="userAuthPage">
        <div>
          <p class="ml-10 text-2xl font-light">Sign In to <span class="font-black">DepxTech</span></p>
          <SignIn class="w-full" />
        </div>
      </div>
    </>
  );
}