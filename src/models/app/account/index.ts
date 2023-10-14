import {AuthModel} from '~models';

export interface IMUpdateAccountRequestPayload {
  id: string;
  name: string;
}

export interface IMUpdateAccountResponsePayload {
  infoUser: AuthModel.IUser;
}
