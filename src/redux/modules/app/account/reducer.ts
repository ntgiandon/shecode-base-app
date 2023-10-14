import {PayloadAction} from '@reduxjs/toolkit';
import {AppModel, AuthModel} from '~models';
import {generateReducer, IBaseReducerState} from '~redux/helpers';
import {AccountAction} from '~redux/modules/app/account';

interface IAaccountState extends AuthModel.IUser, IBaseReducerState {
  //
}

const initialState: IAaccountState = {
  userName: '',
  dob: '',
  id: '',
  name: '',
};

const AccountReducer = generateReducer(initialState, builder => {
  builder.addCase(
    AccountAction.updateUser.request,
    (
      state: IAaccountState,
      action: PayloadAction<AppModel.IMUpdateAccountRequestPayload>,
    ) => {
      //
      console.log('from AccountReducer state ====>', state);
      console.log('from AccountReducer action ====>', action);
    },
  );
  builder.addCase(
    AccountAction.updateUser.succeeded,
    (state: IAaccountState, action: PayloadAction<AuthModel.IUser>) => {
      //
      console.log('from AccountReducer state succeeded ====>', state);
      console.log('from AccountReducer action succeeded ====>', action);
    },
  );
});

export default AccountReducer;
