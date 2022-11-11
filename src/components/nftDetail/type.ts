import { ChainEnum } from "@/utils/enum/chain.enum";
import { OpenseaAssetI, OpenseaSellOrderI } from "@/utils/opensea/type/openseaAssetRes";
import { Utility } from "@/utils/util";

export class NftDetailProps {
  img_url: undefined | string;
  summary: undefined | {
    nft_author_address: string;
    nft_description: string;
    collection_name: string;
    collection_description: string;
  };
  details: undefined | {
    network: string;
    creator_earnings: number;
    token_address: string;
    token_id: string;
    nft_created_date: Date;
    nft_last_updated_date: Date | undefined;
    nft_listing_date: Date | undefined;
    nft_listing_expired_date: Date | undefined;
  };
  traits: undefined | Array<{
    trait_type: string;
    value: string;
    display_type: string;
    max_value: string;
    trait_count: string;
    order: any;
  }>;

  static convert = (p: OpenseaAssetI | undefined): NftDetailProps | undefined => {
    if (!p) return undefined;

    const searport_order: OpenseaSellOrderI | undefined = Utility.arrayHelper(p?.seaport_sell_orders);
    const data: NftDetailProps = {
      img_url: p?.image_thumbnail_url,
      summary: {
        nft_author_address: p?.creator?.address,
        nft_description: p?.description,
        collection_name: p?.collection?.name,
        collection_description: p?.collection?.description,
      },
      details: {
        network: ChainEnum.ETHEREUM,
        creator_earnings: 0,
        token_address: p?.asset_contract?.address,
        token_id: p?.token_id,
        nft_created_date: new Date(p?.asset_contract?.created_date),
        nft_last_updated_date: !searport_order ? undefined : new Date(searport_order?.created_date),
        nft_listing_date: !searport_order ? undefined : new Date(searport_order?.listing_time),
        nft_listing_expired_date: !searport_order ? undefined : new Date(searport_order?.expiration_time)
      },
      traits: p.traits,
    };
    return data;
  }
}