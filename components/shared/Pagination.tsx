"use client";
import { SortOrder } from "mongoose";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import UserCard from "../cards/UserCard";
import { fetchUsers } from "@/lib/actions/user.actions";
import CommunityCard from "../cards/CommunityCard";
import { fetchCommunities } from "@/lib/actions/community.actions";

interface Props {
  userId: string;
  searchString: string;
  routeType: string;
}

export const Pagination = ({
  routeType,
  searchString,
  userId
}: Props) => {
  const [users, setUsers] = useState<any[]>([]);
  const [communities, setCommunities] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  
  console.log(loading);

  useEffect(() => {
      (async () => {
        setLoading(true);
        const res = await fetchUsers({
          userId,
          searchString,
          pageNumber,
          pageSize: 1,
        });
        setUsers(prevUsers => [...prevUsers, ...res.users]);
        setLoading(false);
        // setIsNext(res.isNext);
    })();
  }, [pageNumber]);

  async function handlePaginate() {
    setLoading(true);
    setPageNumber(prevPageNumber => prevPageNumber += 1);
    setLoading(false);
  }

  return (
    <>
      <div className="mt-14 flex flex-col gap-9">
        {routeType === "user" && users.length === 0 && !loading ? (
          <p className="no-result">No users</p>
        ) : (
          <>
            {users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))}
          </>
        )}
        {routeType === "communities" && communities.length === 0 && !loading ? (
          <p className="no-result">No communities</p>
        ) : (
          <>
            {communities.map((com) => (
              <CommunityCard
                key={com.id}
                id={com.id}
                name={com.name}
                username={com.username}
                imgUrl={com.image}
                bio={com.bio}
                members={com.members}
                width="w-full"
              />
            ))}
          </>
        )}
        {loading && (
          <div className="text-light-3 flex justify-center align-center">
            <p>Loading, please wait...</p>
          </div>
        )}
      </div>
      <div className="pagination text-light-2 bg-slate-500 rounded-md">
        <button type="button" onClick={handlePaginate}>
          Show more
        </button>
      </div>
    </>
  );
};
