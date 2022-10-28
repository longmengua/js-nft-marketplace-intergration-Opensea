import Image from 'next/image';import { useState } from 'react';
import { NftAttributeCard } from '../nftAttributeCard';
''

type Props = {
  img_url: string;
  summary: {
    nft_author: string;
    nft_description: string;
    collection_name: string;
    collection_description: string;
  };
  details: {
    network: string;
    creator_earnings: number;
    token_address: string;
    token_account: string;
    token_id: string;
    collection_account: string;
    owner_account: string;
    created_date: string;
  };
  traits: Array<{
    trait_type: string;
    value: string;
    display_type: string;
    max_value: string;
    trait_count: string;
    order: any;
  }>;
}

enum Subject {
  summary,
  attributes,
  details,
}

const gradientTextColorClass = {
  background: 'linear-gradient(to right bottom, rgba(147,51,233, 0.8), rgba(147,51,233, 0.3))',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

export const NftDetail = (p: Partial<Props>) => {
  return <div className="flex justify-center gap-[10px]">
    <div>
      <Image src={''} width={300} height={300}/>
    </div>
    <div className='flex-1'>
      <details className='italic cursor-pointer border-[2px] border-purple-600 rounded-[10px] p-[10px]'>
        <summary>
          <span style={gradientTextColorClass}>Summary</span>
        </summary>
        <div className='p-[20px] box-border'>
          {!p.traits && <div className='italic text-center text-gray-400'>No data founded</div>}
          {p?.traits?.map(v => <NftAttributeCard {...v} />)}
        </div>
      </details>
      <div className='p-[2.5px]'/>
      <details className='italic cursor-pointer border-[2px] border-purple-600 rounded-[10px] p-[10px]'>
        <summary>
          <span style={gradientTextColorClass}>Attributes</span>
        </summary>
        <div className='p-[20px] box-border'>
          {!p.traits && <div className='italic text-center text-gray-400'>No data founded</div>}
          {p?.traits?.map(v => <NftAttributeCard {...v} />)}
        </div>
      </details>
      <div className='p-[2.5px]'/>
      <details className='italic cursor-pointer border-[2px] border-purple-600 rounded-[10px] p-[10px]'>
        <summary>
          <span style={gradientTextColorClass}>Details</span>
        </summary>
        <div className='p-[20px] box-border'>
        {!p.details && <div className='italic text-center text-gray-400'>No data founded</div>}
          <div></div>
        </div>
      </details>
    </div>
  </div>;
}