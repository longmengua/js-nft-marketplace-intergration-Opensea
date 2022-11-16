import React from 'react'
import useCopyClipboard from '../../hooks/useCopyClipboard'
import Image from 'next/image';
import tickIcon from './assets/tick.svg';
import copyIcon from './assets/copy.svg';

// <Copy toCopy={href}>{href}</Copy>
export const Copy = (p: { toCopy: string | undefined; children?: React.ReactNode, iconSize?: number }) => {
  const [isCopied, setCopied] = useCopyClipboard()
  const iconSize = p?.iconSize ?? 12;
  return (
    <div className='flex cursor-pointer items-center flex-wrap' onClick={() => p.toCopy && setCopied(p.toCopy)}>
      <div className='flex-1'>{p.children}</div>
      <div className='p-[3px]' />
      <Image src={isCopied ? tickIcon : copyIcon} width={iconSize} height={iconSize} />
    </div>
  )
}
