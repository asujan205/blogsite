import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

const ViewPost = () => {
  const { data: post, isLoading } = api.post.all.useQuery();

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">View Post</h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {post?.map((post) => (
              <div key={post.id}>
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-bold">{post.title}</h2>
                  <p>{post.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPost;
