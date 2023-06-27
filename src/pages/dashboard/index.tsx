import CreatePost from "~/components/posts/createpost";
import Header from "~/components/navbar/navbar";

import React from "react";
import ViewPost from "./allpost";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col gap-4">
          <Header />
        </div>
        <div className="flex flex-col gap-4">
          <ViewPost />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
