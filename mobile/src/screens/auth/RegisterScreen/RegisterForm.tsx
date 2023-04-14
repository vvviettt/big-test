import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BasicInput from '../../../components/input/BasicInput';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {ConstantVariable} from '../../../config/constant';
import {DateSelect} from '../../../components/DateSelect';
import BasicButton from '../../../components/button/BasicButton';
import {Colors} from '../../../config/colors';

const RegisterForm = () => {
  type DataType = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: Date;
  };
  const schema = yup.object<DataType>({
    email: yup
      .string()
      .email('Email không hợp lệ.')
      .required('Email là bắt buộc.'),
    firstName: yup.string().required('Họ là bắt buộc.'),
    lastName: yup.string().required('Tên là bắt buộc.'),
    password: yup
      .string()
      .matches(
        ConstantVariable.passwordRegex,
        'Mật khẩu phải dài ít nhất 6 ký tự , trong đó ít nhất 1 chữ cái hoa 1 chữ cái thường , 1 chữ số và 1 kí tự đặc biệt.',
      )
      .required('Mật khẩu là bắt buộc.'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Mât khẩu không hợp lệ.'),
    dateOfBirth: yup.date().required('Vui lòng nhập ngày'),
  });
  const {control, handleSubmit} = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit(data => {
    console.log(data);
  });

  return (
    <View>
      <Text style={styles.title}>Tạo tài khoản</Text>
      <BasicInput control={control} name="email" placeholder="Email" />
      <View style={styles.nameWrapper}>
        <View style={styles.name}>
          <BasicInput control={control} name="firstName" placeholder="Họ" />
        </View>
        <View style={styles.name}>
          <BasicInput control={control} name="lastName" placeholder="Tên" />
        </View>
      </View>
      <BasicInput
        secureText
        control={control}
        name="password"
        placeholder="Mật khẩu"
      />
      <BasicInput
        secureText
        control={control}
        name="confirmPassword"
        placeholder="Nhập lại mật khẩu"
      />
      <DateSelect name="dateOfBirth" control={control} />

      <BasicButton
        label="Tạo tài khoản"
        onTap={onSubmit}
        bgColor={Colors.blue}
        textColor={Colors.white}
      />
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  title: {
    marginBottom: 60,
    fontSize: 34,
    fontWeight: '700',
  },
  nameWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    width: '47%',
  },
});
