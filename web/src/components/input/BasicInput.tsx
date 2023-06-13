import { FunctionComponent, useState } from "react";
import { ReactComponent as EyeIcon } from "../../assets/svg/eye.svg";
import { ReactComponent as EyeSlashIcon } from "../../assets/svg/eye-slash.svg";
import classNames from "classnames";

interface BasicInputPropsType {
  placeholder?: string;
  error?: string;
  classNames?: string;
  defaultValue?: string;
  isHidden?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const BasicInput: FunctionComponent<BasicInputPropsType> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full mb-6 ">
      <div className="flex items-center border  px-4 py-3 rounded-lg">
        <input
          defaultValue={props.defaultValue}
          className={classNames(
            props.classNames,
            "flex-grow outline-none w-full"
          )}
          type={props.isHidden && !showPassword ? "password" : "text"}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
        {props.isHidden && (
          <div onClick={() => setShowPassword(!showPassword)}>
            {!showPassword ? (
              <EyeIcon width={18} height={18} />
            ) : (
              <EyeSlashIcon width={18} height={18} />
            )}
          </div>
        )}
      </div>
      {props.error && (
        <p className="text-red-500 text-[13px] pl-2">{props.error}</p>
      )}
    </div>
  );
};

export default BasicInput;
