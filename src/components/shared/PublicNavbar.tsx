import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/images/logo.png";

const PublicNavbar = () => {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Doctors", href: "/doctors" },
    { name: "Reports", href: "/reports" },
    { name: "Contact", href: "/contact" },
  ];
  return (
    <header className="sticky mx-auto top-0 z-50 h-16 w-full flex items-center gap-5 px-5  md:flex-row justify-between  md:justify-between bg-background border-b px-0">
      <div className="w-1/3">
        <Link
          href={"/"}
          className="text-primary w-full flex  font-xl md:text-2xl font-bold"
        >
          <div className="flex gap-2 items-center">
            <Image src={logo} width={50} height={50} alt="logo" />
            <p>Health Care BD</p>
          </div>
        </Link>
      </div>
      <nav className="hidden md:block w-1/3">
        <ul className="flex gap-10 justify-center items-center">
          {navItems.map((item, index) => (
            <Link key={index} href={item?.href}>
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>

      <div className="hidden md:block w-1/3">
        <Link href={"/login"} className="flex items-end justify-end">
          <Button>Login</Button>
        </Link>
      </div>

      {/* Mobile Responsive */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <MenuIcon></MenuIcon>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-name">Name</Label>
                <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-username">Username</Label>
                <Input id="sheet-demo-username" defaultValue="@peduarte" />
              </div>
            </div>
            <SheetFooter>
              <Button type="submit">Save changes</Button>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default PublicNavbar;
