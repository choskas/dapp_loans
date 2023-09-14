import { toast } from "@/components/ui/use-toast";
import { AddressLike } from "ethers";
import Web3 from "web3";

export const sendTransaction = async (from: AddressLike, to: AddressLike, value: number) => {
    const params = [
      {
        from,
        to,
        // gas: Number(200000).toString(16),
        // gasPrice: Number(2100000).toString(16),
        value: Web3.utils.toWei(value, 'ether'),
      },
    ];
    
    try {
      const results = await window.ethereum.request({
        method: "eth_sendTransaction",
        params,
      });
      toast({
        title: `Se ha enviado ${value} ETH a: `,
        description: results,
      })
      return results
    } catch (error: any ) {
        console.log(error)
      if (error.code === 4001) {
        toast({title: 'Se ha rechazado la transacción', variant: "destructive"})
      }
    }
  };