import axios from 'axios';
import { Utility } from '../util';
import { openseaApiKey, SUCCESS, TOO_MANY_REQUEST } from './const';
import { OpenseaAssetRes } from './type/openseaAssetRes';

export const opensea_api_domain = 'https://api.opensea.io/api';
export const opensea_test_api_domain = 'https://testnets-api.opensea.io/api';

export class OpenseaService {
  static specialCases: Record<string, string> = {
    seoul_stars: 'seoul-stars',
  };
  static specialCaseKeys: Array<string> = Object.keys(this.specialCases);
  static cursorCache: Record<string, Record<number, string>> = {};
  
  static responseHelper = async <T = any>(url: string, params?: any): Promise<T | undefined> => {
    let toReturn: T | undefined = undefined;
    let isSuccessful = false;
    const headers = {
      'X-API-KEY': `${openseaApiKey}`,
    };
    while (!isSuccessful) {
      const res = await axios
        .get(url, {
          headers,
          params,
        })
        .catch((e) => e?.response);
      const status = res?.status;
      if (status === SUCCESS) {
        isSuccessful = true;
        toReturn = res?.data;
        break;
      }
      if (status !== SUCCESS && status !== TOO_MANY_REQUEST) {
        throw new Error(`Failed on opensea API.(url:${url})(params:${params})`);
      }
      if (status === TOO_MANY_REQUEST) {
        await Utility.sleep(1000);
      }
    }
    return toReturn;
  };

  static _getDomain = (isTestMode: boolean) => isTestMode ? opensea_test_api_domain : opensea_api_domain;
  static _getNetwork = (isTestMode: boolean) => isTestMode ? 'goerli' : 'ethereum';

  // use slug as key of map
  static _initCursor = (slug: string) => {
    if (!this.cursorCache[slug]) this.cursorCache[slug] = {};
  };

  // cache the cursor for speeding up query
  // i.e. previous = null, next = cj0xJi1waz03Nzk3ODI=, limit = 20
  // then offset will be 20, value will be cj0xJi1waz03Nzk3ODI=.
  static _addCursor = (slug: string, offset: number, cursor: string) => {
    if (cursor && this.cursorCache[slug]) this.cursorCache[slug][offset] = cursor;
  };

  // get next cursor from cache by slug and index
  static _getNextCursor = (slug: string, offset: number): string | undefined => {
    return this.cursorCache[slug] ? this.cursorCache[slug][offset] : undefined;
  };

  static getStatByCollectionSlug = async (p: {slug: string}, isTestMode: boolean = false): Promise<any> => {
    const collectionName = this.specialCaseKeys.includes(p.slug) ? this.specialCases[p.slug] : p.slug;
    return await this.responseHelper(`${opensea_api_domain}/v1/collection/${collectionName}/stats`);
  };

  static getNftAssetsByCollectionSlug = async (p: {
    collection_slug: string;
    order_direction?: any;
    limit?: number;
    cursor?: string;
  }, isTestMode: boolean = false): Promise<{
    next: string | null;
    previous: string | null;
    assets: Array<any>;
  } | undefined> => {
    const { order_direction = 'desc' } = p;
    if (!p?.collection_slug) throw new Error('Missing collection slug');
    return await this.responseHelper(`${this._getDomain(isTestMode)}/v1/assets${Utility.convertObjToQueryStr({ ...p, order_direction })}`);
  };

  static getNftAssetByAddressAndId = async (p: {
    asset_contract_address: string;
    token_ids: Array<string> | string;
  }, isTestMode: boolean = false): Promise<OpenseaAssetRes | undefined> => {
    if (!p?.token_ids || !p?.asset_contract_address) throw new Error('Invalidated input');
    return await this.responseHelper(
      `${this._getDomain(isTestMode)}/v1/assets${Utility.convertObjToQueryStr(p)}`,
    );
  };

  // This is used to fetch the set of active listings on a given NFT for the Seaport contract.
  static getNftListing = async (p?: {
    asset_contract_address?: string; // Address of the contract for an NFT
    token_ids?: Array<string> | string;
    limit?: number; // Number of listings to retrieve
    maker?: string; // Filter by the order makers wallet address
    taker?: string; // Filter by the order takers wallet address
    order_by?: 'created_date' | 'eth_price'; // eth_price is only supported while asset_contract_address and token_id are populated.
    order_direction?: 'asc' | 'desc'; // ascending or descending sort.
    listed_after?: string; // Only show orders listed after this timestamp. Seconds since the Unix epoch.
    listed_before?: string; // Only show orders listed before this timestamp. Seconds since the Unix epoch.
  }, isTestMode: boolean = false): Promise<any> => {
    const url = `${this._getDomain(isTestMode)}/v2/orders/${this._getNetwork(isTestMode)}/seaport/listings${Utility.convertObjToQueryStr(p)}`;
    return await this.responseHelper(url);
  };

  // This is used to fetch the set of active offers on a given NFT for the Seaport contract.
  static getOffersForNft = async (p: { 
    asset_contract_address?: string; // Address of the contract for an NFT
    token_ids?: Array<string> | string;
    limit?: number; // Number of listings to retrieve
    maker?: string; // Filter by the order makers wallet address
    taker?: string; // Filter by the order takers wallet address
    order_by?: 'created_date' | 'eth_price'; // eth_price is only supported while asset_contract_address and token_id are populated.
    order_direction?: 'asc' | 'desc'; // ascending or descending sort.
    listed_after?: string; // Only show orders listed after this timestamp. Seconds since the Unix epoch.
    listed_before?: string; // Only show orders listed before this timestamp. Seconds since the Unix epoch.
  }, isTestMode: boolean = false): Promise<any> => {
    const url = `${this._getDomain(isTestMode)}/v2/orders/${this._getNetwork(isTestMode)}/seaport/offers`;
    return await this.responseHelper(url);
  };
}
