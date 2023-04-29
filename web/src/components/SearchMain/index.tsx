import { useState } from "react";
import { ReactComponent as SearchIcon } from "../../assets/svg/search.svg";
import classNames from "classnames";
import Avatar from "../Avatar";

const SearchMain: React.FC = () => {
  const [focused, setFocus] = useState(false);
  const [result] = useState([
    {
      content: "Ai cosplay",
      type: "POST",
    },
    {
      id: "itzailee1",
      type: "USER",
      avatar: null,
      name: "Ailee",
    },
    {
      id: "itzailee2",
      type: "USER",
      avatar: null,
      name: "Ailee",
    },
    {
      id: "itzailee3",
      type: "USER",
      avatar: null,
      name: "Ailee",
    },
  ]);
  console.log(focused);

  return (
    <div className="relative">
      <div
        className={classNames(
          "flex items-center gap-2 px-4 bg-secondary rounded-full border-2",
          { "border-highlight": focused },
          { "border-transparent": !focused }
        )}
      >
        <SearchIcon width={20} />
        <input
          placeholder="Tìm kiếm"
          className="w-full h-10 outline-none bg-transparent"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </div>
      {focused && (
        <div className="absolute left-0 right-0 top-full">
          {result.length > 0 ? (
            <div
              className="max-h-[calc(80vh-20px)] min-h-[6rem] py-4 mt-2"
              style={{
                boxShadow:
                  "rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px",
              }}
            >
              {result.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="hover:cursor-pointer px-3 py-3 hover:bg-secondary"
                  >
                    {item.type === "POST" ? (
                      <div className="flex gap-3 items-center">
                        <SearchIcon width={20} height={20} />
                        <p>{item.content}</p>
                      </div>
                    ) : (
                      <div className="flex gap-3 items-center">
                        <Avatar id={item.id!} size={30} />
                        <p>{item.name}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Tìm kiếm mọi người , chủ đề hoặc từ khóa</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMain;
