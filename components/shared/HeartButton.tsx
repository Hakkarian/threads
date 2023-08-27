"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { fetchLike } from "@/lib/actions/thread.actions";
import { usePathname } from "next/navigation";

interface Props {
    threadId: string;
    userId: string;
}

function HeartButton({threadId, userId}: Props) {
    const pathname = usePathname();

    const toggleLike = async () => {
        await fetchLike(threadId, userId, pathname);
    }
  return (
    <div className="flex flex-col items-center h-11">
      <Button className="bg-transparent p-0 h--1 hover:border-green-2" onClick={toggleLike}>
        <Image
          src="/assets/heart-gray.svg"
          alt="heart"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
      </Button>
      <div className="thread-card_bar" />
    </div>
  );
}

export default HeartButton