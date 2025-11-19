import { client } from "@/shared/lib/eden";
import Feed from "@/widgets/Feed";
import Header from "@/widgets/Header";
import { Button } from "flowbite-react";
import React, { FC } from "react";

interface HomeProps {
  className?: string;
}

const Home: FC<HomeProps> = ({ className }) => {
  return (
    <div className={className}>
      <Header />
      <div className="mt-4" />
      <Feed />
    </div>
  );
};

export default Home;
