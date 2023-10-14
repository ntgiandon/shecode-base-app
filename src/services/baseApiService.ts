import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {getBaseUrl, getVersionName} from '~utils';
import store from '~redux/store';
import {IBaseResponse} from '~constants/baseResponse';
import {IApiResponse} from '~constants/baseCallback';

const axiosConfig: AxiosRequestConfig = {
  timeout: 10000,
  headers: {
    'Content-type': 'application/json',
    'accept-language': 'en-Us',
    accept: '*/*',
  },
};

export abstract class BaseApiService {
  private instance: AxiosInstance;
  private protectedApi: boolean;
  private controller = new AbortController();

  constructor(protectedApi = true) {
    this.instance = axios.create(axiosConfig);
    this.protectedApi = protectedApi;

    // handle request
    this.instance.interceptors.request.use(
      config => {
        if (
          this.protectedApi &&
          !store.getState().AuthSlice.currentUser?.token
        ) {
          this.controller.abort();
          const CancelToken = axios.CancelToken;
          return {
            ...config,
            cancelToken: new CancelToken(cancel => cancel('Protected API')),
          };
        }
        config.headers!['x-app-version'] = getVersionName();
        config.headers!['Authorization'] = `Bearer ${
          store.getState().AuthSlice.currentUser?.token
        }`;
        config.baseURL = getBaseUrl();

        return config;
      },
      async error => {
        return Promise.reject(error);
      },
    );

    // handle response
    this.instance.interceptors.response.use(
      async response => {
        return response;
      },
      async error => {
        return Promise.reject(error);
      },
    );
  }

  public async get<T extends IBaseResponse>(
    url: string,
    config?: AxiosRequestConfig,
  ) {
    try {
      const response: AxiosResponse<T> = await this.instance.get<T>(
        `${url}`,
        config,
      );
      return this._handleResponse<T>(response);
    } catch (error) {
      return this._handleError<T>();
    }
  }
  public async post<P, T extends IBaseResponse>(
    url: string,
    data?: P,
    config?: AxiosRequestConfig,
  ) {
    try {
      const response: AxiosResponse<T> = await this.instance.post<T>(
        `${url}`,
        data,
        config,
      );
      return this._handleResponse<T>(response);
    } catch (error) {
      return this._handleError<T>(`${error}`);
    }
  }
  public async put<P, T extends IBaseResponse>(
    url: string,
    data?: P,
    config?: AxiosRequestConfig,
  ) {
    try {
      const response: AxiosResponse<T> = await this.instance.put<T>(
        `${url}`,
        data,
        config,
      );
      return this._handleResponse<T>(response);
    } catch (error) {
      console.log(error);
    }
  }
  public async delete<T extends IBaseResponse>(
    url: string,
    config?: AxiosRequestConfig,
  ) {
    try {
      const response: AxiosResponse<T> = await this.instance.get<T>(
        `${url}`,
        config,
      );
      return this._handleResponse<T>(response);
    } catch (error) {
      return this._handleError<T>();
    }
  }

  private _convertFormData<T>(obj: T) {
    const formData = new FormData();
    for (const key in obj) {
      formData.append(key, obj[key]);
    }
    return formData;
  }

  public async postForm<P, T extends IBaseResponse>(
    url: string,
    data: P,
    config?: AxiosRequestConfig,
  ) {
    try {
      const formConfig: AxiosRequestConfig = {
        ...config,
        headers: {
          ...config?.headers,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      const formData: FormData = this._convertFormData<P>(data);
      const response: AxiosResponse<T> = await this.instance.post<T>(
        `${url}`,
        formData,
        formConfig,
      );
      return this._handleResponse<T>(response);
    } catch (error) {
      return this._handleError<T>();
    }
  }

  private _handleResponse<T extends IBaseResponse>(
    response: AxiosResponse<T>,
  ): IApiResponse<T> {
    if (response.status === 200) {
      const res: T = response.data as T;
      return {
        data: res,
        header: response.headers,
        isSuccess: true,
      };
    } else {
      return {
        isSuccess: false,
        errors: {
          code: parseInt(response.data.code),
          message: response.data.message,
        },
      };
    }
  }

  private _handleError<T extends IBaseResponse>(
    error?: string,
  ): IApiResponse<T> {
    return {
      isSuccess: false,
      errors: {
        code: -1,
        message: error ?? 'Network Error',
      },
    };
  }
}
