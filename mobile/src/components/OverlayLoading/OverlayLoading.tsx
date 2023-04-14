import Spinner from 'react-native-loading-spinner-overlay/lib';

const OverlayLoading: React.FC<{isActive: boolean}> = ({isActive}) => {
  return (
    <Spinner
      visible={isActive}
      textContent={'Loading...'}
      textStyle={{}}
      // overlayColor="#000"
    />
  );
};

export default OverlayLoading;
