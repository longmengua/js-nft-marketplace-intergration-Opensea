import { AxiosResponse } from "axios";
import { BigNumber, ethers } from "ethers";

export class Utility {

  static sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  static formatUnits = (amount: BigNumber, decimals: number) => {
    return Number(ethers.utils.formatUnits(amount, decimals));
  }

  static convertObjToQueryStr = (params?: Record<string, any>) => {
    if (!params || Object.values(params).length === 0) return '';
    let str = '';
    Object.entries(params).map(([key, value]) => {
      if (key && value) {
        if (Array.isArray(value)) {
          const arrQueryStr = value.reduce((pre: string, cur: string, index) => {
            const isFirst = index === 0;
            pre += `${isFirst ? '' : '&'}${key}=${cur}`;
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

  static axiosResponseHelper = <T>(response: AxiosResponse<T>): T | undefined => {
    const { data, status } = response;
    return status !== 200 ? undefined : data;
  };

  // for safety retrieving data without error.
  static arrayHelper = <T>(array: Array<T> | undefined, index?: number): T | undefined => {
    const l = (index ?? 0) + 1;
    return !array || array.length < l ? undefined : array[index ?? 0];
  };

  static addressShortcut = (address?: string) => address ? `${address?.slice(0, 4)}...${address?.slice(address.length - 4, address.length)}` : '';
}