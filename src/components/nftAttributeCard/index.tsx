import { Copy } from "@/widgets/copy";
import { ReactNode } from "react";

type Props = {
  type: string | undefined;
  value: string | undefined;
  suffix?: string | ReactNode;
  showCopyIcon?: boolean;
}

export const NftAttributeCard = (p: Props) => {
  return <div className="rounded-[10px] box-border flex items-center gap-[2px]">
    <div className="text-gray-500 text-[10px] flex-[1]">{p.type}</div>
    <div className="text-[12px] flex-[3] flex gap-[5px]">
      {p.showCopyIcon && p.value && p.value !== '' ? <Copy toCopy={p.value}>{p.value}</Copy> : p.value ?? '-'}
      <div>{p?.suffix}</div>
    </div>
  </div>
}