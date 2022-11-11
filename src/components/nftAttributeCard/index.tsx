type Props = {
  type: string | undefined;
  value: string | undefined;
}

export const NftAttributeCard = (p: Props) => {
  return <div className="rounded-[10px] box-border flex items-center gap-[2px]">
    <div className="text-gray-500 text-[10px] flex-[1]">{p.type}</div>
    <div className="text-[12px] flex-[3]">{p.value}</div>
  </div>
}