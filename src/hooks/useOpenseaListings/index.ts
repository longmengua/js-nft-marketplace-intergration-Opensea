import { useCallback, useEffect, useState } from "react"
import { OpenseaService } from "../../utils/opensea";
import { OpenseaListingsDto, OpenseaListingsParam } from "./type";

export const useOpenseaListings = (p: OpenseaListingsParam) => {
  const [state, setState] = useState<OpenseaListingsDto | undefined>(undefined);

  const fetchingNFTListingInfo = useCallback(async () => {
    if (p.nft_token_address === '' || p.nft_token_id === '') return;
    const res = await OpenseaService.getNFTListing({
      asset_contract_address: p.nft_token_address,
      token_ids: p.nft_token_id,
    }, true);
    console.log('listing', res);
    setState(res);
  }, [p.nft_token_address, p.nft_token_id])

  useEffect(() => {
    console.log('=1')
    return () => {
      console.log('=2')
      fetchingNFTListingInfo();
    }
  }, []);

  return state;
}