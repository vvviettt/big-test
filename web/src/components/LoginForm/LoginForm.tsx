import { Controller, useForm } from "react-hook-form";
import BasicInput from "../input";
import BasicBtn from "../button/BasicBtn";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../redux/store";
import { signInAction } from "../../redux/user/userSlice";

const schema = yup.object({
  email: yup
    .string()
    .email("Email không đúng định dạng.")
    .required("Email là bắt buộc."),
  password: yup
    .string()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$&*~]).{8,}$/, {
      message:
        "Mật khẩu bao dài ít nhất 8 kí tự trong đó có 1 chữ cái hoa , 1 chữ cái thường , 1 chữ số và 1 kí tự đặc biệt.",
    })
    .required("Mật khẩu là bắt buộc."),
});

export type LoginFormData = yup.InferType<typeof schema>;

function LoginForm() {
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const onSubmit = (data: LoginFormData) => {
    dispatch(signInAction(data));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-[31px] font-bold mb-10">Đăng nhập</h3>
      <Controller
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => {
          return (
            <BasicInput
              onChange={onChange}
              placeholder="Email"
              error={error?.message}
            />
          );
        }}
        name={"email"}
      />
      <Controller
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <BasicInput
              placeholder="Mật khẩu"
              isHidden
              onChange={onChange}
              error={error?.message}
            />
          );
        }}
        name={"password"}
      />

      <BasicBtn
        type="submit"
        content="Đăng nhập"
        wrapperClassName="bg-highlight py-6"
      />
    </form>
  );
}

export default LoginForm;
