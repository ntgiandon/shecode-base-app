export interface IUser {
  id: string;
  name: string;
  dob: string;
  userName: string;
  token?: string | undefined;
}

export interface IMSignInRequestPayload {
  userName: string;
  password: string;
}

export interface IMSignInResponsePayload extends IUser {
  isActive?: boolean;
}

export interface IMSignOutRequestPayload {
  id: string;
}
