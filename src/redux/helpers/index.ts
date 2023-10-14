import {
  Action,
  ActionReducerMapBuilder,
  createAction,
  createReducer,
} from '@reduxjs/toolkit';
import {PayloadAction, AnyAction} from '@reduxjs/toolkit';
import {IError} from '~constants/baseCallback';

/**
 * init action with createAction
 */

export function generateActions<
  Prepare = void,
  Successded = void,
  Failed = void,
>(prefix: string, action: string) {
  const actionName = `${prefix}/${action}`;
  const requestName = `${actionName}_REQUEST`;
  const successdedName = `${actionName}_SUCCESSDED`;
  const failedName = `${actionName}_FAILED`;
  const request = createAction<Prepare>(requestName);
  const succeeded = createAction<Successded>(successdedName);
  const failed = createAction<Failed>(failedName);
  return {
    request,
    succeeded,
    failed,
    actionName,
    failedName,
    successdedName,
    requestName,
  };
}

export function generateLocalAction<Prepare = void>(
  prefix: string,
  action: string,
) {
  const actionName = `${prefix}/${action}`;
  const request = createAction<Prepare>(actionName + '_LOCAL');
  return {
    request,
    actionName,
  };
}

/**
 * init reducer with generateReducer
 */

export interface IBaseReducerState {
  action?: string;
}

export const handleDefaultReducerBuilder = (
  state: IBaseReducerState,
  action: PayloadAction<any> | AnyAction,
) => {
  state.action = action.type;
};

export function generateReducer<State extends IBaseReducerState>(
  initialState: State,
  builderCallback: (builder: ActionReducerMapBuilder<any>) => void,
) {
  return createReducer(initialState, builder => {
    builderCallback(builder);
    builder.addDefaultCase(handleDefaultReducerBuilder);
  });
}

/**
 * check same action
 */
interface RejectedAction extends Action {
  error: Error;
}

export function isRejectedAction(action: PayloadAction<IError>) {
  return action.type.endsWith('Failed');
}
export function isSuccessdedAction(action: AnyAction) {
  return action.type.endsWith('Successded');
}
export function isRequestAction(action: AnyAction) {
  return action.type.endsWith('Request');
}
