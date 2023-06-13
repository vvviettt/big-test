import classNames from "classnames";
import { FC, useState } from "react";

interface PropType {
  options: {
    value: string | number | readonly string[] | undefined;
    label: string;
  }[];
  disabled?: boolean;
  placeholder?: string;
  onChange: (a: string) => void;
}

const Select: FC<PropType> = ({ onChange, options, disabled, placeholder }) => {
  const [value, setValue] = useState("");
  return (
    <div className="w-full  ">
      <div
        className={classNames(
          "flex items-center border rounded-lg overflow-hidden",
          { "bg-[#E7ECF0]": disabled }
        )}
      >
        <select
          className={classNames(
            "appearance-none outline-none w-full px-4 py-3",
            { "text-[#9ca3af]": value === "" }
          )}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          disabled={disabled}
          defaultValue={0}
        >
          <option value={0} disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
