import { Card, Carousel } from "flowbite-react";
import React, { FC } from "react";

interface FeedProps {
  className?: string;
}

const Index: FC<FeedProps> = ({ className }) => {
  return (
    <div className={className}>
      <Card
        className="max-w-sm"
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc="https://flowbite.com/docs/images/carousel/carousel-1.svg"
      >
        <div className="p-4">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Index;
