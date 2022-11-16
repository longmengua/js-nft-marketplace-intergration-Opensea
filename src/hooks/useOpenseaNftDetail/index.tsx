import { OpenseaAssetI, OpenseaAssetRes } from "@/utils/opensea/type/openseaAssetRes";
import { Utility } from "@/utils/util";
import { useEffect, useState } from "react";
import { OpenseaService } from "../../utils/opensea";

export const useOpenseaNftDetail = (token_address?: string, token_id?: string, isTestMode?: boolean) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [state, setState] = useState<OpenseaAssetI | undefined>(undefined);

  useEffect(() => {
    if (isLoaded || !token_address || !token_id) return;
    setIsLoaded(true);
    OpenseaService.getNftAssetByAddressAndId({
      asset_contract_address: token_address,
      token_ids: token_id,
    }, isTestMode).then((res: OpenseaAssetRes | undefined) => {
      const asset = Utility.arrayHelper<OpenseaAssetI>(res?.assets);
      setState(asset);
    }).finally(() => {
      setIsLoaded(false);
    });
  }, [token_address, token_id, isTestMode])
 
  return {
    data: state,
    isLoaded: isLoaded,
  };
}