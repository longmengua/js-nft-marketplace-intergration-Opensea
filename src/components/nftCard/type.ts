import { OpenseaAssetI } from "@/utils/opensea/type/openseaAssetRes";
import { OpenseaNftOrderI, OpenseaNftOrderRes, OpenseaOrderAssetI } from "@/utils/opensea/type/openseaNftOrderRes";
import { Utility } from "@/utils/util";

export class NftCardProps {
  img_url: string | undefined;
  item_name: string | undefined;
  collection_name: string | undefined;
  price: string | undefined;
  token_address: string | undefined;
  token_id: string | undefined;
  onClickItem?: (token_address: string | undefined, token_id: string | undefined) => void;

  static convert = (p: OpenseaNftOrderI): NftCardProps => {
    const asset: OpenseaOrderAssetI | undefined = Utility.arrayHelper(p?.maker_asset_bundle?.assets);
    const price = p?.current_price ? (Number(p.current_price)/10 ** 18).toFixed(6) : '';

    if (!asset) throw new Error("Missing Asset Info");

    return {
      img_url: asset.image_url,
      item_name: asset.name,
      collection_name: asset.collection?.name,
      price: price,
      token_address: asset.asset_contract?.address,
      token_id: asset.token_id,
    };
  }
}