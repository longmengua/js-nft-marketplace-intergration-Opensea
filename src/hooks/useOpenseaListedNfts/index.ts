import { useCallback, useEffect, useState } from "react";
import { OpenseaService } from "../../utils/opensea";
import { OpenseaListingRes, OpenseaNftOrder } from "../../utils/opensea/type";

export const useOpenseaListedNfts = (limit?: number) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [state, setState] = useState<OpenseaNftOrder[] | undefined>();

  const getOpenseaListedNfts = useCallback(async () => {
    const data: OpenseaListingRes =  await OpenseaService.getNftListing({limit});
    const orders: OpenseaNftOrder[] = data.orders;
    setState(orders);
  }, [])

  useEffect(() => {
    setIsLoaded(true)
    getOpenseaListedNfts().then(() => setIsLoaded(false)).catch((e) => {
      console.error(e);
      setIsLoaded(false);
    });
  }, [getOpenseaListedNfts])

  return state;
}