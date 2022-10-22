import { useMetamaskWallet } from "../../providers/wallet/metamask"
import { useOpenseaListedNfts } from "../../hooks/useOpenseaListedNfts";
import { OpenseaNftOrder } from "../../utils/opensea/type";
import { Utility } from "../../utils/util";
import { NftCard } from "../../components/nftCard";
import { DTO } from "../../utils/dto";

export const Home = () => {
  const {
    connect,
    disconnect,
    signerAddress,
    signer,
  } = useMetamaskWallet();

  const listedNft: OpenseaNftOrder[] | undefined = useOpenseaListedNfts();

  return <div className="">
    <div className="flex justify-between w-[1050px] my-0 mx-auto box-border">
      <div></div>
      <div className="">
        <div className="flex">
          <div className="text-black pr-[5px]">Wallet Address :</div>
          <div className="text-blue-500 relative group">
            <div className="hidden group-hover:block  bg-slate-400 rounded-[5px] py-[3px] px-[10px] absolute left-0 right-0 translate-y-[-100%] translate-x-[-50%] w-fit text-white">{signerAddress}</div>
            <div className="">{Utility.addressShortcut(signerAddress) || '-'}</div>
          </div>
        </div>
        <br />
        <div className={'rounded-[10px] bg-gradient-to-r from-cyan-500 to-blue-500 text-center text-white cursor-pointer'} onClick={() => signerAddress ? connect() : disconnect()}>{signerAddress ? 'Disconnect' : 'Connect'}</div>
      </div>
    </div>
    <br />
    <div className="justify-center flex flex-wrap w-[1050px] h-[40%] my-0 mx-auto gap-[10px] overflow-y-scroll box-border">
      {listedNft?.map(DTO.OpenseaAssetToNftCardProps).map((v, i) => <NftCard {...v} key={'nft-card#' + i} />)}
    </div>
    <br />
  </div>
}