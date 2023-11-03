import Service from '../../API/service';
import { AppDispatch } from '../store';
import { Actions as AuthActions } from './AuthSlice';

export const Auth = (code: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(AuthActions.fetching());
    const response = await Service.auth(code);
    dispatch(AuthActions.fetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(AuthActions.fetchingError(e.response?.data?.message || 'Error fetching user'));
  }
};
