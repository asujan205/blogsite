import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

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

  const handleEdit = (id: string) => {
    setId(id);
    // mutate(id);
    setOpenEdit(true);
  };

  const handleDelete = (id: any) => {
    deletePost({ id });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(post);
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
            ))}
          </div>
        </div>
      </div>
      {openEdit && (
        <div className="flex flex-col items-center justify-center gap-4">
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
              className="rounded-md border border-gray-300 px-4 py-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              className="rounded-md bg-indigo-500 px-4 py-2 text-white"
              onClick={() => updatePost({ id: id, title, content })}
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
      )}
    </>
  );
};

export default ViewPost;
