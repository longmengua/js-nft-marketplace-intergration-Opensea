export const openseaApiKey = '5510174287c4425b96b6eedc81504084';
export const openseaApiBaseUrl = 'https://api.opensea.io/api';

export const SUCCESS = 200;
export const TOO_MANY_REQUEST = 429;

export enum MarketEnum {
  OPEN_SEA,
}

export enum NftEventsEnum {
  LIST = 'list',
  DELIST = 'delist',
  BID = 'bid',
  BUY_NOW = 'buyNow',
  CANCEL_BID = 'cancelBid',
  ACCEPT_BID = 'acceptBid',
  MAKE_OFFER = 'makeOffer',
  CANCEL_OFFER = 'cancelOffer',
  ACCEPT_OFFER = 'acceptOffer',
  DECLINE_OFFER = 'declineOffer',
  PRIVATE_MINT = 'whitelistMint',
  PUBLIC_MINT = 'publicMint',
  LINK = 'link',
  UNLINK = 'unlink',
}