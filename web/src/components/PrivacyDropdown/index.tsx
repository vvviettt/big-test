import { useRef, useState } from "react";
import { ReactComponent as CheckIcon } from "../../assets/svg/check.svg";
import { ReactComponent as DownArrowIcon } from "../../assets/svg/downArrow.svg";
import { useOnClickOutside } from "usehooks-ts";

interface PrivacyDropdownProps {
  value: number;
  onChange: (value: number) => void;
}

const PrivacyDropdown: React.FC<PrivacyDropdownProps> = ({
  value,
  onChange,
}) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const handleClickOutside = () => {
    setShow(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const privacies = ["Chỉ mình tôi", "Tất cả mọi người"];
  return (
    <div className="relative inline-block bg-white z-50" ref={ref}>
      <div
        className="flex items-center px-3 border border-[#1d9bf0] rounded-full cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <span className="text-[14px] font-extrabold text-[#1d9bf0]">
          {privacies[value]}
        </span>
        <div className="ml-1">
          <DownArrowIcon width={16} height={16} fill="#1d9bf0" />
        </div>
      </div>
      {show && (
        <div
          className="w-[260px] absolute top-[150%] right-[50%] translate-x-[50%] bg-white rounded-lg"
          style={{
            boxShadow:
              "rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px",
          }}
        >
          <p className="px-3 text-[20px] font-bold py-2 ">Chọn đối tượng</p>
          {privacies.map((i, index) => {
            return (
              <div
                key={index}
                className="hover:bg-secondary flex justify-between px-4 py-3 cursor-pointer"
                onClick={() => {
                  onChange(index);
                  setShow(false);
                }}
              >
                <span className="text-[15px] font-semibold">{i}</span>
                {index === value && (
                  <CheckIcon width={20} height={20} fill={"#1d9bf0"} />
                )}
              </div>
            );
          })}
          <div className=""></div>
        </div>
      )}
    </div>
  );
};

export default PrivacyDropdown;
