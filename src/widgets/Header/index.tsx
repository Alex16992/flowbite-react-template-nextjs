import { client } from "@/shared/lib/eden";
import { Button } from "flowbite-react";
import React, { FC } from "react";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  className?: string;
}

const Header: FC<HeaderProps> = async ({ className }) => {
  const { data } = await client.api.hi.get();
  return (
    <div className={className + " flex items-center gap-4"}>
      <h1 className="text-2xl">{data}</h1>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <Button className="border-none bg-gradient-to-br from-purple-600 to-blue-500 px-1 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
          Войти
        </Button>
      </div>
    </div>
  );
};

export default Header;
