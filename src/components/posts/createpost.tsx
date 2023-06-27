import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { cn } from "~/utils/cn";

const CreatePost = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  //   const [isCreating, setIsCreating] = React.useState(false);

  const { mutate, isLoading: isCreating } = api.post.create.useMutation({
    onSuccess: () => {
      router.replace("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = async (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      mutate({ title, content });
    } catch (error) {
      console.log(error);
    }

    // setIsCreating(true);
    // await api.post.create({ title, content });
    // setIsCreating(false);
    // router.push("/");
  };

  return (
    <>
      {!session ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">You must be signed in</h1>
          <button
            className="rounded-md bg-indigo-500 px-4 py-2 text-white"
            onClick={() => router.push("/signin")}
          >
            Sign In
          </button>
        </div>
      ) : (
        <>
          {" "}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center justify-center gap-4">
              singOut :
              <button
                className="rounded-md bg-indigo-500 px-4 py-2 text-white"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
              <h1 className="text-2xl font-bold">Create Post</h1>
              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  placeholder="Content"
                  className="rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setContent(e.target.value)}
                />
                <button
                  type="submit"
                  className={cn(
                    "rounded-md bg-indigo-500 px-4 py-2 text-white",
                    isCreating && "cursor-not-allowed opacity-50"
                  )}
                  onClick={handleSubmit}
                  disabled={isCreating}
                >
                  {!isCreating ? "Create" : "Creating..."}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default CreatePost;
