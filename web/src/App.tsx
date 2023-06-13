import { RouterProvider, useNavigate, useNavigation } from "react-router-dom";
import { route } from "./routes";
import { Provider } from "react-redux";
import store, {
  persistor,
  useAppDispatch,
  useAppSelector,
} from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import GlobalDialog from "./components/GlobalDialog/GlobalDialog";
import { useEffect } from "react";
import { getUserInfo } from "./redux/user/userSlice";
import { StatusFetch } from "./enums/StatusFetch.enum";

function App() {
  return (
    <div className="App relative">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppInnit />
          <GlobalDialog />
        </PersistGate>
      </Provider>
      <ToastContainer />
    </div>
  );
}
export default App;

const AppInnit = () => {
  const { token, getMeStatus } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) {
      dispatch(getUserInfo());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if (getMeStatus === StatusFetch.LOADING) {
    return <></>;
  }
  return <RouterProvider router={route} />;
};
