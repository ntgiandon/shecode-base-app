import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {AppModel, AuthModel} from '~models';
import {IError} from '~constants/baseCallback';
import {signOutSuccessded} from '~redux/modules/auth/slice';

/**
 * define data type of a slice module Account
 */
export interface IAaccountState {
  name: string;
}

/**
 *  initialize default value
 */
const initialState: IAaccountState = {
  name: '',
};

/**
 * create slice containing the actions and handle them
 */
const prefix = 'account';
export const accountSlice = createSlice({
  name: prefix,
  initialState,
  reducers: {
    updateUserRequest: (
      state: IAaccountState,
      action: PayloadAction<AppModel.IMUpdateAccountRequestPayload>,
    ) => {},
    updateUserSuccessded: (
      state: IAaccountState,
      action: PayloadAction<AppModel.IMUpdateAccountResponsePayload>,
    ) => {
      state.name = action.payload.infoUser.name;
    },
    updateUserFailed: (
      state: IAaccountState,
      action: PayloadAction<IError>,
    ) => {},
  },
  extraReducers: builder => {
    builder.addCase(signOutSuccessded, () => initialState);
  },
});

/**
 * Action creators are generated for each case reducer function
 * */
export const {updateUserRequest, updateUserSuccessded, updateUserFailed} =
  accountSlice.actions;

export default accountSlice.reducer;
