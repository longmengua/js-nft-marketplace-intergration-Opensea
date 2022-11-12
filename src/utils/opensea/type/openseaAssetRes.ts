interface AssetContract {
  address: string;
  asset_contract_type: string;
  created_date: string;
  name: string;
  nft_version?: any;
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
  payout_address: string;
}

interface DisplayData {
  card_display_style: string;
}

interface SellerFees {
  0x7b640407513bc16167ef3450fd6339803982e976: number;
}

interface OpenseaFees {
  0x0000a26b00c1f0df003000390027140000faa719: number;
}

interface Fees {
  seller_fees: SellerFees;
  opensea_fees: OpenseaFees;
}

interface Collection {
  banner_image_url: string;
  chat_url?: any;
  created_date: Date;
  default_to_fiat: boolean;
  description: string;
  dev_buyer_fee_basis_points: string;
  dev_seller_fee_basis_points: string;
  discord_url: string;
  display_data: DisplayData;
  external_url: string;
  featured: boolean;
  featured_image_url: string;
  hidden: boolean;
  safelist_request_status: string;
  image_url: string;
  is_subject_to_whitelist: boolean;
  large_image_url: string;
  medium_username?: any;
  name: string;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: string;
  opensea_seller_fee_basis_points: string;
  payout_address: string;
  require_email: boolean;
  short_description?: any;
  slug: string;
  telegram_url?: any;
  twitter_username: string;
  instagram_username: string;
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
  user?: number;
  profile_img_url: string;
  address: string;
  config: string;
}

interface MakerFee {
  account: Account;
  basis_points: string;
}

export interface OpenseaSellOrderI {
  created_date: string;
  closing_date: string;
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
}

interface User2 {
  username: string;
}

interface Creator {
  user: User2;
  profile_img_url: string;
  address: string;
  config: string;
}

interface Asset2 {
  decimals?: any;
  token_id: string;
}

interface PaymentToken {
  symbol: string;
  address: string;
  image_url: string;
  name: string;
  decimals: number;
  eth_price: string;
  usd_price: string;
}

interface LastSale {
  asset: Asset2;
  asset_bundle?: any;
  event_type: string;
  event_timestamp: Date;
  auction_type?: any;
  total_price: string;
  payment_token: PaymentToken;
  transaction?: any;
  created_date: Date;
  quantity: string;
}

export interface OpenseaAssetI {
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
  seaport_sell_orders: OpenseaSellOrderI[];
  creator: Creator;
  traits: any[];
  last_sale: LastSale;
  top_bid?: any;
  listing_date?: any;
  is_presale: boolean;
  supports_wyvern: boolean;
  rarity_data?: any;
  transfer_fee?: any;
  transfer_fee_payment_token?: any;
  token_id: string;
}

export interface OpenseaAssetRes {
  next: string | null;
  previous: string | null;
  assets: OpenseaAssetI[];
}