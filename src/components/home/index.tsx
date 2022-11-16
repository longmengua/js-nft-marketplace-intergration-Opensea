import { useMetamaskWallet } from "../../providers/wallet/metamask"
import { Seaport } from "@opensea/seaport-js";
import { OrderWithCounter, Signer } from "@opensea/seaport-js/lib/types";
import { useState } from "react";
import { useOpenseaListings } from "../../hooks/useOpenseaListings";
import { ethers } from "ethers";

export const Home = () => {
  const {
    connect,
    disconnect,
    signerAddress,
    signer,
  } = useMetamaskWallet();
  const [state, setState] = useState({
    nft_token_address: '0xf4910c763ed4e47a585e2d34baa9a4b611ae448c',
    nft_token_id: '114139018855137944860863318946237270478060854979150640350732175537125046878209',
  });
  const { asset, order, isLoading } = useOpenseaListings({
    nft_token_address: state.nft_token_address,
    nft_token_id: state.nft_token_id,
  });

  const onConnectWallet = () => connect();

  const onDisconnectWallet = () => disconnect();

  const onOrderCreation = async () => {
    try {
      if (!signer || !signerAddress || !order) return;

      const seaport = new Seaport(signer as Signer);
      const protocol_data: OrderWithCounter = order.protocol_data;
      const { executeAllActions: executeAllFulfillActions } =
        await seaport.fulfillOrder({
          order: protocol_data,
          accountAddress: signerAddress,
        });
      const transaction = await executeAllFulfillActions();
    } catch(e) {
      console.error(e);
    }
  }
  // console.debug('Home', { asset, order, isLoading })
  return <div className="flex justify-center items-center h-screen w-screen">
    <div className="w-[1100px]">
      <div className="cursor-pointer border-2 text-center rounded-lg" onClick={signerAddress ? onDisconnectWallet : onConnectWallet}>{signerAddress ? 'Disconnect' : 'Connect'}</div>
      <br />
      <div>Wallet Address: {signerAddress ?? 'N/A'}</div>
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
      <div className="text-center">
        <button disabled={isLoading || !asset || !order} className={`${isLoading ? 'cursor-wait text-gray-800/25' : !order || !asset ? 'cursor-not-allowed text-gray-800/25' : 'cursor-pointer'} border-2 text-center rounded-lg p-[5px]`} onClick={onOrderCreation}>{!asset ? 'No NFT found' : !order ? 'NFT is not on listing' : 'Buy Listing NFT'}</button>
      </div>
      <br />
      {asset && <div className="flex justify-center items-center">
        <div>
          <img width={200} height={200} src={asset?.image_url} />
        </div>
        <div className="p-[10px]" />
        <div>
          <div>
            <div>listing price: {order ? `${ethers.utils.formatEther(order?.current_price)} eth` : 'N/A'}</div>
            <div>token address: {asset?.asset_contract?.address ?? 'N/A'}</div>
            <div>token id: {asset?.token_id ?? 'N/A'}</div>
            <div>token standard: {asset?.asset_contract?.schema_name ?? 'N/A'}</div>
            <div>nft name: {asset?.name ?? 'N/A'}</div>
            <div>nft description: {asset?.description ?? 'N/A'}</div>
            <div>nft traits: {asset?.traits && asset?.traits?.length === 0 && 'N/A'}</div>
            {asset?.traits?.length > 0 && <div>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th>trait type</th>
                    <th>value</th>
                    <th>display type</th>
                    <th>max value</th>
                    <th>trait count</th>
                    <th>order</th>
                  </tr>
                </thead>
                <tbody>
                  {asset?.traits?.map((v) => {
                    return <tr>
                      <td>{v.trait_type}</td>
                      <td>{v.value}</td>
                      <td>{v.display_type}</td>
                      <td>{v.max_value}</td>
                      <td>{v.trait_count}</td>
                      <td>{v.order}</td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>}
            <div>collection: {asset?.collection?.name}</div>
            <div>collection slug: {asset?.collection?.slug}</div>
            <div>collection description: {asset?.collection?.description}</div>
          </div>
        </div>
      </div>}
    </div>
  </div>
}