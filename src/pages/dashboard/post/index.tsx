import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

const ViewPost = () => {
  const router = useRouter();
  const { data: post, isLoading } = api.post.all.useQuery();

  const { mutate, isLoading: isDeleting } = api.post.delete.useMutation({
    onSuccess: () => {
      router.replace("/dashboard");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleEdit = (id: string) => {
    // mutate(id);
  };

  const handleDelete = (id: any) => {
    mutate({ id });
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
    </>
  );
};

export default ViewPost;
