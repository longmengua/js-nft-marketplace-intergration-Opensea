import { AxiosResponse } from "axios";

export const convertObjToQueryStr = (params: Record<string, any>) => {
  if (Object.values(params).length === 0) return '';
  let str = '';
  Object.entries(params).map(([key, value]) => {
    if (key && value) {
      if (Array.isArray(value)) {
        const arrQueryStr = value.reduce((pre: string, cur: string, index) => {
          const isFirst = index === 1;
          pre += `${isFirst ? '' : '&'}${key}=${value}`;
          return pre;
        }, '');
        str += str === '' ? `?${arrQueryStr}` : `&${arrQueryStr}`;
      } else {
        str += str === '' ? `?${key}=${value}` : `&${key}=${value}`;
      }
    }
  }, '');
  return str;
};

export const axiosResponseHelper = <T>(response: AxiosResponse<T>): T | undefined => {
  const { data, status } = response;
  return status !== 200 ? undefined : data;
};

// for safety retrieving data without error.
export const arrayHelper = <T>(array: Array<T> | undefined, index?: number): T | undefined => {
  const l = (index ?? 0) + 1;
  return !array || array.length < l ? undefined : array[index ?? 0];
};