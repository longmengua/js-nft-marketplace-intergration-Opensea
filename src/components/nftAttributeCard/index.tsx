type Props = {
  key?: string;
  value?: string;
}

export const NftAttributeCard = (p: Props) => {
  return <div className="p-[10px] rounded-[10px] box-border">
    <div className="text-gray-500 text-[10px]">{p.key}</div>
    <div className="p-[2.5px]"/>
    <div className="text-[14px] ">{p.value}</div>
  </div>
}