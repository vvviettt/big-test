import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useAppDispatch} from '../../redux/store';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import AddPostButton from '../../components/button/AddPostButton';

const HomePage: React.FC<{navigation: NavigationProp<any>}> = ({}) => {
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <HeaderBar>
          <Text style={styles.label}>Bảng tin</Text>
        </HeaderBar>
      </View>
      <AddPostButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {height: '100%', position: 'relative'},
  label: {
    fontSize: 18,
    fontWeight: '800',
  },
});
export default HomePage;
