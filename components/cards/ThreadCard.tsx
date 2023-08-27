import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import HeartButton from "../shared/HeartButton";

interface Props {
  key: string;
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: { id: string; name: string; image: string } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  likes: number;
  isComment?: boolean;
  liked?: boolean;
}
//IMPORTANT: Implement the share, repost and heart functionality

const ThreadCard = ({
  key,
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  likes = 0,
  liked
}: Props) => {

  console.log('likes', likes)
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex flex-col items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="profile-image"
                fill
                className="curson-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link
              href={`/profile/${author.id}`}
              className={` ${isComment ? "mb-2" : "mb-3"} w-fit`}
            >
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>
            <p
              className={`${
                isComment ? "mb-2" : "mb-3"
              } text-small-regular text-light-2`}
            >
              {content}
            </p>
            <div className={`${isComment && "mb-5"} flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <HeartButton userId={currentUserId} threadId={id.toString()} />
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Link href="/">
                  <Image
                    src="/assets/repost.svg"
                    alt="repost"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Link href="/">
                  <Image
                    src="/assets/share.svg"
                    alt="share"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
              </div>
              <p className="text-subtle-medium text-gray-1 mr-10">
                {`${comments && `${comments.length} replies -`} ${likes} likes`}
              </p>
              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* TODO Delete thread */}
        {/* TODO Show comment logos */}

        {!isComment && community && (
          <Link
            href={`/communities/${community.id}`}
            className="mt-5 flex items-center"
          >
            <p className="text-subtle-medium text-gray-1 ">
              {formatDateString(createdAt)} - {community.name} Community{" "}
            </p>
            <Image
              src={community.image}
              alt="Community image"
              width={20}
              height={20}
              className="ml-1 rounded-full object-cover"
            />
          </Link>
        )}
      </div>
    </article>
  );
};

export default ThreadCard;
