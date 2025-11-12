import LoginForm from "@/components/modules/auth/LoginForm";
import logo from "../../../../assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const redirect = (await searchParams)?.redirect || "";


  return (
    <div className="flex-1 flex justify-center items-center  bg-gray-50">
      <div className="space-y-6 w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center">
          <Link
            href={"/"}
            className="text-primary w-full flex justify-center  font-xl md:text-2xl font-bold"
          >
            <div className="flex gap-2 items-center">
              <Image src={logo} width={50} height={50} alt="logo" />
              <p>Health Care BD</p>
            </div>
          </Link>
          <h1 className="text-2xl font-bold">Login</h1>
        </div>
        <LoginForm redirect={redirect} />

        <div className="flex flex-col gap-3 mt-4"></div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
