import Image from "next/image";
import React from "react";

interface Props {
  accountId: string;
  authuserId: string;
  name: string;
  username: string;
  bio: string;
  imgUrl: string;
  type?: "User" | "Community";
}

const ProfileHeader = ({
  accountId,
  authuserId,
  name,
  username,
  bio,
  imgUrl,
  type,
}: Props) => {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="items-center flex gap-3">
          <div className="relative">
            <Image
              src={imgUrl}
              alt="profile-image"
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">
              {name}
            </h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
        </div>
      </div>
      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
};

export default ProfileHeader;
