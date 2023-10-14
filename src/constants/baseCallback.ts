import {AxiosResponseHeaders, RawAxiosResponseHeaders} from 'axios';

export interface IError {
  message: string;
  code: number;
}

export interface IApiError {
  message: string;
  code: number;
}

export interface ISuccess<T> {
  data?: T;
  message?: string;
}

export interface IActionCallback<T> {
  onSuccess?: (response?: ISuccess<T>) => void;
  onFail?: (error?: IError) => void;
}

export interface IApiResponse<T> {
  isSuccess: boolean;
  data?: T;
  header?: RawAxiosResponseHeaders | AxiosResponseHeaders;
  errors?: IApiError;
}
