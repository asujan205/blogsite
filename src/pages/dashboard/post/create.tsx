import CreatePost from "~/components/posts/createpost";
import Header from "~/components/navbar/navbar";
import Footer from "~/components/footer/footer";

const CreatePage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10">
        <div>
          <Header />
        </div>
        <div>
          <CreatePost />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreatePage;
