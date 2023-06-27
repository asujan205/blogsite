import CreatePost from "~/components/posts/createpost";

import React from "react";
import ViewPost from "./allpost";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <ViewPost />
      </div>
    </>
  );
};

export default Dashboard;
