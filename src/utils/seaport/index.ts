import * as seaport from "@opensea/seaport-js/lib/types";
import { Seaport } from "@opensea/seaport-js";
import { ContractReceipt, ContractTransaction } from "ethers";

export class SeaportService {

  static createListedNft = async () => {
    return undefined;
  }

  static buyListedNft = async <T extends seaport.Signer = any>(p: {
    signer: T;
    signer_address: string;
    order_protocol_data: seaport.OrderWithCounter;
  }) => {
    if (!p.signer) throw new Error("Missing signer");
    if (!("_signTypedData" in p.signer)) throw new Error("Incorrect signer");
    if (!p.signer_address) throw new Error("Missing signer/wallet address");
    if (!p.order_protocol_data) throw new Error("Missing order data");

    const seaport = new Seaport(p.signer as seaport.Signer);
    const { executeAllActions } =
      await seaport.fulfillOrder({
        order: p.order_protocol_data,
        accountAddress: p.signer_address,
      });
    const transaction: ContractTransaction = await executeAllActions();
    const t: ContractReceipt = await transaction.wait();
    return t;
  }
}