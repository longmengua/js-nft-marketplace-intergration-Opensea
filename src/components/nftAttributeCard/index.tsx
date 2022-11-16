import { Copy } from "@/widgets/copy";
import { ReactNode } from "react";
import { Utility } from "../../utils/util";

type Props = {
  type: string | undefined;
  value: string | undefined;
  suffix?: string | ReactNode;
  showCopyIcon?: boolean;
  isShortCut?: boolean;
}

export const NftAttributeCard = (p: Props) => {
  return <div className="rounded-[10px] box-border flex items-center gap-[2px] w-full">
    <div className="text-gray-500 text-[10px] flex-[1] min-w-[150px]">{p.type}</div>
    <div className="text-[12px] flex-[3] flex gap-[5px] max-w-[300px] ">
      {p.showCopyIcon && p.value && p.value !== '' ? <Copy toCopy={p.value}>{p.isShortCut ? Utility.strShortcut(p.value) : p.value}</Copy> : p.value ?? '-'}
      <div>{p?.suffix}</div>
    </div>
  </div>
}