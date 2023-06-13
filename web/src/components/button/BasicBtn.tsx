import classNames from "classnames";
import { FunctionComponent } from "react";

interface BasicBtnProps {
  content: string;
  loading?: boolean;
  onClick?: Function;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  wrapperClassName?: string;
  contentClassName?: string;
}

const BasicBtn: FunctionComponent<BasicBtnProps> = ({
  content,
  wrapperClassName,
  contentClassName,
  disabled,
  type,
  loading,
}) => {
  return (
    <button
      type={type}
      // onClick={(e) => {
      //   if (loading) {
      //     e.preventDefault();
      //   }
      // }}
      className={classNames(
        "flex w-full h-10 justify-center items-center px-4 rounded-full my-3",
        wrapperClassName,
        { "opacity-50": disabled }
      )}
    >
      <span
        className={classNames(
          "text-[15px] font-bold text-white",
          contentClassName
        )}
      >
        {content}
      </span>
    </button>
  );
};

export default BasicBtn;
