import { BigNumber } from "ethers/lib/ethers";
import { Utility } from "../util";
import { MarketEnum, NftEventsEnum } from "./const";

interface Offer {
  itemType: number;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
}

interface Consideration {
  itemType: number;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
  recipient: string;
}

interface Parameters {
  offerer: string;
  offer: Offer[];
  consideration: Consideration[];
  startTime: string;
  endTime: string;
  orderType: number;
  zone: string;
  zoneHash: string;
  salt: string;
  conduitKey: string;
  totalOriginalConsiderationItems: number;
  counter: number;
}

interface ProtocolData {
  parameters: Parameters;
  signature: string;
}

interface Maker {
  user: number;
  profile_img_url: string;
  address: string;
  config: string;
}

interface Account {
  user?: any;
  profile_img_url: string;
  address: string;
  config: string;
}

interface MakerFee {
  account: Account;
  basis_points: string;
}

interface AssetContract {
  address: string;
  asset_contract_type: string;
  created_date: Date;
  name: string;
  nft_version: string;
  opensea_version?: any;
  owner: number;
  schema_name: string;
  symbol: string;
  total_supply?: any;
  description: string;
  external_link: string;
  image_url: string;
  default_to_fiat: boolean;
  dev_buyer_fee_basis_points: number;
  dev_seller_fee_basis_points: number;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: number;
  opensea_seller_fee_basis_points: number;
  buyer_fee_basis_points: number;
  seller_fee_basis_points: number;
  payout_address?: any;
}

interface DisplayData {
  card_display_style: string;
}

interface SellerFees {
}

interface OpenseaFees {
  [account: string]: number;
}

interface Fees {
  seller_fees: SellerFees;
  opensea_fees: OpenseaFees;
}

interface Collection {
  banner_image_url?: any;
  chat_url?: any;
  created_date: Date;
  default_to_fiat: boolean;
  description: string;
  dev_buyer_fee_basis_points: string;
  dev_seller_fee_basis_points: string;
  discord_url?: any;
  display_data: DisplayData;
  external_url: string;
  featured: boolean;
  featured_image_url: string;
  hidden: boolean;
  safelist_request_status: string;
  image_url: string;
  is_subject_to_whitelist: boolean;
  large_image_url: string;
  medium_username: string;
  name: string;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: string;
  opensea_seller_fee_basis_points: string;
  payout_address?: any;
  require_email: boolean;
  short_description?: any;
  slug: string;
  telegram_url?: any;
  twitter_username: string;
  instagram_username?: any;
  wiki_url?: any;
  is_nsfw: boolean;
  fees: Fees;
  is_rarity_enabled: boolean;
}

interface User {
  username: string;
}

interface Owner {
  user: User;
  profile_img_url: string;
  address: string;
  config: string;
}

export interface OpenseaAsset {
  id: number;
  num_sales: number;
  background_color?: any;
  image_url: string;
  image_preview_url: string;
  image_thumbnail_url: string;
  image_original_url: string;
  animation_url?: any;
  animation_original_url?: any;
  name: string;
  description: string;
  external_link: string;
  asset_contract: AssetContract;
  permalink: string;
  collection: Collection;
  decimals?: any;
  token_metadata: string;
  is_nsfw: boolean;
  owner: Owner;
  token_id: string;
}

interface AssetContract2 {
  address: string;
  asset_contract_type: string;
  created_date: Date;
  name: string;
  nft_version: string;
  opensea_version?: any;
  owner: number;
  schema_name: string;
  symbol: string;
  total_supply?: any;
  description: string;
  external_link: string;
  image_url: string;
  default_to_fiat: boolean;
  dev_buyer_fee_basis_points: number;
  dev_seller_fee_basis_points: number;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: number;
  opensea_seller_fee_basis_points: number;
  buyer_fee_basis_points: number;
  seller_fee_basis_points: number;
  payout_address?: any;
}

interface MakerAssetBundle {
  assets: OpenseaAsset[];
  maker?: any;
  slug?: any;
  name?: any;
  description?: any;
  external_link?: any;
  asset_contract: AssetContract2;
  permalink: string;
  seaport_sell_orders?: any;
}

interface AssetContract3 {
  address: string;
  asset_contract_type: string;
  created_date: Date;
  name: string;
  nft_version?: any;
  opensea_version?: any;
  owner?: any;
  schema_name: string;
  symbol: string;
  total_supply?: any;
  description: string;
  external_link?: any;
  image_url?: any;
  default_to_fiat: boolean;
  dev_buyer_fee_basis_points: number;
  dev_seller_fee_basis_points: number;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: number;
  opensea_seller_fee_basis_points: number;
  buyer_fee_basis_points: number;
  seller_fee_basis_points: number;
  payout_address?: any;
}

