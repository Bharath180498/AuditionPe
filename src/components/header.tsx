"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    setIsMenuOpen(false);
  };

  const getInitials = (name?: string | null) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  const actorLinks = [
    { href: "/auditions", label: "Browse Auditions" },
    { href: "/actor/profile", label: "My Profile" },
  ];

  const producerLinks = [
    { href: "/producer/dashboard", label: "My Castings" },
  ];

  const links = user?.role === "PRODUCER" ? producerLinks : actorLinks;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold" onClick={() => setIsMenuOpen(false)}>
            AuditionPe
          </Link>

          <nav className="hidden md:flex gap-6 items-center">
            {user &&
              links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium ${
                    pathname === link.href
                      ? "text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
          </nav>

          <div className="flex items-center">
            <div className="hidden md:block">
              {user ? (
                <UserMenu onLogout={handleLogout} user={user} getInitials={getInitials} />
              ) : (
                <AuthButtons />
              )}
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              {user &&
                links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-base font-medium ${
                      pathname === link.href
                        ? "text-black"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
            </nav>
            <div className="pt-4 border-t">
              {user ? (
                <UserMenu onLogout={handleLogout} user={user} getInitials={getInitials} isMobile />
              ) : (
                <AuthButtons />
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

type UserMenuProps = {
  onLogout: () => void;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: "ACTOR" | "PRODUCER";
  };
  getInitials: (name?: string | null) => string;
  isMobile?: boolean;
};

const UserMenu = ({ onLogout, user, getInitials, isMobile }: UserMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      {isMobile ? (
        <div className="flex items-center gap-2">
           <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || "/placeholder-user.jpg"} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
             <p className="text-sm font-medium leading-none">
              {user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
      ) : (
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || "/placeholder-user.jpg"} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      )}
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end" forceMount>
       {!isMobile && (
         <>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
         </>
       )}
      <DropdownMenuItem onClick={onLogout}>
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const AuthButtons = () => (
  <div className="space-x-2">
    <Button variant="outline" asChild>
      <Link href="/login">Log in</Link>
    </Button>
    <Button asChild>
      <Link href="/signup">Sign up</Link>
    </Button>
  </div>
); 