import { useCallback, useEffect, useState } from "react";
import { OpenseaService } from "../../utils/opensea";

export const useOpenseaListedNfts = (limit?: number) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [state, setState] = useState<any[] | undefined>();

  const getOpenseaListedNfts = useCallback(async () => {
    const data =  await OpenseaService.getNftListing({limit});
    const orders = data.orders;
    setState(orders);
  }, [])

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