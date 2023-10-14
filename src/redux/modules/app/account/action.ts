import {AppModel, AuthModel} from '~models';
import {generateActions} from '~redux/helpers';

const prefix = 'account';
export const updateUser = generateActions<
  AppModel.IMUpdateAccountRequestPayload,
  AuthModel.IUser
>(prefix, 'updateUserRequest');
