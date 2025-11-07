import Image from "next/image";
import logo from "../../../../assets/images/logo.png";

import Link from "next/link";
import RegisterForm from "@/components/modules/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex justify-center ">
      <div className="space-y-6 w-full   p-8  container ">
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
          <h1 className="text-2xl font-bold">Create an Account</h1>
        </div>
        <RegisterForm />
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
