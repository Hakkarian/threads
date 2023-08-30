import CommunityCard from "@/components/cards/CommunityCard";
import UserCard from "@/components/cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

import { redirect } from "next/navigation";

async function RightSidebar({ params }: { params: { id: string } }) {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch users

  const coms = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  const res = await fetchUsers({
    userId: user.id,
    searchString: '',
    pageNumber: 1,
    pageSize: 25
  }) 

  const sortedComs = coms.communities.sort((a, b) => b.members.length - a.members.length);

  console.log('sort', sortedComs);

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h2 className="text-center text-heading3-bold text-light-2">
          Suggested users
        </h2>
        <div className="mt-6 flex flex-col gap-5">
          {res.users.length === 0 ? (
            <p className="no-result">No users</p>
          ) : (
            <>
              {res.users.map((person) => (
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
        </div>
        <h2 className="mt-10 text-center text-heading3-bold text-light-2">
          Suggested communities
        </h2>
        <div className="mt-6 flex flex-col gap-5">
          {coms.communities.length === 0 ? (
            <p className="no-result">No communities</p>
          ) : (
            <>
              {sortedComs.map((com) => (
                <CommunityCard
                  key={com.id}
                  id={com.id}
                  name={com.name}
                  username={com.username}
                  imgUrl={com.image}
                  bio={com.bio}
                  members={com.members}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col"></div>
    </section>
  );
}

export default RightSidebar;
