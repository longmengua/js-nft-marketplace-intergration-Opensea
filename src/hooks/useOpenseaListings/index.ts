import { useCallback, useEffect, useState } from "react"
import { OpenseaService } from "../../utils/opensea";
import { arrayHelper } from "../../utils/util";
import { OpenseaListingsParam, OpenseaAssetRes, Order, Asset, OpenseaListingsRes, AssetDetail } from "./type";

export const useOpenseaListings = (p: OpenseaListingsParam) => {
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [asset, setAsset] = useState<AssetDetail | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);

  const fetchingNFTListingInfo = useCallback(async () => {
    if (p.nft_token_address === '' || p.nft_token_id === '') return;
    const assets: OpenseaAssetRes = await OpenseaService.getNFTAssetDetail({
      asset_contract_address: p.nft_token_address,
      token_ids: p.nft_token_id,
    }, true);
    const listings: OpenseaListingsRes = await OpenseaService.getNFTListing({
      asset_contract_address: p.nft_token_address,
      token_ids: p.nft_token_id,
    }, true);
    return {
      listings,
      assets,
    };
  }, [p.nft_token_address, p.nft_token_id])

  useEffect(() => {
    setLoading(true);
    fetchingNFTListingInfo().then((res) => {
      const order = arrayHelper(res?.listings?.orders);
      const asset = arrayHelper(res?.assets?.assets);
      setOrder(order);
      setAsset(asset);
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    });
  }, [fetchingNFTListingInfo, setLoading, setAsset, setOrder])

  console.info('useOpenseaListings', {
    order: order,
    asset: asset,
    isLoading: isLoading,
  })
  return {
    order: order,
    asset: asset,
    isLoading: isLoading,
  };
}