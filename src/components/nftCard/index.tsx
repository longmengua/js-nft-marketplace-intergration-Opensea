import Image from 'next/image';
import EthIcon from '@/public/eth-icon.png';
import ExclamationMarkIcon from '@/public/exclamation-mark-icon.png';
import { useState } from 'react';
import { Logger } from '../../utils/log';
import { NftCardProps } from './type';

export const NftCard = (p: NftCardProps) => {
  const [showScaffoldImg, setShowScaffoldImg] = useState(true);
  if (p.collection_name === '' || p.item_name === '' || p.price === '') return <></>
  return <div className='box-border rounded-[10px] w-[200px]' onClick={() => {
    p?.onClickItem && p.onClickItem({});
  }}>
    <div className={`text-center mt-[10px] relative w-[200px] h-[200px]`}>
      {p.img_url && p.img_url.length > 0 && <Image 
        className='rounded-[15px]'
        src={p.img_url}
        onLoadingComplete={() => setShowScaffoldImg(false)}
        onError={(e) => Logger.error(e)}
        width='200'
        height='200'
      />}
      {showScaffoldImg && <div className='rounded-[15px] absolute animate-pulse bg-slate-400 w-[200px] h-[200px] top-0' />}
    </div>
    <div className='p-[5px] text-center'>
      <div className='hover:text-[gray] text-[12px]'>{p.item_name || '-'}</div>
      <div className='text-pink-600 text-[11px] py-[5px]'>{p.collection_name || '-'}</div>
      <div className='relative flex items-center justify-between px-[5px] box-border'>
        <Image 
          src={EthIcon} 
          width='20px' 
          height='20px'
        />
        <div>{p.price || '-'}</div>
        <div className='flex-1' />
        <Image 
            src={ExclamationMarkIcon} 
            width='20px' 
            height='20px'
        />
      </div>
    </div>
  </div>
}