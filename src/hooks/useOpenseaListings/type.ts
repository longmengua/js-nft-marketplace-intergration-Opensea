export interface Offer {
  itemType: number;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
}

export interface Consideration {
  itemType: number;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
  recipient: string;
}

export interface Parameters {
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

export interface ProtocolData {
  parameters: Parameters;
  signature: string;
}

export interface Maker {
  user: number;
  profile_img_url: string;
  address: string;
  config: string;
}

export interface Account {
  user?: any;
  profile_img_url: string;
  address: string;
  config: string;
}

export interface MakerFee {
  account: Account;
  basis_points: string;
}

export interface AssetContract {
  address: string;
  asset_contract_type: string;
  created_date: Date;
  name: string;
  nft_version?: any;
  opensea_version: string;
  owner: number;
  schema_name: string;
  symbol: string;
  total_supply?: any;
  description?: any;
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

export interface DisplayData {
  card_display_style: string;
}

export interface SellerFees {
}

export interface OpenseaFees {
  0x0000a26b00c1f0df003000390027140000faa719: number;
}

export interface Fees {
  seller_fees: SellerFees;
  opensea_fees: OpenseaFees;
}

export interface Collection {
  banner_image_url?: any;
  chat_url?: any;
  created_date: Date;
  default_to_fiat: boolean;
  description: string;
  dev_buyer_fee_basis_points: string;
  dev_seller_fee_basis_points: string;
  discord_url?: any;
  display_data: DisplayData;
  external_url?: any;
  featured: boolean;
  featured_image_url?: any;
  hidden: boolean;
  safelist_request_status: string;
  image_url: string;
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
  fees: Fees;
  is_rarity_enabled: boolean;
}

export interface Owner {
  user?: any;
  profile_img_url: string;
  address: string;
  config: string;
}

export interface Asset {
  id: number;
  num_sales: number;
  background_color?: any;
  image_url: string;
  image_preview_url: string;
  image_thumbnail_url: string;
  image_original_url?: any;
  animation_url?: any;
  animation_original_url?: any;
  name: string;
  description?: any;
  external_link?: any;
  asset_contract: AssetContract;
  permalink: string;
  collection: Collection;
  decimals?: any;
  token_metadata?: any;
  is_nsfw: boolean;
  owner: Owner;
  token_id: string;
}

export interface AssetContract2 {
  address: string;
  asset_contract_type: string;
  created_date: Date;
  name: string;
  nft_version?: any;
  opensea_version: string;
  owner: number;
  schema_name: string;
  symbol: string;
  total_supply?: any;
  description?: any;
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

export interface MakerAssetBundle {
  assets: Asset[];
  maker?: any;
  slug?: any;
  name?: any;
  description?: any;
  external_link?: any;
  asset_contract: AssetContract2;
  permalink: string;
  seaport_sell_orders?: any;
}

export interface AssetContract3 {
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
  description?: any;
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

export interface DisplayData2 {
  card_display_style: string;
  images: any[];
}

export interface SellerFees2 {
}

export interface OpenseaFees2 {
  0x0000a26b00c1f0df003000390027140000faa719: number;
}

export interface Fees2 {
  seller_fees: SellerFees2;
  opensea_fees: OpenseaFees2;
}

export interface Collection2 {
  banner_image_url?: any;
  chat_url?: any;
  created_date: Date;
  default_to_fiat: boolean;
  description?: any;
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

export interface Owner2 {
  user?: any;
  profile_img_url: string;
  address: string;
  config: string;
}

export interface Asset2 {
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
  token_metadata: string;
  is_nsfw: boolean;
  owner: Owner2;
  token_id: string;
}

export interface AssetContract4 {
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
  description?: any;
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

export interface TakerAssetBundle {
  assets: Asset2[];
  maker?: any;
  slug?: any;
  name?: any;
  description?: any;
  external_link?: any;
  asset_contract: AssetContract4;
  permalink: string;
  seaport_sell_orders?: any;
}

export interface Order {
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

export interface OpenseaListingsRes {
  next?: any;
  previous?: any;
  orders?: Order[];
}

export interface OpenseaListingsParam {
  nft_token_address: string;
  nft_token_id: string;
}


export interface AssetDetail {
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
  seaport_sell_orders?: any;
  creator: {
    user: {
      username: string;
    };
    profile_img_url: string;
    address: string;
    config: string;
  };
  traits: Array<{
    trait_type: string;
    value: number;
    display_type?: any;
    max_value?: any;
    trait_count: number;
    order?: any;
  }>;
  last_sale?: {
    asset: {
      decimals?: any;
      token_id: string;
    };
    asset_bundle?: any;
    event_type: string;
    event_timestamp: Date;
    auction_type?: any;
    total_price: string;
    payment_token: {
      symbol: string;
      address: string;
      image_url: string;
      name: string;
      decimals: number;
      eth_price: string;
      usd_price: string;
    };
    transaction: {
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
    created_date: Date;
    quantity: string;
  };
  top_bid?: any;
  listing_date?: any;
  is_presale: boolean;
  transfer_fee?: any;
  transfer_fee_payment_token?: any;
  supports_wyvern: boolean;
  rarity_data?: any;
  token_id: string;
}
export interface OpenseaAssetRes {
  next?: any;
  previous?: any;
  assets?: AssetDetail[];
}
