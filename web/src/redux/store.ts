import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./slices/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
