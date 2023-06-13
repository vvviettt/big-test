import { Controller, useForm } from "react-hook-form";
import DatePicker from "../DatePicker";
import BasicBtn from "../button/BasicBtn";
import BasicInput from "../input/BasicInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../redux/store";
import { closeAuth, showLoginFormChange } from "../../redux/state/stateSlice";

const schema = yup.object({
  firstName: yup.string().required("Họ là bắt buộc"),
  lastName: yup.string().required("Tên là bắt buộc"),
  email: yup
    .string()
    .email("Email không đúng định dạng.")
    .required("Email là bắt buộc."),
  dateOfBirth: yup.date().required("Ngày sinh là bắt buộc."),
  password: yup
    .string()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$&*~]).{8,}$/, {
      message:
        "Mật khẩu bao dài ít nhất 8 kí tự trong đó có 1 chữ cái hoa , 1 chữ cái thường , 1 chữ số và 1 kí tự đặc biệt.",
    })
    .required("Mật khẩu là bắt buộc."),
  confirmPassword: yup
    .string()
    .required("Xác nhận lại mật khẩu.")
    .oneOf([yup.ref("password")], "Mật khẩu không khớp."),
});
export type RegisterFormData = yup.InferType<typeof schema>;
const RegisterForm = () => {
  const { control, handleSubmit } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const onSubmit = (data: RegisterFormData) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-[31px] font-bold mb-10">Đăng ký</h3>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <BasicInput
              placeholder="Họ"
              onChange={(e) => onChange(e)}
              error={error?.message}
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
              placeholder="Tên"
              onChange={(e) => onChange(e)}
              error={error?.message}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange }, fieldState: { error } }) => {
          return (
            <BasicInput
              placeholder="Email"
              onChange={(e) => onChange(e)}
              error={error?.message}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="dateOfBirth"
        render={({ field: { onChange }, fieldState: { error } }) => {
          return (
            <DatePicker
              onChange={(date) => onChange(date)}
              error={error?.message}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange }, fieldState: { error } }) => {
          return (
            <BasicInput
              placeholder="Mật khẩu"
              isHidden
              onChange={(e) => onChange(e)}
              error={error?.message}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange }, fieldState: { error } }) => {
          return (
            <BasicInput
              placeholder="Xác nhận mật khẩu"
              isHidden
              onChange={(e) => onChange(e)}
              error={error?.message}
            />
          );
        }}
      />
      <BasicBtn
        type="submit"
        content="Đăng ký"
        wrapperClassName="bg-highlight py-6"
      />
      <div className="py-4">
        <div className="h-[1px] bg-slate-500 w-full "></div>
      </div>
      <p className="text-[16px]">
        Đã có tài khoản?{" "}
        <span
          onClick={() => {
            dispatch(closeAuth());
            dispatch(showLoginFormChange(true));
          }}
          className="text-highlight hover:cursor-pointer hover:underline"
        >
          Đăng nhập
        </span>
      </p>
    </form>
  );
};

export default RegisterForm;
