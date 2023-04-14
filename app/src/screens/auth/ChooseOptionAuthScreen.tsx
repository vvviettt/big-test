import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import GoogleIcon from '../../assets/svgs/google.svg';
import BasicButton from '../../components/button/BasicButton';

const ChooseOptionAuthScreen: React.FC = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
      <View style={styles.wrapper}>
        <View style={styles.topView}></View>
        <View style={styles.centerView}>
          <Text style={styles.title}>
            Xem điều gì đang diễn ra xung quanh cuộc sống của bạn.
          </Text>
        </View>
        <View style={styles.bottomView}>
          <BasicButton
            label={'Tiếp tục với google'}
            icon={<GoogleIcon />}
            onTap={() => {}}
          />
          <BasicButton label={'Tạo tài khoản'} onTap={() => {}} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChooseOptionAuthScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
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
    justifyContent: 'flex-end',
  },
});
