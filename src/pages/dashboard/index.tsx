import CreatePost from "~/components/posts/createpost";
import Header from "~/components/navbar/navbar";

import React from "react";
import ViewPost from "./allpost";

const Dashboard = () => {
  return (
    <>
      <div className="justify-betwen flex flex-col items-center gap-20 ">
        <div>
          <Header />
        </div>
        <div>
          <ViewPost />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
