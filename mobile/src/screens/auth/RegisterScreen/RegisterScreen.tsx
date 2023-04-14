import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import GoBackButton from '../../../components/button/GoBackButton';
import TitleHeader from '../../../components/TitleHeader';
import RegisterForm from './RegisterForm';

const RegisterScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <TitleHeader />
        <ScrollView style={styles.scrollView}>
          <RegisterForm />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
    marginHorizontal: 20,
  },
  scrollView: {
    flexGrow: 1,
    // marginTop: 20,
  },
});
