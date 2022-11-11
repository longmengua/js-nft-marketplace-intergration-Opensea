import { useMetamaskWallet } from "../../providers/wallet/metamask"
import { useOpenseaListedNfts } from "../../hooks/useOpenseaListedNfts";
import { Utility } from "../../utils/util";
import { NftCard } from "../../components/nftCard";
import { NftDetail } from "../../components/nftDetail";
import { useEffect, useMemo, useState } from "react";
import { useOpenseaNftDetail } from "../../hooks/useOpenseaNftDetail";
import { NftCardProps } from "@/components/nftCard/type";
import { NftDetailProps } from "@/components/nftDetail/type";

export type HomeStateI = {
  token_address?: string;
  token_id?: string;
}

export const Home = () => {
  const {
    connect,
    disconnect,
    signerAddress,
    signer,
  } = useMetamaskWallet();
  const limit = 20;
  const { data: listedNft, isLoaded } = useOpenseaListedNfts(limit);
  const nftCardInfos: Array<NftCardProps> | undefined = listedNft?.map(NftCardProps.convert);
  const [state, setState] = useState<undefined | HomeStateI>(undefined);
  const { data: assetInfo } = useOpenseaNftDetail(state?.token_address, state?.token_id);
  const nftDetailProps: NftDetailProps | undefined = NftDetailProps.convert(assetInfo);

  useEffect(() => {
    if (state) return;
    if (nftCardInfos && nftCardInfos.length > 0) {
      const info = Utility.arrayHelper<NftCardProps>(nftCardInfos);
      const newState: HomeStateI = {
        token_address: info?.token_address,
        token_id: info?.token_id,
      };
      setState(pre => pre ?? newState);
    }
  }, [nftCardInfos])

  // console.log('===', state, assetInfo, nftDetailProps);
  return <div className="">
    <div className="flex justify-between w-[1050px] my-0 mx-auto box-border">
      <div className="flex-1 p-[10px]">
      <NftDetail 
        img_url={nftDetailProps?.img_url} 
        summary={nftDetailProps?.summary} 
        details={nftDetailProps?.details} 
        traits={nftDetailProps?.traits} 
      />
      </div>
      <div className="">
        <div className="flex my-[20px]">
          <div className="text-black pr-[5px]">Wallet Address :</div>
          <div className="text-blue-500 relative group">
            <div className="hidden group-hover:block  bg-slate-400 rounded-[5px] py-[3px] px-[10px] absolute left-0 right-0 translate-y-[-100%] translate-x-[-50%] w-fit text-white">{signerAddress}</div>
            <div className="w-[85px] ">{Utility.addressShortcut(signerAddress) || '-'}</div>
          </div>
        </div>
        <div className={'rounded-[10px] bg-gradient-to-r from-cyan-500 to-blue-500 text-center text-white cursor-pointer'} onClick={() => signerAddress ? connect() : disconnect()}>{signerAddress ? 'Disconnect' : 'Connect'}</div>
      </div>
    </div>
    <br />
    <div className="justify-center flex flex-wrap w-[1050px] h-[40%] my-0 mx-auto gap-[10px] overflow-y-scroll box-border">
      {nftCardInfos?.map((v, i) => <NftCard {...v} key={'nft-card#' + i} />)}
      {!listedNft && Array.from({length: limit}, (v) => v).map((v, i) => <NftCard key={'nft-splash-card#' + i} img_url={undefined} item_name={undefined} collection_name={undefined} price={undefined} token_address={undefined} token_id={undefined} />)}
    </div>
    <br />
  </div>
}