interface DisplayData2 {
}

interface SellerFees2 {
}

interface OpenseaFees2 {
  [account:string]: number;
}

interface Fees2 {
  seller_fees: SellerFees2;
  opensea_fees: OpenseaFees2;
}

interface Collection2 {
  banner_image_url?: any;
  chat_url?: any;
  created_date: Date;
  default_to_fiat: boolean;
  description: string;
  dev_buyer_fee_basis_points: string;
  dev_seller_fee_basis_points: string;
  discord_url?: any;
  display_data: DisplayData2;
  external_url?: any;
  featured: boolean;
  featured_image_url?: any;
  hidden: boolean;
  safelist_request_status: string;
  image_url?: any;
  is_subject_to_whitelist: boolean;
  large_image_url?: any;
  medium_username?: any;
  name: string;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: string;
  opensea_seller_fee_basis_points: string;
  payout_address?: any;
  require_email: boolean;
  short_description?: any;
  slug: string;
  telegram_url?: any;
  twitter_username?: any;
  instagram_username?: any;
  wiki_url?: any;
  is_nsfw: boolean;
  fees: Fees2;
  is_rarity_enabled: boolean;
}

interface User2 {
  username: string;
}

interface Owner2 {
  user: User2;
  profile_img_url: string;
  address: string;
  config: string;
}

interface Asset2 {
  id: number;
  num_sales: number;
  background_color?: any;
  image_url: string;
  image_preview_url: string;
  image_thumbnail_url: string;
  image_original_url: string;
  animation_url?: any;
  animation_original_url?: any;
  name: string;
  description: string;
  external_link?: any;
  asset_contract: AssetContract3;
  permalink: string;
  collection: Collection2;
  decimals: number;
  token_metadata?: any;
  is_nsfw: boolean;
  owner: Owner2;
  token_id: string;
}

interface AssetContract4 {
  address: string;
  asset_contract_type: string;
  created_date: Date;
  name: string;
  nft_version?: any;
  opensea_version?: any;
  owner?: any;
  schema_name: string;
  symbol: string;
  total_supply?: any;
  description: string;
  external_link?: any;
  image_url?: any;
  default_to_fiat: boolean;
  dev_buyer_fee_basis_points: number;
  dev_seller_fee_basis_points: number;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: number;
  opensea_seller_fee_basis_points: number;
  buyer_fee_basis_points: number;
  seller_fee_basis_points: number;
  payout_address?: any;
}

interface TakerAssetBundle {
  assets: Asset2[];
  maker?: any;
  slug?: any;
  name: string;
  description?: any;
  external_link?: any;
  asset_contract: AssetContract4;
  permalink: string;
  seaport_sell_orders?: any;
}

export interface OpenseaNftOrder {
  created_date: Date;
  closing_date: Date;
  listing_time: number;
  expiration_time: number;
  order_hash: string;
  protocol_data: ProtocolData;
  protocol_address: string;
  maker: Maker;
  taker?: any;
  current_price: string;
  maker_fees: MakerFee[];
  taker_fees: any[];
  side: string;
  order_type: string;
  cancelled: boolean;
  finalized: boolean;
  marked_invalid: boolean;
  client_signature: string;
  relay_id: string;
  criteria_proof?: any;
  maker_asset_bundle: MakerAssetBundle;
  taker_asset_bundle: TakerAssetBundle;
}

export interface OpenseaListingRes {
  next?: string;
  previous?: string;
  orders: OpenseaNftOrder[];
}

