import Avatar from "../Avatar";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { TextField } from "@mui/material";
import PrivacyDropdown from "../PrivacyDropdown";
import { ReactComponent as ImageIcon } from "../../assets/svg/image.svg";
import { ReactComponent as SurveyIcon } from "../../assets/svg/survey.svg";
import * as yup from "yup";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Circle from "react-circle";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import {
  fileListToUrlList,
  mergeFileLists,
  removeFileFromList,
} from "../../util/fileHelper";
import { toast } from "react-toastify";
import ImagePreviewItem from "./ImagePreviewItem";
import Survey from "./Survey";
import { newPostAction } from "../../redux/post/postSlice";
import { StatusFetch } from "../../enums/StatusFetch.enum";

const schema = yup.object({
  content: yup.string().max(500).required(),
  privacy: yup.number().required(),
  survey: yup.array(yup.string()).min(2),
  surveyTime: yup.number().default(24 * 60),
  files: yup
    .mixed()
    .nullable()
    .test("is-fileList", "Vui lòng chọn tệp", (value) => {
      return value instanceof FileList || value === undefined || value === null;
    }),
});
export type AddPostFormData = yup.InferType<typeof schema>;

const AddPostForm = () => {
  const [showSurvey, setShowSurvey] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const { user } = useAppSelector((state) => state.user);
  const imageRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { newPostStatus } = useAppSelector((state) => state.post);
  const {
    handleSubmit,
    control,
    formState: { isValid },
    setValue,
    getValues,
    reset,
  } = useForm<AddPostFormData>({
    defaultValues: { content: "", files: new DataTransfer().files, privacy: 1 },
    resolver: yupResolver(schema),
  });
  const files = useWatch({ name: "files", control: control });
  useEffect(() => {
    async function getUrl() {
      setImageUrl(await fileListToUrlList(files as FileList));
    }
    getUrl();
  }, [files]);

  useEffect(() => {
    if (newPostStatus === StatusFetch.SUCCESS) {
      reset();
      setShowSurvey(false);
    }
  }, [newPostStatus, reset]);

  const handlePickImage = () => {
    imageRef.current?.click();
  };

  const onSubmit = (data: AddPostFormData) => {
    if (newPostStatus === StatusFetch.LOADING) {
      return;
    }
    dispatch(newPostAction(data));
  };
  if (!user) {
    return <></>;
  }
  return (
    <div className="border-b-2 border-secondary">
      <form onSubmit={handleSubmit(onSubmit)} className="flex px-4 py-3 w-full">
        <div className="mr-3">
          <Avatar size={48} id={user?.id ?? "sbdcskj"} />
        </div>
        <div className="flex-1 " style={{ contain: "inline-size" }}>
          <Controller
            control={control}
            name="privacy"
            render={({ field: { onChange, value } }) => {
              return (
                <PrivacyDropdown
                  value={value}
                  onChange={(value) => {
                    onChange(value);
                  }}
                />
              );
            }}
          />
          <div className="mt-2 mb-3 w-full">
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
            <div className="pb-3">
              {showSurvey && (
                <Controller
                  control={control}
                  name="surveyTime"
                  render={({ field: { value, onChange } }) => {
                    const surveyTimeChange = onChange;
                    return (
                      <Controller
                        control={control}
                        name="survey"
                        render={({ field: { value, onChange } }) => {
                          return (
                            <Survey
                              onTimeChange={(val) => {
                                surveyTimeChange(val);
                              }}
                              onChange={(val) => {
                                onChange(val);
                              }}
                              onRemoveSurvey={() => {
                                setShowSurvey(false);
                                onChange(undefined);
                              }}
                            />
                          );
                        }}
                      />
                    );
                  }}
                />
              )}
            </div>
            <div className="flex gap-3 overflow-scroll w-full ">
              {imageUrl.map((image, index) => (
                <ImagePreviewItem
                  onRemove={() => {
                    setValue(
                      "files",
                      removeFileFromList(getValues().files as FileList, index)
                    );
                  }}
                  url={image}
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className="h-[1.5px] bg-secondary w-full"></div>
          <div className="flex justify-between mt-3 items-center">
            <div className="flex">
              <div className="w-8 h-8 flex justify-center items-center cursor-pointer">
                <Controller
                  control={control}
                  name="files"
                  render={({ field: { value, onChange } }) => {
                    return (
                      <>
                        <ImageIcon
                          className={classNames({
                            "opacity-50":
                              (value as unknown as FileList).length >= 5,
                          })}
                          width={20}
                          height={20}
                          fill={"#1d9bf0"}
                          onClick={() => {
                            if ((value as FileList).length < 4) {
                              handlePickImage();
                            }
                          }}
                        />
                        <input
                          className="hidden"
                          type="file"
                          ref={imageRef}
                          multiple
                          max={4}
                          accept="image/png, image/jpeg, image/gif"
                          onChange={async (e) => {
                            const files: FileList | null = e.target.files;
                            if (
                              files === null ||
                              files.length + (value as FileList).length > 4
                            ) {
                              toast.warning("Chỉ cho phép đăng tải 4 ảnh");
                            } else {
                              if (value) {
                                onChange(
                                  mergeFileLists(value as FileList, files)
                                );
                              } else {
                                onChange(e.target.files);
                              }
                            }
                          }}
                        ></input>
                      </>
                    );
                  }}
                />
              </div>
              <div
                className={classNames(
                  "w-8 h-8 flex justify-center items-center cursor-pointer",
                  { "opacity-50": showSurvey }
                )}
                onClick={() => {
                  if (!showSurvey) {
                    setShowSurvey(true);
                  }
                }}
              >
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
              <button
                type="submit"
                className={classNames(
                  "flex h-9 justify-center items-center bg-highlight px-4 rounded-full",
                  {
                    "opacity-50":
                      !isValid || newPostStatus === StatusFetch.LOADING,
                  }
                )}
              >
                <span className="text-[15px] font-bold text-white">
                  Đăng bài
                </span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;
