import SearchMain from "../../components/SearchMain";
import Trending from "../../components/Trending";

const OptionRight = () => {
  return (
    <div className="h-[100vh] overflow-scroll relative no-scrollbar">
      <div className=" flex flex-col gap-3">
        <div className="sticky left-0 right-0 top-0 pt-5 pb-3 bg-white">
          <SearchMain />
        </div>
        <Trending />
      </div>
    </div>
  );
};

export default OptionRight;
