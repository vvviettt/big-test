import { convertNumberFormat } from "../../util/numberHelper";

const listTrend = [
  {
    content: "Xinh",
    postNumber: 2233,
  },
  {
    content: "Xinh",
    postNumber: 2233,
  },
  {
    content: "Xinh",
    postNumber: 2233,
  },
  {
    content: "Xinh",
    postNumber: 2233,
  },
  {
    content: "Xinh",
    postNumber: 2233,
  },
  {
    content: "Xinh",
    postNumber: 2233,
  },
  {
    content: "Xinh",
    postNumber: 2233,
  },
  {
    content: "Xinh",
    postNumber: 2233,
  },
  {
    content: "Xinh",
    postNumber: 2233,
  },
  {
    content: "Xinh",
    postNumber: 2233,
  },
  {
    content: "Xinh",
    postNumber: 2233,
  },
  {
    content: "Xinh",
    postNumber: 2233,
  },
  {
    content: "Xinh",
    postNumber: 2233,
  },
  {
    content: "Xinh",
    postNumber: 2233,
  },
  {
    content: "Xinh",
    postNumber: 2233,
  },
  {
    content: "Xinh",
    postNumber: 2233,
  },
  {
    content: "Xinh",
    postNumber: 2233,
  },
];

const Trending = () => {
  return (
    <div className="bg-secondary rounded-2xl flex flex-col overflow-hidden">
      <p className="text-xl font-bold px-4 py-3">Xu hướng cho bạn</p>
      {listTrend.map((item, index) => {
        return (
          <div
            className="px-4 py-3 hover:bg-slate-200 cursor-pointer"
            key={index}
          >
            <p className="text-[13px] text-[#536471]">Chủ đề nổi trội</p>
            <p className="text-[15px] font-extrabold">{item.content}</p>
            <p className="text-[13px] text-[#536471]">
              {convertNumberFormat(item.postNumber)} bài đăng
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Trending;
