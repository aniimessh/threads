import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  const userInfoPlain = userInfo.toJSON();
  const userId = userInfoPlain._id.toString();

  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id);
  return (
    <section className="">
      <h1 className="head-text">Acitivity Page</h1>
      <section className="mt-10 flex flex-col gap-5">
        {activity && activity.length > 0 ? (
          <>
            {activity?.map((activity) => (
              <Link href={`/thread/${activity.id}`} key={activity.id}>
                <article className="activity-card">
                  <Image
                    src={activity.author.image}
                    alt="profile-image"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">{activity.author.name}</span>
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="text-light-1 !text-base-regular">No Activity Found</p>
        )}
      </section>
    </section>
  );
};

export default Page;
