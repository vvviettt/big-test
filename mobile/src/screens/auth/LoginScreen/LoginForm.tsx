import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';

import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import GoogleIcon from '../../../assets/svg/google.svg';
import OrLine from '../../../components/OrLine/OrLine';
import BasicInput from '../../../components/input/BasicInput';
import BasicButton from '../../../components/button/BasicButton';
import {ConstantVariable} from '../../../config/constant';
import {Colors} from '../../../config/colors';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {login} from '../../../redux/user/auth.slice';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import OverlayLoading from '../../../components/OverlayLoading/OverlayLoading';
import {FetchStatus} from '../../../enum/FetchStatus.enum';

export interface LoginFormState {
  email: string;
  password: string;
}

const LoginForm = () => {
  const schema = yup.object<LoginFormState>({
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
  const {control, handleSubmit} = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const dispatch = useAppDispatch();
  const {loginFetchStatus} = useAppSelector(state => state.auth);
  const onSubmit = handleSubmit(data => {
    dispatch(login(data as LoginFormState));
  });
  return (
    <View>
      <OverlayLoading
        isActive={loginFetchStatus == FetchStatus.SUBMIT_LOADING}
      />
      <Text style={styles.title}>Đăng nhập</Text>
      <BasicInput control={control} name="email" placeholder="Email" />
      <BasicInput control={control} name="password" placeholder="Mật khẩu" />
      <BasicButton
        label="Đăng nhập"
        onTap={onSubmit}
        bgColor={Colors.blue}
        textColor={Colors.white}
      />
      <OrLine />
      <BasicButton
        label={'Tiếp tục với google'}
        icon={<GoogleIcon width={24} height={24} />}
        onTap={() => {}}
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
