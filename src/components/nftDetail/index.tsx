import { useMetamaskWallet } from '@/providers/wallet/metamask';
import { SeaportService } from '@/utils/seaport';
import { Utility } from '@/utils/util';
import Image from 'next/image';
import { useState } from 'react';
import { NftAttributeCard } from '../nftAttributeCard';
import { NftDetailGradientTextColorClass } from './style';
import { NftDetailProps } from './type';

enum ColEnum {
  summary,
  properties,
  details,
}

export const NftDetail = (p: NftDetailProps | undefined) => {
  const [state, setState] = useState<ColEnum | undefined>(ColEnum.details);
  const {
    connect,
    disconnect,
    signerAddress,
    signer,
  } = useMetamaskWallet();

  const buyListingNft = async () => {
    if (!signer || !signerAddress) throw new Error('Missing signer');
    if (!p?.order_protocol_data) throw new Error('Missing protocol data');
    console.log('data', p?.order_protocol_data);
    await SeaportService.buyListedNft({
      signer: signer,
      signer_address: signerAddress,
      order_protocol_data: p?.order_protocol_data,
    });
  }

  const onClickSummary = (event: any, col: ColEnum) => {
    event?.preventDefault();
    setState((pre) => pre === col ? undefined : col);
  }
  
  return <div className="NftDetail flex justify-center gap-[10px]">
    <div className='w-[300px] h-[300px] relative'>
      {p?.img_url && <Image alt='' src={p?.img_url} width={300} height={300} className='rounded-[15px]' />}
      {!p?.img_url && <div className={`rounded-[15px] absolute animate-pulse bg-slate-400 top-0  w-[300px] h-[300px]`} />}
    </div>
    <div className='flex-1 flex flex-col justify-start'>
      <div className='p-[5px] flex items-center gap-[10px]'>
        <button className='px-[10px] rounded-[5px] bg-gradient-to-r from-cyan-500 to-blue-500 text-center text-white cursor-pointer' onClick={() => buyListingNft()}>Buy NFT</button>
        <div>Price: {p?.details?.price ?? '-'} ETH</div>
      </div>
      <details className='italic border-[2px] border-purple-600 rounded-[10px] p-[10px]' open={state === ColEnum.summary}>
        <summary className='cursor-pointer' onClick={(e) => onClickSummary(e, ColEnum.summary)}>
          <span style={NftDetailGradientTextColorClass}>Summary</span>
        </summary>
        <div className='px-[10px] box-border max-h-[150px] overflow-y-auto'>
          {!p?.summary && <div className='italic text-center text-gray-400'>No data founded</div>}
          {p?.summary && <div>
            <NftAttributeCard type={'Collection name'} value={p?.summary?.collection_name} />
            <NftAttributeCard type={'Collection description'} value={p?.summary?.collection_description} />
            <NftAttributeCard type={'NFT creator'} value={p?.summary?.nft_author_address} />
            <NftAttributeCard type={'NFT description'} value={p?.summary?.nft_description} />
          </div>}
        </div>
      </details>
      <div className='p-[2.5px]'/>
      <details className='italic border-[2px] border-purple-600 rounded-[10px] p-[10px]'  open={state === ColEnum.properties}>
        <summary className='cursor-pointer' onClick={(e) => onClickSummary(e, ColEnum.properties)}>
          <span style={NftDetailGradientTextColorClass}>Properties</span>
        </summary>
        <div className='px-[10px] box-border max-h-[150px] overflow-y-auto'>
          {!p?.traits && <div className='italic text-center text-gray-400'>No data founded</div>}
          {p?.traits?.map((v, i) => <NftAttributeCard key={'nft-attribute-card#' + i} type={v.trait_type} value={v.value} />)}
        </div>
      </details>
      <div className='p-[2.5px]'/>
      <details className='italic border-[2px] border-purple-600 rounded-[10px] p-[10px]'  open={state === ColEnum.details}>
        <summary className='cursor-pointer' onClick={(e) => onClickSummary(e, ColEnum.details)}>
          <span style={NftDetailGradientTextColorClass}>Details</span>
        </summary>
        <div className='px-[10px] box-border max-h-[150px] overflow-y-auto'>
          {(!p?.details || p.traits?.length === 0) && <div className='italic text-center text-gray-400'>No data founded</div>}
          {p?.details && <>
            <NftAttributeCard type={'NFT fee'} value={p?.details?.creator_earnings?.toString()} />
            <NftAttributeCard suffix={'ETH'} type={'Price'} value={p?.details?.price} />
            <NftAttributeCard type={'Collection name'} value={p?.details?.collection_name} />
            <NftAttributeCard type={'NFT name'} value={p?.details?.nft_name} />
            <NftAttributeCard showCopyIcon={true} type={'NFT token address'} value={p?.details?.token_address} isShortCut={true}/>
            <NftAttributeCard showCopyIcon={true} type={'NFT token ID'} value={p?.details?.token_id} isShortCut={true}/>
            <NftAttributeCard type={'Network'} value={p?.details?.network} />
            <NftAttributeCard type={'Created date'} value={Utility.dateFormatter(p?.details?.nft_created_date)} />
            <NftAttributeCard type={'Last updated date'} value={Utility.dateFormatter(p?.details?.nft_last_updated_date)} />
            <NftAttributeCard type={'Listing date'} value={Utility.dateFormatter(p?.details?.nft_listing_date)} />
            <NftAttributeCard type={'Listing expired date'} value={Utility.dateFormatter(p?.details?.nft_listing_expired_date)} />
          </>}
        </div>
      </details>
    </div>
  </div>
}