import { useEffect, useState } from "react";
import { OpenseaService } from "../../utils/opensea";

type Props = {
  token_address: string;
  token_id: string;
}

export const useOpenseaNftDetail = (p: Props) => {
  const [state, setState] = useState<any | undefined>(undefined);

  useEffect(() => {
    OpenseaService.getNftAssetByAddressAndId({
      asset_contract_address: p.token_address,
      token_ids: p.token_id,
    }).then((res: any) => {
      setState(res);
    });
  }, [])
  
  return state;
}