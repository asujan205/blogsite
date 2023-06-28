import React from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Header from "~/components/navbar/navbar";
import Footer from "~/components/footer/footer";

const ViewPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const postId = Array.isArray(id) ? id[0] : id; // Access the first element of the array
  const idString = postId as string;

  const { data: post } = api.post.viewOne.useQuery({ id: idString });

  return (
    <>
      <div className="mt-15 flex flex-col  gap-10 p-10">
        <div>
          <Header />
        </div>
        <>
          <div className="  flex min-h-full flex-1 flex-col justify-center rounded-xl border py-12 font-semibold shadow-sm sm:px-10 lg:px-12">
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
                  <h1 className="cursor-pointer text-3xl font-bold text-gray-800 hover:text-gray-600 md:text-6xl">
                    {post?.title || "Unknown"}
                  </h1>
                </div>
                <div className="mt-4 min-h-[700px] w-full bg-gray-200 pl-3">
                  <p className="text-gray-500">
                    {post?.content || "description"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
      <Footer />
    </>
  );
};

export default ViewPost;
