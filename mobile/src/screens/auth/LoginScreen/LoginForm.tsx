import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import BasicInput from '../../../components/input/BasicInput';
import BasicButton from '../../../components/button/BasicButton';
import {ConstantVariable} from '../../../config/constant';
import {Colors} from '../../../config/colors';
// import {login} from '../../../redux/user/auth.slice';
import {useAppDispatch} from '../../../redux/store';
import {signInAction} from '../../../redux/user/userSlice';

const schema = yup.object({
  email: yup
    .string()
    .email('Email không hợp lệ.')
    .required('Email là bắt buộc.'),
  password: yup
    .string()
    .matches(
      ConstantVariable.passwordRegex,
      'Mật khẩu phải dài ít nhất 6 ký tự , trong đó ít nhất 1 chữ cái hoa 1 chữ cái thường , 1 chữ số và 1 kí tự đặc biệt.',
    )
    .required('Mật khẩu là bắt buộc.'),
});
export type LoginFormData = yup.InferType<typeof schema>;

const LoginForm = () => {
  const {control, handleSubmit} = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const dispatch = useAppDispatch();
  // const {loginFetchStatus} = useAppSelector(state => state.user);
  const onSubmit = handleSubmit(data => {
    console.log(data);

    dispatch(signInAction(data as LoginFormData));
  });

  return (
    <View>
      {/* <OverlayLoading
        isActive={loginFetchStatus === FetchStatus.SUBMIT_LOADING}
      /> */}
      <Text style={styles.title}>Đăng nhập</Text>
      <BasicInput control={control} name="email" placeholder="Email" />
      <BasicInput control={control} name="password" placeholder="Mật khẩu" />
      <BasicButton
        label="Đăng nhập"
        onTap={onSubmit}
        bgColor={Colors.blue}
        textColor={Colors.white}
      />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  title: {
    marginBottom: 70,
    fontSize: 34,
    fontWeight: '700',
  },
});
