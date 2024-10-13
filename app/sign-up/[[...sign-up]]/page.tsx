import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-5">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
