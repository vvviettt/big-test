import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import TitleHeader from '../../../components/TitleHeader';
import OrLine from '../../../components/OrLine/OrLine';
import LoginForm from './LoginForm';

const LoginScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TitleHeader />
        <View style={styles.mainContent}>
          <LoginForm />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  mainContent: {
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
  },
});

export default LoginScreen;
