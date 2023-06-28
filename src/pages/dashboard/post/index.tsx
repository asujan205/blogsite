import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";
import CreatePost from "~/components/posts/createpost";
import Header from "~/components/navbar/navbar";

const ViewPost = () => {
  const router = useRouter();
  const { data: post, isLoading } = api.post.me.useQuery();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [openEdit, setOpenEdit] = React.useState(false);
  const [id, setId] = React.useState("");

  const { mutate: deletePost, isLoading: isDeleting } =
    api.post.delete.useMutation({
      onSuccess: () => {
        router.replace("/dashboard");
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const { mutate: updatePost, isLoading: isUpdating } =
    api.post.update.useMutation({
      onSuccess: () => {
        router.replace("/dashboard");
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const handleEdit = async (id: string) => {
    setId(id);

    // mutate(id);

    setOpenEdit(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePost({ id });
      router.replace("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(post);
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6">
        <div>
          <Header />
        </div>
        <h1 className="text-2xl font-bold">View Post</h1>

        <div className="flex flex-row gap-4">
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
                      <h1 className="cursor-pointer text-3xl font-bold text-gray-800 hover:text-gray-600 md:text-6xl">
                        {post?.title || "Unknown"}
                      </h1>
                    </div>
                    <div className="mt-4 min-h-[400px] w-full bg-gray-200 pl-3">
                      <p className="text-gray-500">
                        {post?.content || "description"}
                      </p>
                    </div>
                    <div className="flex flex-row justify-evenly gap-10 p-3">
                      <button
                        className="rounded-md bg-indigo-500 px-4 py-2 text-white"
                        onClick={() => handleEdit(post?.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="rounded-md bg-red-500 px-4 py-2 text-white"
                        onClick={() => handleDelete(post?.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* { author ? <Author {...author}></Author> : <></>} */}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>

      {openEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="h-[500px] w-[500px] rounded-md bg-white p-6 shadow-md">
            <h1 className="text-2xl font-bold">Edit Post</h1>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Title"
                className="rounded-md border border-gray-300 px-4 py-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Content"
                className="h-[200px] rounded-md border border-gray-300 px-4 py-2"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button
                className="rounded-md bg-indigo-500 px-4 py-2 text-white"
                onClick={async () => await updatePost({ id, title, content })}
              >
                Update
              </button>
              <button
                className="rounded-md bg-red-500 px-4 py-2 text-white"
                onClick={() => setOpenEdit(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewPost;
