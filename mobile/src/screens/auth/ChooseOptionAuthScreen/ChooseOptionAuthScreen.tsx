import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import BasicButton from '../../../components/button/BasicButton';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../../config/colors';

const ChooseOptionAuthScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
      <View style={styles.wrapper}>
        <View style={styles.centerView}>
          <Text style={styles.title}>
            Xem điều gì đang diễn ra xung quanh cuộc sống của bạn.
          </Text>
        </View>
        <BasicButton
          label={'Tạo tài khoản'}
          bgColor="#000"
          textColor="#fff"
          onTap={() => {
            navigation.navigate('register' as never);
          }}
        />
        <View style={styles.bottomView}>
          <Text style={{...styles.text, ...styles.textPolicy}}>
            Bằng cách đăng ký, bạn đồng ý với{' '}
            <Text style={styles.textHighlight}>
              Điều khoản, chính sách quyền riêng tư và sử dụng cookie{' '}
            </Text>
            của chúng tôi.
          </Text>
          <Text style={{...styles.text, ...styles.textLogin}}>
            Bạn đã có 1 tài khoản?{'  '}
            <Text
              style={styles.textHighlight}
              onPress={() => {
                navigation.navigate('login' as never);
              }}>
              Đăng nhập
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChooseOptionAuthScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingHorizontal: 30,
  },

  topView: {},

  centerView: {
    flex: 3,
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  bottomView: {
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
  },
  textPolicy: {
    fontSize: 14,
    marginVertical: 18,
  },
  textLogin: {
    paddingVertical: 10,
    marginVertical: 6,
  },
  textHighlight: {
    color: Colors.blue,
  },
});
