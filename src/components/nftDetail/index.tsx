import Image from 'next/image';
import { NftAttributeCard } from '../nftAttributeCard';
import { NftDetailGradientTextColorClass } from './style';
import { NftDetailProps } from './type';

export const NftDetail = (p: NftDetailProps | undefined) => {
  return <div className="flex justify-center gap-[10px]">
    <div className='w-[280px] h-[280px]'>
      {p?.img_url && <Image alt='' src={p?.img_url} width={280} height={280} />}
    </div>
    <div className='flex-1 flex flex-col justify-start'>
      <details className='italic cursor-pointer border-[2px] border-purple-600 rounded-[10px] p-[10px]'>
        <summary>
          <span style={NftDetailGradientTextColorClass}>Summary</span>
        </summary>
        <div className='p-[20px] box-border'>
          {!p?.summary && <div className='italic text-center text-gray-400'>No data founded</div>}
          {/* <div>{p?.summary}</div> */}
        </div>
      </details>
      <div className='p-[2.5px]'/>
      <details className='italic cursor-pointer border-[2px] border-purple-600 rounded-[10px] p-[10px]'>
        <summary>
          <span style={NftDetailGradientTextColorClass}>Details</span>
        </summary>
        <div className='p-[20px] box-border'>
        {!p?.details && <div className='italic text-center text-gray-400'>No data founded</div>}
          {/* <div>{p?.details}</div> */}
        </div>
      </details>
      <div className='p-[2.5px]'/>
      <details className='italic cursor-pointer border-[2px] border-purple-600 rounded-[10px] p-[10px]'>
        <summary>
          <span style={NftDetailGradientTextColorClass}>Attributes</span>
        </summary>
        <div className='px-[10px] box-border'>
          {!p?.traits && <div className='italic text-center text-gray-400'>No data founded</div>}
          {p?.traits?.map((v, i) => <NftAttributeCard key={'nft-attribute-card#' + i} type={v.trait_type} value={v.value} />)}
        </div>
      </details>
    </div>
  </div>
}