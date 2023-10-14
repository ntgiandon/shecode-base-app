import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {AuthModel, AppModel} from '~models';
import {IMSignOutRequestPayload} from '~models/auth';
import {IError} from '~constants/baseCallback';
import {updateUserSuccessded} from '~/redux/modules/app/account/slice';

/**
 * define data type of a slice module Account
 */
export interface IAuthState {
  isLoggedIn?: boolean;
  currentUser?: AuthModel.IUser;
}

/**
 *  initialize default value
 */
const initialState: IAuthState = {
  isLoggedIn: false,
  currentUser: undefined,
};

/**
 * create slice containing the actions and handle them
 */
const prefix = 'auth';
export const authSlice = createSlice({
  name: prefix,
  initialState,
  reducers: {
    signInRequest: (
      state: IAuthState,
      action: PayloadAction<AuthModel.IMSignInRequestPayload>,
    ) => {
      state.isLoggedIn = false;
    },
    signInSuccessded: (
      state: IAuthState,
      action: PayloadAction<AuthModel.IMSignInResponsePayload>,
    ) => {
      // console.log('from signInSuccessded ====>', action);
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
    signInFailed: (state: IAuthState, action: PayloadAction<IError>) => {
      console.log('from signInFailed ====>', action);
      state.isLoggedIn = false;
    },
    signOutRequest: (
      state: IAuthState,
      action: PayloadAction<IMSignOutRequestPayload>,
    ) => {},
    signOutSuccessded: (
      state: IAuthState,
      action: PayloadAction<AuthModel.IUser>,
    ) => initialState,
    signOutFailed: (state: IAuthState, action: PayloadAction<IError>) => {
      console.log('from signOutFailed ====>', action);
    },
  },
  extraReducers(builder) {
    builder.addCase(
      updateUserSuccessded,
      (
        state: IAuthState,
        action: PayloadAction<AppModel.IMUpdateAccountResponsePayload>,
      ) => {
        state.currentUser = action.payload.infoUser;
      },
    );
  },
});

/**
 * Action creators are generated for each case reducer function
 * */
export const {
  signInRequest,
  signInSuccessded,
  signInFailed,
  signOutRequest,
  signOutSuccessded,
  signOutFailed,
} = authSlice.actions;

export default authSlice.reducer;
