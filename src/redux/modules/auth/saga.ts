import {PayloadAction} from '@reduxjs/toolkit';
import {
  put,
  takeEvery,
  call,
  delay,
  fork,
  take,
  takeLatest,
  debounce,
} from 'redux-saga/effects';
import {AuthModel} from '~models';
import {
  signInFailed,
  signInRequest,
  signInSuccessded,
  signOutFailed,
  signOutRequest,
  signOutSuccessded,
} from '~redux/modules/auth/slice';

let localToken: string = '';

function* handleSignIn(
  action: PayloadAction<AuthModel.IMSignInRequestPayload>,
) {
  console.log('from handleSignIn ====>');
  try {
    yield delay(500);
    if (action.payload.userName === 'pvlinh02') {
      localToken = 'hihiToken';
      yield put(
        signInSuccessded({
          id: '1998',
          dob: '12/12/1998',
          name: 'linh pham',
          userName: 'pvlinh02',
          token: localToken,
        }),
      );
    } else {
      yield put(
        signInFailed({
          message: 'username/ password is wrong',
          code: -1,
        }),
      );
    }
  } catch (error) {
    yield put(
      signInFailed({
        message: 'from catch: signin error',
        code: -1,
      }),
    );
  }
}

function* handleSignOut(
  action: PayloadAction<AuthModel.IMSignOutRequestPayload>,
) {
  try {
    yield delay(500);
    if (action.payload.id === '1998') {
      localToken = '';
      yield put(
        signOutSuccessded({
          id: '1998',
          dob: '12/12/1998',
          name: 'linh pham',
          userName: 'pvlinh02',
          token: undefined,
        }),
      );
    } else {
      yield put(
        signOutFailed({
          message: 'signout loi roi',
          code: -1,
        }),
      );
    }
  } catch (error) {
    yield put(
      signOutFailed({
        message: 'signout loi roi',
        code: -1,
      }),
    );
  }
}

function* watchAuthFlow() {
  while (true) {
    // check condition before request signin
    if (!Boolean(localToken)) {
      const action: PayloadAction<AuthModel.IMSignInRequestPayload> =
        yield take(signInRequest);
      yield fork(handleSignIn, action);
    }

    // use the call function to wait to finish the signout request
    const action2: PayloadAction<AuthModel.IMSignOutRequestPayload> =
      yield take(signOutRequest);
    yield call(handleSignOut, action2);
  }
}

export function* authSaga() {
  // yield fork(watchAuthFlow);
  // yield debounce(1000,signInRequest, handleSignIn);
  yield takeEvery(signInRequest, handleSignIn);
  yield takeEvery(signOutRequest, handleSignOut);
}
