"use client"

import { fetchUsers } from "@/lib/actions/user.actions";
import { ChangeEvent, useEffect, useState } from "react";
import UserCard from "../cards/UserCard";
import { useParams, useRouter } from "next/navigation";


interface Props {
    routeType: string
}

const FilteredLabel = ({ routeType }: Props) => {
  const [string, setString] = useState("");
  const router = useRouter();

  router.push(`/${routeType}`);

  useEffect(() => {
    const debounceDelay = setTimeout(() => {
      if (string) {
        router.push(`/${routeType}?q=${string}`);
      } else {
        router.push(`/${routeType}`);
      }
    }, 500);
    return () => {
      clearTimeout(debounceDelay);
    }
  }, [string, routeType])

    return (
    <label className="relative">
      <input
        type="text"
        className="p-4 w-full text-4x1 bg-transparent border-2 rounded-lg 
          border-white border-opacity-50 text-light-2 focus:border-blue-500 focus:text-white transition duration-200"
        onChange={(e) => setString(e.target.value)}
          />
      <span className="text-4xl text-light-3 text-opacity-80 absolute left-4 bottom-0 transition duration-200 input-text">
        Let's find your match!
      </span>
      </label>
  );
}

export default FilteredLabel