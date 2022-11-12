import { Utility } from '@/utils/util';
import Image from 'next/image';
import { useState } from 'react';
import { NftAttributeCard } from '../nftAttributeCard';
import { NftDetailGradientTextColorClass } from './style';
import { NftDetailProps } from './type';

enum ColEnum {
  summary,
  details,
  properties,
}

export const NftDetail = (p: NftDetailProps | undefined) => {
  const [state, setState] = useState<ColEnum | undefined>(undefined);

  const onClickSummary = (event: any, col: ColEnum) => {
    event?.preventDefault();
    setState((pre) => pre === col ? undefined : col);
  }
  
  console.log('NftDetail', state, p);
  return <div className="NftDetail flex justify-center gap-[10px]">
    <div className='w-[280px] h-[280px]'>
      {p?.img_url && <Image alt='' src={p?.img_url} width={280} height={280} />}
    </div>
    <div className='flex-1 flex flex-col justify-start'>
      <details className='italic border-[2px] border-purple-600 rounded-[10px] p-[10px]' open={state === ColEnum.summary}>
        <summary className='cursor-pointer' onClick={(e) => onClickSummary(e, ColEnum.summary)}>
          <span style={NftDetailGradientTextColorClass}>Summary</span>
        </summary>
        <div className='p-[20px] box-border'>
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
      <details className='italic border-[2px] border-purple-600 rounded-[10px] p-[10px]'  open={state === ColEnum.details}>
        <summary className='cursor-pointer' onClick={(e) => onClickSummary(e, ColEnum.details)}>
          <span style={NftDetailGradientTextColorClass}>Details</span>
        </summary>
        <div className='p-[20px] box-border'>
        {(!p?.details || p.traits?.length === 0) && <div className='italic text-center text-gray-400'>No data founded</div>}
        {p?.details && <div>
          <NftAttributeCard type={'Network'} value={p?.details?.network} />
          <NftAttributeCard type={'NFT token address'} value={Utility.addressShortcut(p?.details?.token_address)} />
          <NftAttributeCard type={'NFT token ID'} value={Utility.addressShortcut(p?.details?.token_id)} />
          <NftAttributeCard type={'NFT fee'} value={p?.details?.creator_earnings?.toString()} />
          <NftAttributeCard type={'Created date'} value={Utility.dateFormatter(p?.details?.nft_created_date)} />
          <NftAttributeCard type={'Last updated date'} value={Utility.dateFormatter(p?.details?.nft_last_updated_date)} />
          <NftAttributeCard type={'Listing date'} value={Utility.dateFormatter(p?.details?.nft_listing_date)} />
          <NftAttributeCard type={'Listing expired date'} value={Utility.dateFormatter(p?.details?.nft_listing_expired_date)} />
        </div>}
        </div>
      </details>
      <div className='p-[2.5px]'/>
      <details className='italic border-[2px] border-purple-600 rounded-[10px] p-[10px]'  open={state === ColEnum.properties}>
        <summary className='cursor-pointer' onClick={(e) => onClickSummary(e, ColEnum.properties)}>
          <span style={NftDetailGradientTextColorClass}>Properties</span>
        </summary>
        <div className='px-[10px] box-border'>
          {!p?.traits && <div className='italic text-center text-gray-400'>No data founded</div>}
          {p?.traits?.map((v, i) => <NftAttributeCard key={'nft-attribute-card#' + i} type={v.trait_type} value={v.value} />)}
        </div>
      </details>
    </div>
  </div>
}