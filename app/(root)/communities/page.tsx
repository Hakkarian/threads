import CommunityCard from "@/components/cards/CommunityCard";
import FilteredLabel from "@/components/shared/FilteredLabel";
import { Pagination } from "@/components/shared/Pagination";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

import { redirect } from "next/navigation";

async function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch users

  const res = await fetchCommunities({
    searchString: searchParams.q || "",
    pageNumber: searchParams.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="head-text mb-10 flex justify-center align-center">Search</h1>

      <FilteredLabel routeType="communities" />
      
      <Pagination userId={user.id} searchString={searchParams.q || "" } routeType="communities" />
    </section>
  );
}

export default Page;