export class NFTOpenseaEventRes {
  asset?: {
    id: number;
    num_sales: number;
    background_color?: any;
    image_url: string;
    image_preview_url: string;
    image_thumbnail_url: string;
    image_original_url: string;
    animation_url?: any;
    animation_original_url?: any;
    name: string;
    description: string;
    external_link: string;
    asset_contract: {
      address: string;
      asset_contract_type: string;
      created_date: Date;
      name: string;
      nft_version: string;
      opensea_version?: any;
      owner: number;
      schema_name: string;
      symbol: string;
      total_supply?: any;
      description: string;
      external_link: string;
      image_url: string;
      default_to_fiat: boolean;
      dev_buyer_fee_basis_points: number;
      dev_seller_fee_basis_points: number;
      only_proxied_transfers: boolean;
      opensea_buyer_fee_basis_points: number;
      opensea_seller_fee_basis_points: number;
      buyer_fee_basis_points: number;
      seller_fee_basis_points: number;
      payout_address?: any;
    };
    permalink: string;
    collection: {
      banner_image_url: string;
      chat_url?: any;
      created_date: Date;
      default_to_fiat: boolean;
      description: string;
      dev_buyer_fee_basis_points: string;
      dev_seller_fee_basis_points: string;
      discord_url: string;
      display_data: {
        card_display_style: string;
      };
      external_url: string;
      featured: boolean;
      featured_image_url: string;
      hidden: boolean;
      safelist_request_status: string;
      image_url: string;
      is_subject_to_whitelist: boolean;
      large_image_url: string;
      medium_username: string;
      name: string;
      only_proxied_transfers: boolean;
      opensea_buyer_fee_basis_points: string;
      opensea_seller_fee_basis_points: string;
      payout_address?: any;
      require_email: boolean;
      short_description?: any;
      slug: string;
      telegram_url?: any;
      twitter_username: string;
      instagram_username?: any;
      wiki_url?: any;
      is_nsfw: boolean;
      fees: {
        seller_fees: Record<string, number>;
        opensea_fees: Record<string, number>;
      };
      is_rarity_enabled: boolean;
    };
    decimals?: any;
    token_metadata?: any;
    is_nsfw: boolean;
    owner: {
      user: {
        username: string;
      };
      profile_img_url: string;
      address: string;
      config: string;
    };
    token_id: string;
  };
  payment_token?: {
    symbol: string;
    address: string;
    image_url: string;
    name: string;
    decimals: number;
    eth_price: string;
    usd_price: string;
  };
  transaction?: {
    block_hash: string;
    block_number: string;
    from_account: {
      user: {
        username: string;
      };
      profile_img_url: string;
      address: string;
      config: string;
    };
    id: number;
    timestamp: Date;
    to_account: {
      user: {
        username: string;
      };
      profile_img_url: string;
      address: string;
      config: string;
    };
    transaction_hash: string;
    transaction_index: string;
  };
  from_account?: {
    user: {
      username: string;
    };
    profile_img_url: string;
    address: string;
    config: string;
  };
  to_account?: {
    user: {
      username: string;
    };
    profile_img_url: string;
    address: string;
    config: string;
  };
  id?: number;
  created_date?: string;
  quantity?: string;
  collection_slug?: string;
  duration?: string;
  is_private?: boolean;
  listing_time?: string;
  starting_price?: string;
  ending_price?: string;
  total_price?: string;
  event_type?: string;

  static getUsdAmountOfEvent(res: NFTOpenseaEventRes) {
    let amountUsd;
    if (!res.payment_token) return null;
    switch (res.event_type) {
      case 'created':
        amountUsd =
          parseFloat(res.payment_token.usd_price) *
          Utility.formatUnits(BigNumber.from(res.starting_price), res.payment_token.decimals);
        break;
      case 'cancelled':
        amountUsd = 0;
        break;
      case 'successful':
        amountUsd =
          parseFloat(res.payment_token.usd_price) *
          Utility.formatUnits(BigNumber.from(res.total_price), res.payment_token.decimals);
        break;
      default:
        return null;
    }
    return amountUsd;
  }

  static getNFTEvent(eventType: string) {
    let ret;
    switch (eventType) {
      case 'created':
        ret = NftEventsEnum.LIST;
        break;
      case 'cancelled':
        ret = NftEventsEnum.DELIST;
        break;
      case 'successful':
        ret = NftEventsEnum.BUY_NOW;
        break;
      default:
        return null;
    }
    return ret;
  }

  static convertToHistory(tokenAddress: string, res: NFTOpenseaEventRes) {
    const amountUsd = this.getUsdAmountOfEvent(res);
    if (amountUsd == null) return null;
    if (!res.event_type || !res.transaction || !res.asset || !res.created_date) return null;

    const eventType = this.getNFTEvent(res.event_type);
    if (!eventType) return null;

    return {
      id: res.id,
      nftEventType: eventType,
      signature: res.transaction?.transaction_hash,
      amountUsd: amountUsd,
      senderAddress: res.transaction?.from_account.address ?? res.from_account?.address,
      recipientAddress: res.event_type === 'successful' ? res.transaction?.to_account.address : '',
      block_time: Math.floor(new Date(res.transaction ? res.transaction?.timestamp : res.created_date).getTime() / 1000),
      marketplaceId: MarketEnum.OPEN_SEA,
      tokenAddress: tokenAddress,
      symbol: res.asset.asset_contract?.symbol ?? '',
      name: res.asset.name ?? '',
      image: res.asset.image_url,
    };
  }
}