import CommunityCard from "@/components/cards/CommunityCard";
import UserCard from "@/components/cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

import { redirect } from "next/navigation";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch users

  const res = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>


      <div className="mt-14 flex flex-col gap-9">
        {res.communities.length === 0 ? (
          <p className="no-result">No communities</p>
        ) : (
          <>
            {res.communities.map((com) => (
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
    </section>
  );
}

export default Page;
