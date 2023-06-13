import { useEffect, useRef, useState } from "react";
import { ReactComponent as CameraPlus } from "../../assets/svg/camera-plus.svg";
import Avatar from "../Avatar";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fileListToUrlList } from "../../util/fileHelper";
import BasicInput from "../input/BasicInput";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import classNames from "classnames";
import { changeUserInfoAction } from "../../redux/user/userSlice";
import { StatusFetch } from "../../enums/StatusFetch.enum";
import { Player } from "@lottiefiles/react-lottie-player";
import loading from "../../assets/jsons/three-dots-loading.json";

const schema = yup.object({
  firstName: yup.string().max(50, "Họ quá dài").required("Họ là bắt buộc."),
  lastName: yup.string().max(50, "Tên quá dài.").required("Tên là bắt buộc."),
  description: yup.string().default(undefined),
  avatar: yup
    .mixed()
    .nullable()
    .test("is-fileList", "Không hợp lệ", (value) => {
      return value instanceof File || value === undefined || value === null;
    })
    .default(null),
  coverImage: yup
    .mixed()
    .nullable()
    .test("is-fileList", "Không hợp lệ", (value) => {
      return value instanceof File || value === undefined || value === null;
    })
    .default(null),
});
export type ChangeInfoFormData = yup.InferType<typeof schema>;

const ChangInfoForm = () => {
  const avatarRef = useRef<HTMLInputElement>(null);
  const coverImageRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [coverImageUrl, setCoverImageUrl] = useState<string | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
    setValue,
  } = useForm<ChangeInfoFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const onSubmit = (data: ChangeInfoFormData) => {
    if (isDirty) {
      dispatch(changeUserInfoAction(data));
    }
  };

  const { user, changeInfoStatus } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("description", user.description);
      setAvatarUrl(user.avatarUrl);
      setCoverImageUrl(user.coverImageUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!user) {
    return <></>;
  }
  return (
    <form className="relative" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="coverImage"
        render={({ field: { onChange } }) => {
          return (
            <input
              type="file"
              hidden
              accept=".png,.jpg,.jpeg"
              ref={coverImageRef}
              onChange={async (e) => {
                const files = e.target.files;
                if (files?.length) {
                  onChange(files[0]);
                  const url = await fileListToUrlList(files);
                  setCoverImageUrl(url[0]);
                }
              }}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="avatar"
        render={({ field: { onChange } }) => {
          return (
            <input
              type="file"
              hidden
              ref={avatarRef}
              onChange={async (e) => {
                const files = e.target.files;
                if (files?.length) {
                  onChange(files[0]);
                  const url = await fileListToUrlList(files);
                  setAvatarUrl(url[0]);
                }
              }}
            />
          );
        }}
      />
      <div className="flex justify-between items-center sticky pb-2">
        <h1 className="text-[18px] font-medium">Chỉnh sửa hồ sơ</h1>
        <button
          type="submit"
          className={classNames("bg-highlight px-4 py-1 rounded-full", {
            "bg-opacity-50": !isValid,
          })}
        >
          {changeInfoStatus === StatusFetch.LOADING ? (
            <Player src={loading} autoplay loop />
          ) : (
            <span className="text-white font-semibold">Lưu</span>
          )}
        </button>
      </div>
      <div className="">
        <div
          className="w-full aspect-[3/1] bg-gray-200 flex justify-center items-center"
          style={{ backgroundImage: `url(${coverImageUrl})` }}
        >
          <PickImage
            onClick={() => {
              coverImageRef.current?.click();
            }}
          />
        </div>
      </div>
      <div className=" ">
        <div className="p-1 rounded-full bg-white mt-[-12%] ml-4 inline-block relative ">
          <Avatar size={112} avatarUrl={avatarUrl} />
          <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
            <PickImage
              onClick={() => {
                avatarRef.current?.click();
              }}
            />
          </div>
        </div>
      </div>
      <div className="">
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange }, fieldState: { error } }) => {
            return (
              <BasicInput
                error={error?.message}
                placeholder="Họ"
                defaultValue={user.firstName}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange }, fieldState: { error } }) => {
            return (
              <BasicInput
                error={error?.message}
                placeholder="Tên"
                defaultValue={user.lastName}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <BasicInput
                placeholder="Tiểu sử"
                error={error?.message}
                defaultValue={user.description}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
              />
            );
          }}
        />
      </div>
    </form>
  );
};

export default ChangInfoForm;

const PickImage = ({ onClick }: { onClick: Function }) => {
  return (
    <button
      onClick={() => onClick()}
      type="button"
      className="hover:bg-slate-400 px-2 py-2 rounded-full"
    >
      <CameraPlus width={22} />
    </button>
  );
};
