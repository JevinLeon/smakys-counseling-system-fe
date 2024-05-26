import LoginForm from "@/components/LoginForm";
import { Toaster } from "@/components/ui/sonner";

const LoginPage = () => {
  return (
    <div>
      <div className="container relative h-svh flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            SMA Katolik Yos Sudarso
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your username below to sign in to your account
              </p>
            </div>
            <LoginForm />
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
