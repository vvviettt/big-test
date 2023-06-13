import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ReactComponent as PlusIcon } from "../../assets/svg/plus.svg";
import { useEffect, useState } from "react";
import classNames from "classnames";

interface SurveyProps {
  onTimeChange: (value: number) => void;
  onRemoveSurvey: () => void;
  onChange: (value: string[]) => void;
}

const Survey: React.FC<SurveyProps> = ({
  onChange,
  onRemoveSurvey,
  onTimeChange,
}) => {
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [survey, setSurvey] = useState<(string | null)[]>([null]);

  useEffect(() => {
    onTimeChange(day * 24 * 60 + hour * 60 + minute);
  }, [day, minute, hour, onTimeChange]);

  useEffect(() => {
    onChange(survey.filter((item) => item !== null && item !== "") as string[]);
  }, [survey, onChange]);

  return (
    <div className=" pt-3 border rounded-2xl w-full border-[#cfd9de] ">
      <div className="flex gap-2 w-full px-3 border-b border-[#cfd9de]">
        <div className="flex-1 flex flex-col gap-3 pb-3">
          {survey.map((item, index) => {
            return (
              <TextField
                key={index}
                onChange={(e) => {
                  let newSurvey = [...survey];
                  newSurvey[index] = e.target.value;
                  setSurvey(newSurvey);
                }}
                className="w-full"
                label={`Lựa chọn ${index + 1}`}
                inputProps={{
                  style: {
                    boxSizing: "border-box",
                    height: "56px",
                  },
                }}
              />
            );
          })}
        </div>
        <div className="flex items-end pb-3">
          <div className="flex h-14 items-center">
            <button
              className={classNames(
                " p-[7px] hover:bg-[rgba(29,155,240,0.1)] rounded-full",
                { hidden: survey.length >= 5 }
              )}
              onClick={() => {
                if (survey.length < 5) {
                  setSurvey([...survey, ""]);
                }
              }}
            >
              <PlusIcon width={20} height={20} fill="#1d9bf0" />
            </button>
          </div>
        </div>
      </div>
      <div className="p-3 border-b  border-[#cfd9de]">
        <p>Thời gian thăm dò</p>
        <div className="flex justify-between py-2 pt-4">
          <FormControl sx={{ m: 0, minWidth: "30%" }}>
            <InputLabel style={{ color: "#000" }}>Ngày</InputLabel>
            <Select
              value={day}
              label={"Ngày"}
              onChange={(val) => {
                setDay(val.target.value as number);
              }}
            >
              {[...Array(7).keys()].map((val, index) => {
                return (
                  <MenuItem key={index} value={val}>
                    {val}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 0, minWidth: "30%" }}>
            <InputLabel style={{ color: "#000" }}>Giờ</InputLabel>
            <Select
              value={hour}
              label={"Giờ"}
              onChange={(val) => {
                setHour(val.target.value as number);
              }}
            >
              {[...Array(24).keys()].map((val, index) => {
                return (
                  <MenuItem key={index} value={val}>
                    {val}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 0, minWidth: "30%" }}>
            <InputLabel style={{ color: "#000" }}>Phút</InputLabel>
            <Select
              value={minute}
              label={"Phút"}
              onChange={(val) => {
                setMinute(val.target.value as number);
              }}
            >
              {[...Array(60).keys()].map((val, index) => {
                return (
                  <MenuItem key={index} value={val}>
                    {val}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      <button
        className="p-4 w-full hover:bg-[rgba(244,33,46,0.1)]"
        onClick={() => onRemoveSurvey()}
      >
        <p className="text-[#f4212e]">Gỡ bỏ thăm dò</p>
      </button>
    </div>
  );
};

export default Survey;
