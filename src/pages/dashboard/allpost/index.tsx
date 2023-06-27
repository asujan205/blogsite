import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

const ViewPost = () => {
  const { data: post, isLoading } = api.post.all.useQuery();

  return (
    <>
      <div className="mt-15 flex flex-row justify-between gap-4">
        {post?.map((post) => (
          <>
            <div className="  h-[500px] w-[400px] border-2 border-solid border-sky-500">
              {" "}
              <div className="image">
                {/* <Link href={`/posts/${id}`}><a><Image src={img || "/"} width={600} height={600} /></a></Link> */}
              </div>
              <div className="info flex flex-col justify-between gap-4">
                <div className="cat flex flex-row justify-between gap-5 p-3">
                  <a className="text-orange-600 hover:text-orange-800">
                    {post?.author?.email}
                  </a>
                  <a className="text-gray-800 hover:text-gray-600">
                    - {post?.createdAt.toISOString()}
                  </a>
                </div>
                <div className="title">
                  <h1 className="text-3xl font-bold text-gray-800 hover:text-gray-600 md:text-6xl">
                    {post?.title || "Unknown"}
                  </h1>
                </div>
                <p className="py-3 text-gray-500">
                  {post?.content || "description"}
                </p>
                {/* { author ? <Author {...author}></Author> : <></>} */}
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default ViewPost;
