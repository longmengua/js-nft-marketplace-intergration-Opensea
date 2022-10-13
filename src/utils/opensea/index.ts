import axios from 'axios';
import { OpenseaListingsRes } from '../../hooks/useOpenseaListings/type';
import { convertObjToQueryStr } from '../util';

export const opensea_api_domain = 'https://api.opensea.io/api';
export const opensea_test_api_domain = 'https://testnets-api.opensea.io/api';

export class OpenseaService {
  static specialCases: Record<string, string> = {
    seoul_stars: 'seoul-stars',
  };
  static specialCaseKeys: Array<string> = Object.keys(this.specialCases);
  static cursorCache: Record<string, Record<number, string>> = {};
  static responseHelper = async (url: string) => {
    const headers = {
      'X-API-KEY': '',
    };
    const res = await axios
      .get(url, {
        headers,
      })
      .catch((e) => {
        throw e;
      });
    if (res.status !== 200) {
      throw res.statusText;
    }
    return res.data;
  };

  // use slug as key of map
  static initCursorBySlug = (slug: string) => {
    if (!this.cursorCache[slug]) this.cursorCache[slug] = {};
  };

  // cache the cursor for speeding up query
  // i.e. previous = null, next = cj0xJi1waz03Nzk3ODI=, limit = 20
  // then offset will be 20, value will be cj0xJi1waz03Nzk3ODI=.
  static addCursorBySlugAndOffset = (slug: string, offset: number, cursor: string) => {
    if (cursor && this.cursorCache[slug]) this.cursorCache[slug][offset] = cursor;
  };

  // get next cursor from cache by slug and index
  static getNextCursorBySlug = (slug: string, offset: number): string | undefined => {
    return this.cursorCache[slug] ? this.cursorCache[slug][offset] : undefined;
  };

  static getStats = async (p: { collectionName: string; offset?: number; limit?: number }) =>
    await this.responseHelper(`${opensea_api_domain}/v1/collection/${p?.collectionName}/stats`);

  static getStatByCollectionSlug = async (slug: string, offset?: number, limit?: number): Promise<any> => {
    const collectionName = this.specialCaseKeys.includes(slug) ? this.specialCases[slug] : slug;
    return await this.getStats({
      collectionName,
      offset,
      limit,
    });
  };

  static getNFTAssetsByCollectionSlug = async (p: {
    collection_slug: string;
    order_direction?: any;
    limit?: number;
    cursor?: string;
  }): Promise<{
    next: string | null;
    previous: string | null;
    assets: Array<any>;
  }> => {
    const { order_direction = 'desc' } = p;
    if (!p?.collection_slug) throw new Error('Missing collection slug');
    const res: {
      next: string | null;
      previous: string | null;
      assets: Array<any>;
    } = await this.responseHelper(`${opensea_api_domain}/v1/assets${convertObjToQueryStr({ ...p, order_direction })}`);
    return res;
  };

  static getNFTAssetDetail = async (p: {
    asset_contract_address: string;
    token_ids: Array<string> | string;
  }, isTestMode: boolean = false): Promise<any> => {
    if (!p?.token_ids || !p?.asset_contract_address) throw new Error('Invalidated input');
    return await this.responseHelper(
      `${isTestMode ? opensea_test_api_domain : opensea_api_domain}/v1/assets${convertObjToQueryStr(p)}`,
    );
  };

  static getNFTListing = async (p: {
    asset_contract_address: string;
    token_ids: Array<string> | string;
    order_direction?: 'asc' | 'desc';
  }, isTestMode: boolean = false): Promise<OpenseaListingsRes> => {
    if (!p?.token_ids || !p?.asset_contract_address) throw new Error('Invalidated input');
    const url = `${isTestMode ? opensea_test_api_domain : opensea_api_domain}/v2/orders/${isTestMode ? 'goerli' : 'ethereum'}/seaport/listings${convertObjToQueryStr(p)}`;
    return await this.responseHelper(url);
  };

  static getNFTOffer = async (p: { asset_contract_address: string; token_ids: Array<string> }): Promise<any> => {
    if (!p?.token_ids || !p?.asset_contract_address) throw new Error('Invalidated input');
    const res: any = await this.responseHelper(`${opensea_api_domain}/v2/orders/ethereum/seaport/offers`);
    return res;
  };

  static createNFTListing = async (p: { asset_contract_address: string; token_ids: Array<string> }): Promise<any> => {
    if (!p?.token_ids || !p?.asset_contract_address) throw new Error('Invalidated input');
    return await this.responseHelper(`${opensea_api_domain}/v2/orders/ethereum/seaport/lstings`);
  };

  static createNFTOffer = async (p: { asset_contract_address: string; token_ids: Array<string> }): Promise<any> => {
    if (!p?.token_ids || !p?.asset_contract_address) throw new Error('Invalidated input');
    return await this.responseHelper(`${opensea_api_domain}/v2/orders/ethereum/seaport/offers`);
  };
}
