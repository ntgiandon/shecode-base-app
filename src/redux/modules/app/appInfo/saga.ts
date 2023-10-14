// import {PayloadAction} from '@reduxjs/toolkit';
// import {put, takeEvery, call, delay} from 'redux-saga/effects';
// import {AppModel} from '~models';
// import {
//   updateUserRequest,
//   updateUserSuccessded,
//   updateUserFailed,
// } from '~redux/modules/app/account/slice';

// function* handleUpdateUser(
//   action: PayloadAction<AppModel.IMUpdateAccountRequestPayload>,
// ) {
//   try {
//     yield delay(1000);
//     if (action.payload.id === '1998') {
//       yield put(
//         updateUserSuccessded({
//           infoUser: {
//             id: '1998',
//             dob: '12/12/1998',
//             name: action.payload.name,
//             userName: 'pvlinh02',
//           },
//         }),
//       );
//     } else {
//       yield put(
//         updateUserFailed({
//           message: 'update user loi roi',
//           code: -1,
//           data: action.payload,
//         }),
//       );
//     }
//   } catch (error) {
//     yield put(
//       updateUserFailed({
//         message: 'update user loi roi',
//         code: -1,
//         data: action.payload,
//       }),
//     );
//   }
// }

export function* appInfoSaga() {
  // yield takeEvery(updateUserRequest, handleUpdateUser);
}
