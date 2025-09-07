import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
function Header({ className }: { className?: string }) {
  return (
    <header
      className={
        className + " mt-5 flex justify-between items-center gap-4 mx-5"
      }
    >
      <div className="flex items-center">
        <Image src="/logo.svg" alt="logo" width={30} height={25} />
      </div>
      <nav>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">ホーム</Link>
              </NavigationMenuLink>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/list">シフト一覧表</Link>
              </NavigationMenuLink>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/time">今何時？</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <Link href="/user">
        <Avatar>
          <AvatarImage src="/original.png" />
          <AvatarFallback>ST</AvatarFallback>
        </Avatar>
      </Link>
    </header>
  );
}

export default Header;
