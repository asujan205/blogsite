import CreatePost from "~/components/posts/createpost";

import React from "react";
import ViewPost from "./post";

const Dashboard = () => {
  return (
    <>
      <ViewPost />
      <CreatePost />
    </>
  );
};

export default Dashboard;
