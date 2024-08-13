import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="userAuthPage">
      <div>
        <p class="ml-10 text-2xl font-light">Sign Up to <span class="font-black">DeepHuo</span><small class="text-base font-thin">.com</small></p>
        <SignUp />
      </div>
    </div>
  );
}