import { useCallback, useEffect, useState } from "react";
import { OpenseaService } from "../../utils/opensea";

export const useOpenseaListedNfts = (limit?: number, isTestMode?: boolean) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [state, setState] = useState<any[] | undefined>();

  const getOpenseaListedNfts = useCallback(async () => {
    const data =  await OpenseaService.getNftListing({limit}, isTestMode);
    const orders = data.orders;
    setState(orders);
  }, [limit, isTestMode])

  useEffect(() => {
    setIsLoaded(true)
    getOpenseaListedNfts().then(() => setIsLoaded(false)).catch((e) => {
      console.error(e);
      setIsLoaded(false);
    });
  }, [getOpenseaListedNfts])

  return {
    data: state,
    isLoaded: isLoaded,
  };
}