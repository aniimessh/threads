import UserCard from "@/components/cards/UserCard";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
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

  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section className="">
      <h1 className="head-text">
        {/* search bar */}
        <div className="mt-14 flex flex-col gap-9">
          {result && result.users.length === 0 ? (
            <p className="no-result">No users found</p>
          ) : (
            <>
              {result &&
                result.users.map((user) => (
                  <UserCard
                    key={user.id}
                    name={user.name}
                    username={user.username}
                    id={user.id}
                    imgUrl={user.image}
                    personType="User"
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
