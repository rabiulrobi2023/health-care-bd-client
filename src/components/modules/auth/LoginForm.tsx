/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import z from "zod";
import Password from "@/components/ui/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type TLoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const form = useForm<TLoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "111111",
    },
  });



  // const [loading, setLoading] = useState(false);

  // const router = useRouter();

  // const onSubmit = async (values: TLoginFormData) => {
  //   setLoading(true);
  //   try {
  //     const res = await loginUser(values);
  //     if (res.success) {
  //       const checkAuth = await auth();
  //       if (checkAuth.user) {
  //         const { role } = checkAuth.user;
  //         switch (role) {
  //           case "ADMIN":
  //             router.push("/dashboard/admin");
  //             break;
  //           case "DOCTOR":
  //             router.push("dashboard/doctor");
  //             break;
  //           case "PATIENT":
  //             router.push("dashboar/patient");
  //             break;
  //           default:
  //             router.push("/");
  //             break;
  //         }
  //       }
  //       toast.success("User login successfully");
  //     }
  //   } catch (err) {
  //     toast.error("Failed to login");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleSocialLogin = (provider: "google" | "github") => {};

  return (
    <Form {...form} >
      <form className="space-y-6 w-full max-w-md">
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800">Password</FormLabel>
              <FormControl>
                <Password {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-2">
          Login
        </Button>
      </form>
    </Form>
  );
}
