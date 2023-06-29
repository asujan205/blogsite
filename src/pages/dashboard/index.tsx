import CreatePost from "~/components/posts/createpost";
import Header from "~/components/navbar/navbar";

import React from "react";
import ViewPost from "./allpost";
import Footer from "~/components/footer/footer";

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
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
