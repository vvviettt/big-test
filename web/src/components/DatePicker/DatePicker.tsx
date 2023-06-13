import { FC, useCallback, useEffect, useState } from "react";
import { Select } from "../input";

interface PropTypes {
  error?: string;
  onChange?: (date: Date) => void;
}

const DatePicker: FC<PropTypes> = ({ onChange, error }) => {
  const [year, setYear] = useState<number | undefined>(undefined);
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [day, setDay] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (day && month && year) {
      console.log("HHHH");
    }
  }, [day, month, year]);

  const years = useCallback(() => {
    const year = new Date().getFullYear();
    return Array.from(Array(100), (_, i) => ({
      value: year - 100 + i + 1,
      label: (year - 100 + i + 1).toString(),
    })).reverse();
  }, []);
  const months = useCallback(() => {
    return Array.from(Array(12), (_, i) => ({
      value: i + 1,
      label: (i + 1).toString(),
    }));
  }, []);
  const days = useCallback(() => {
    if (year !== undefined && month !== undefined) {
      const count = new Date(year!, month!, 0).getDate();
      return Array.from(Array(count), (_, i) => ({
        value: i + 1,
        label: (i + 1).toString(),
      }));
    }
    return [];
  }, [year, month]);
  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <div className="w-[30%]">
          <Select
            onChange={(val) => {
              setYear(parseInt(val));
            }}
            placeholder="Năm sinh"
            options={years()}
          />
        </div>
        <div className="w-[30%]">
          <Select
            disabled={year === undefined}
            onChange={(val) => {
              setMonth(parseInt(val));
            }}
            placeholder="Tháng sinh"
            options={months()}
          />
        </div>
        <div className="w-[30%]">
          <Select
            disabled={month === undefined}
            onChange={(val) => {
              setDay(parseInt(val));
            }}
            placeholder="Ngày sinh"
            options={days()}
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-[13px] pl-2">{error}</p>}
    </div>
  );
};

export default DatePicker;
