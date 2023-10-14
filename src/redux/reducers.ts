import {combineReducers} from 'redux';
import AccountSlice from '~redux/modules/app/account/slice';
import AppSlice from '~redux/modules/app/appInfo/slice';
import AuthSlice from '~redux/modules/auth/slice';

const rootReducer = combineReducers({
  AccountSlice, //app
  AppSlice,
  AuthSlice, //auth
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
