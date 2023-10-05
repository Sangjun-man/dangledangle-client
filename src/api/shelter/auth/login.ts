import api from '@/api/instance';
import { ApiErrorResponse } from '@/types/apiTypes';

export interface LoginPayload {
  email: string;
  password: string;
}

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  needToChangePassword: boolean;
};
export interface fowardPwdPayload {
  email: string;
  phoneNumber: string;
}

export type fowardPwdResponse = {
  shelterUserId: number;
  needToChangePassword: boolean;
};

export const loginShelter = async (data: LoginPayload) => {
  const response = await api
    .post(`auth/shelter/login`, {
      json: data
    })
    .then(res => res.json<LoginResponse>());

  return response;
};

export const isExist = async (value: string, type: string) => {
  const response = await api
    .get(`auth/shelter/exist?value=${value}&type=${type}`)
    .then(res => res.json<Promise<Record<'isExist', boolean>>>());

  return response;
};

export const fowardPwdLink = async (data: fowardPwdPayload) => {
  const response = await api
    .post(`auth/shelter/reset-password`, {
      json: data
    })
    .then(res => res.json<fowardPwdResponse>());

  return response;
};
