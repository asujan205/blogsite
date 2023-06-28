import React from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const Editpost = ({ setOpenEdit, id }: any) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const router = useRouter();

  const { mutate: updatePost, isLoading: isUpdating } =
    api.post.update.useMutation({
      onSuccess: () => {
        router.replace("/dashboard/post");
      },
      onError: (error) => {
        console.log(error);
      },
    });

  return (
    <div>
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
    </div>
  );
};

export default Editpost;
