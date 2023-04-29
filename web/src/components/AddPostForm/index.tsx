import Avatar from "../Avatar";
import { useAppSelector } from "../../redux/store";
import { TextField } from "@mui/material";
import PrivacyDropdown from "../PrivacyDropdown";
import { ReactComponent as ImageIcon } from "../../assets/svg/image.svg";
import { ReactComponent as SurveyIcon } from "../../assets/svg/survey.svg";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Circle from "react-circle";
import { useRef } from "react";

const schema = yup.object({
  content: yup.string().max(500).required(),
  privacy: yup.number(),
});
type FormData = yup.InferType<typeof schema>;

const AddPostForm = () => {
  const { user } = useAppSelector((state) => state.user);
  const imageRef = useRef<HTMLInputElement>(null);
  const { handleSubmit, control, reset } = useForm<FormData>({
    defaultValues: { content: "", privacy: 0 },
    resolver: yupResolver(schema),
  });

  const handlePickImage = () => {
    imageRef.current?.click();
  };

  const handleFileChosen = (files: FileList | null) => {
    console.log(files);
    // const reader = new FileReader();
    // reader.onloadend = handleFileRead;
    // reader.readAsText(file);
  };

  return (
    <div className="flex px-4 py-3">
      <div className="mr-3">
        <Avatar size={48} id={user?.id ?? "sbdcskj"} />
      </div>
      <div className="flex-1">
        <PrivacyDropdown
          value={1}
          onChange={(value) => {
            console.log(value);
          }}
        />
        <div className="mt-2 mb-3">
          <Controller
            control={control}
            name="content"
            render={({ field: { onChange, value } }) => {
              return (
                <TextField
                  multiline
                  placeholder="Chuyện gì đang xảy ra?"
                  fullWidth
                  variant="standard"
                  value={value}
                  InputProps={{
                    disableUnderline: true,
                    style: { fontSize: 18 },
                  }}
                  onChange={({ target: { value } }) => {
                    if (value.length <= 500) {
                      onChange(value);
                    }
                  }}
                />
              );
            }}
          />
        </div>
        <div className="h-[1.5px] bg-secondary w-full"></div>
        <div className="flex justify-between mt-3 items-center">
          <div className="flex">
            <div className="w-8 h-8 flex justify-center items-center cursor-pointer">
              <ImageIcon
                width={20}
                height={20}
                fill={"#1d9bf0"}
                onClick={() => handlePickImage()}
              />
              <input
                className="hidden"
                type="file"
                ref={imageRef}
                multiple
                accept="image/png, image/jpeg, image/gif"
                onChange={(e) => handleFileChosen(e.target.files)}
              ></input>
            </div>
            <div className="w-8 h-8 flex justify-center items-center cursor-pointer">
              <SurveyIcon width={20} height={20} fill={"#1d9bf0"} />
            </div>
          </div>
          <div className="flex justify-end items-center">
            <div className="flex mr-4">
              <Controller
                control={control}
                name="content"
                render={({ field: { value } }) => {
                  return (
                    <Circle
                      progress={value.length / 5}
                      size="25"
                      textStyle={{ display: "none" }}
                      lineWidth="40"
                    />
                  );
                }}
              />
              <div className="h-full w-[1.5px] bg-secondary"></div>
            </div>
            <button className="flex h-9 justify-center items-center bg-highlight px-4 rounded-full">
              <span className="text-[15px] font-bold text-white">Đăng bài</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPostForm;
