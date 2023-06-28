import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";
import Image from "next/image";

const ViewPost = () => {
  const router = useRouter();
  const { data: post, isLoading } = api.post.all.useQuery();

  return (
    <>
      <div className="mt-15 flex flex-row flex-wrap  justify-center gap-10 p-10">
        {post?.map((post) => (
          <>
            <div className="  min-h-[500px] w-[400px]  rounded-xl border font-semibold shadow-sm ">
              {" "}
              <div className="image">
                {/* <Image src="" width={300} height={160} alt="img" /> */}
              </div>
              <div className="info flex flex-col justify-between gap-4">
                <div className="cat flex flex-row justify-between gap-5 p-3">
                  <a className="cursor-pointer text-orange-600 hover:text-orange-800">
                    {post?.author?.email}
                  </a>
                  <a className="cursor-pointer text-gray-800 hover:text-gray-600">
                    - {post?.createdAt.toISOString()}
                  </a>
                </div>
                <div className="flex flex-col items-center">
                  <div className="title">
                    <h1
                      className="cursor-pointer text-3xl font-bold text-gray-800 hover:text-gray-600 md:text-6xl "
                      onClick={() => {
                        router.push(`/dashboard/allpost/${post.id}`);
                      }}
                    >
                      {post?.title || "Unknown"}
                    </h1>
                  </div>
                  <div className="mt-4 min-h-[400px] w-full bg-gray-200 pl-3">
                    <p className="text-gray-500">
                      {post?.content || "description"}
                    </p>
                  </div>
                </div>

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
