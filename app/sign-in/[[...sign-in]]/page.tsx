import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex min-h-[100svh] items-center justify-center p-5">
      <SignIn />
    </div>
  );
};

export default SignInPage;
