import {AnyAction, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {
  isSuccessdedAction,
  isRejectedAction,
  isRequestAction,
} from '~redux/helpers';
import {AppModel} from '~models';
import {IError} from '~constants/baseCallback';
import {signOutSuccessded} from '~redux/modules/auth/slice';
import {
  IMAppStatePayload,
  IMDarkModePayload,
  IMNetInfoPayload,
} from '~models/app';

/**
 * define data type of a slice module Account
 */
export interface IAppState {
  error?: IError;
  loading?: boolean;
  ownLoading?: boolean;
  netInfo: IMNetInfoPayload;
  darkMode: IMDarkModePayload;
  appState: IMAppStatePayload;
}

/**
 *  initialize default value
 */
const initialState: IAppState = {
  error: undefined,
  loading: false,
  ownLoading: false,
  netInfo: {isLostConnection: true, isWifi: true},
  darkMode: {isDark: false},
  appState: {state: 'active'},
};

/**
 * create slice containing the actions and handle them
 */
const prefix = 'app';
export const appSlice = createSlice({
  name: prefix,
  initialState,
  reducers: {
    updateAppState: (
      state: IAppState,
      action: PayloadAction<AppModel.IMAppStatePayload>,
    ) => {
      state.appState = {
        state: action.payload.state,
      };
    },
    updateDarkMode: (
      state: IAppState,
      action: PayloadAction<AppModel.IMDarkModePayload>,
    ) => {
      state.darkMode = {
        isDark: action.payload.isDark,
      };
    },
    updateNetInfo: (
      state: IAppState,
      action: PayloadAction<AppModel.IMNetInfoPayload>,
    ) => {
      state.netInfo = {
        isLostConnection: action.payload.isLostConnection,
        isWifi: action.payload.isWifi,
      };
    },
    errorClear: (state, action: AnyAction) => {
      state.error = undefined;
      state.loading = false;
      state.ownLoading = false;
    },
    showOwnLoading: (state: IAppState) => {
      state.ownLoading = true;
    },
  },
  extraReducers: builder => {
    builder
      // .addCase(signOutSuccessded, () => initialState)
      .addMatcher(
        isRejectedAction,
        (state: IAppState, action: PayloadAction<IError>) => {
          state.error = action.payload;
          state.loading = false;
          state.ownLoading = false;
        },
      )
      .addMatcher(isRequestAction, (state, action: AnyAction) => {
        state.loading = true;
      })
      .addMatcher(isSuccessdedAction, (state, action: AnyAction) => {
        state.error = undefined;
        state.loading = false;
        state.ownLoading = false;
      })
      .addDefaultCase((state, action) => {
        //
      });
  },
});

/**
 * Action creators are generated for each case reducer function
 * */
export const {
  updateAppState,
  updateDarkMode,
  updateNetInfo,
  errorClear,
  showOwnLoading,
} = appSlice.actions;

export default appSlice.reducer;
