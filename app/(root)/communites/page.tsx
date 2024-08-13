import CommunityCard from "@/components/cards/CommunityCard";
import UserCard from "@/components/cards/UserCard";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchCommunities } from "@/lib/actions/community.action";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  const userInfoPlain = userInfo.toJSON();
  const userId = userInfoPlain._id.toString();

  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section className="">
      <h1 className="head-text">
        {/* search bar */}
        <div className="mt-14 flex flex-col gap-9">
          {result && result.communities.length === 0 ? (
            <p className="no-result">No communities found</p>
          ) : (
            <>
              {result &&
                result.communities.map((community) => (
                  <CommunityCard
                    key={community.id}
                    name={community.name}
                    username={community.username}
                    id={community.id}
                    imgUrl={community.image}
                    bio={community.bio}
                    members={community.members}
                  />
                ))}
            </>
          )}
        </div>
      </h1>
    </section>
  );
};

export default Page;
