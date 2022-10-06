import { useMetamaskWallet } from "../../providers/wallet/metamask"
import { Seaport } from "@opensea/seaport-js";
import { OrderWithCounter, Signer } from "@opensea/seaport-js/lib/types";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { ethers } from "ethers";
import { useState } from "react";
import { useOpenseaListings } from "../../hooks/useOpenseaListings";
import { OpenseaListingsDto, Order } from "../../hooks/useOpenseaListings/type";
import { arrayHelper } from "../../utils/util";

export const Home = () => {
  const {
    connect,
    disconnect,
    provider,
    signerAddress,
    signer,
  } = useMetamaskWallet();
  const [state, setState] = useState({
    nft_token_address: '0xf4910c763ed4e47a585e2d34baa9a4b611ae448c',
    nft_token_id: '114139018855137944860863318946237270478060854979150640350732175534926023622657',
  });
  const listings: OpenseaListingsDto | undefined = useOpenseaListings({
    nft_token_address: state.nft_token_address,
    nft_token_id: state.nft_token_id,
  });

  const onConnectWallet = () => connect();

  const onDisconnectWallet = () => disconnect();

  const onOrderCreation = async () => {
    try {
      const order: Order | undefined = arrayHelper<Order>(listings?.orders);
      if (!signer || !signerAddress || !order) return;

      const seaport = new Seaport(signer as Signer);
      const protocol_data: OrderWithCounter = order.protocol_data;
      console.log('onOrderCreation - 1');
      const { executeAllActions: executeAllFulfillActions } =
        await seaport.fulfillOrder({
          order: protocol_data,
          accountAddress: signerAddress,
        });
      console.log('onOrderCreation - 2');
      const transaction = await executeAllFulfillActions();
      console.log('onOrderCreation - 3');
      console.log(transaction);
    } catch(e) {
      console.error(e);
    }
  }

  return <div className="flex justify-center items-center h-screen w-screen">
    <div className="w-[800px]">
      <div>Wallet Address: {signerAddress ?? 'N/A'}</div>
      <br />
      <div className="cursor-pointer border-2 text-center rounded-lg" onClick={signerAddress ? onDisconnectWallet : onConnectWallet}>{signerAddress ? 'Disconnect' : 'Connect'}</div>
      <br />
      <div className="flex">
        <div className="pr-[5px]">NFT token address</div>
        <input className="border-2 flex-1 text-sm" onInput={(e) => setState((pre) => ({...pre, nft_token_address: e.target.value}))} value={state.nft_token_address}/>
      </div>
      <br />
      <div className="flex">
        <div className="pr-[50px]">NFT token id</div>
        <input className="border-2 flex-1 text-sm" onInput={(e) => setState((pre) => ({...pre, nft_token_id: e.target.value}))} value={state.nft_token_id}/>
      </div>
      <br />
      <div className="cursor-pointer border-2 text-center rounded-lg" onClick={onOrderCreation}>Buy NFT Listing</div>
    </div>
  </div>
}