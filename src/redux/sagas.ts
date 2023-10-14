import {all} from 'redux-saga/effects';
import {accountSaga} from '~redux/modules/app/account/saga';
import {authSaga} from '~redux/modules/auth/saga';
import {appInfoSaga} from '~redux/modules/app/appInfo/saga';

export default function* rootSaga() {
  yield all([
    accountSaga(), //app saga
    appInfoSaga(),
    authSaga(), //auth saga
  ]);
}
