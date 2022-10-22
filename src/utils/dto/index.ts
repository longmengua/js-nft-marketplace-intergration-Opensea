import { BigNumber } from "ethers";
import { OpenseaAsset, OpenseaNftOrder } from "../opensea/type";
import { Utility } from "../util";

export class DTO {
  static OpenseaAssetToNftCardProps = (p: OpenseaNftOrder): {
    img_url: string;
    item_name: string;
    collection_name: string;
    price: string;
  } => {
    const asset: OpenseaAsset | undefined = Utility.arrayHelper(p?.maker_asset_bundle?.assets);
    const price = p?.current_price ? (Number(p.current_price)/10 ** 18).toFixed(6) : '';
    return {
      img_url: asset?.image_url || '',
      item_name: asset?.name || '',
      collection_name: asset?.collection?.name || '',
      price: price,
    };
  }
}