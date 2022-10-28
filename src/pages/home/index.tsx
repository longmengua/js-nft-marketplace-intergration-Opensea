import { useMetamaskWallet } from "../../providers/wallet/metamask"
import { useOpenseaListedNfts } from "../../hooks/useOpenseaListedNfts";
import { OpenseaNftOrder } from "../../utils/opensea/type";
import { Utility } from "../../utils/util";
import { NftCard } from "../../components/nftCard";
import { DTO } from "../../utils/dto";
import { NftDetail } from "../../components/nftDetail";
import { useEffect, useState } from "react";
import { useOpenseaNftDetail } from "../../hooks/useOpenseaNftDetail";

export const Home = () => {
  const {
    connect,
    disconnect,
    signerAddress,
    signer,
  } = useMetamaskWallet();
  const limit = 20;
  const { data: listedNft, isLoaded } = useOpenseaListedNfts(limit);
  const [state, setState] = useState<OpenseaNftOrder | undefined>(undefined);
  // const {} = useOpenseaNftDetail(state);
  const s = {
    img_url: "",
    summary: {
      nft_author: "",
      nft_description: "",
      collection_name: "",
      collection_description: ""
    },
    details: {
      network: "",
      creator_earnings: 0,
      token_address: "",
      token_account: "",
      token_id: "",
      collection_account: "",
      owner_account: "",
      created_date: ""
    },
    traits: []
  };

  useEffect(() => {
    if (!state && listedNft && listedNft.length > 0) setState(listedNft[0])
  }, [listedNft])

  return <div className="">
    <div className="flex justify-between w-[1050px] my-0 mx-auto box-border">
      <div className="flex-1 p-[10px]">
        <NftDetail />
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
      {listedNft?.map(DTO.OpenseaAssetToNftCardProps).map((v, i) => <NftCard {...v} key={'nft-card#' + i} />)}
      {!listedNft && Array.from({length: limit}, (v) => v).map((v, i) => <NftCard key={'nft-splash-card#' + i} />)}
    </div>
    <br />
  </div>
}