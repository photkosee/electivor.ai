import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex min-h-[100svh] items-center justify-center p-5">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
