import UserCard from "@/components/cards/UserCard";
import FilteredLabel from "@/components/shared/FilteredLabel";
import {Pagination} from "@/components/shared/Pagination";
import { fetchUser, fetchUsers, fetchUsers2 } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

import { redirect } from "next/navigation";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch users

  let res = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q || "",
    pageNumber: searchParams.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="head-text mb-10 flex justify-center items-center">
        Search
      </h1>

      <FilteredLabel routeType="search" />
      <Pagination routeType="user" userId={user.id} searchString={searchParams.q || ""} />
    </section>
  );
}

export default Page;
