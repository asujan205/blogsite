import React from "react";
import { api } from "~/utils/api";

const ViewPost = () => {
  const { data: post, isLoading } = api.post.all.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(post);
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">View Post</h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4"></div>
        </div>
      </div>
    </>
  );
};

export default ViewPost;
