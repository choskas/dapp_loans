"use client";
import { Button } from "@/components/ui/button";
import { AddressLike } from "ethers";
import { ethers } from "ethers";
import { useTheme } from "next-themes";
import { useState } from "react";
import Web3 from "web3";
import { useToast } from "@/components/ui/use-toast";
import { CrossIcon } from "lucide-react";

const Home = () => {
  const { toast } = useToast()
  const { setTheme, theme } = useTheme();

  const sendTransaction = async (wallet: AddressLike) => {
    const params = [
      {
        from: wallet,
        to: "0x5961d9e3BdfbcBB8aF5acaA21803fC2E45d59073",
        // gas: Number(200000).toString(16),
        // gasPrice: Number(2100000).toString(16),
        value: Web3.utils.toWei(0.0001, 'ether'),
      },
    ];
    
    try {
      const results = await window.ethereum.request({
        method: "eth_sendTransaction",
        params,
      });
      toast({
        title: "Se ha enviado 0.0001 ETH a: ",
        description: results,
      })
      return results
    } catch (error: any ) {
      if (error.code === 4001) {
        toast({title: 'Se ha rechazado la transacción', variant: "destructive"})
      }
    }
  };
  const changeTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <section className="mt-[56px] px-[24px]">
        <div className="flex items-center h-[500px]">
            <div className="w-[50%]">
   <h1 className="text-[64px] font-bolder leading-[60px] mb-[24px]"><span className="text-purpleSecondary">Lend</span> to <span className="text-purpleSecondary">anybody</span>, <span className="text-purpleSecondary">anytime</span>.</h1>
   <p className="font-bold text-[20px]">Stop saving your ETH in your wallet and make some profit with it.</p>
   </div>
   <div className="w-1/2"></div>
   </div>
   <div className="flex items-center h-[500px]">
    <div className="w-1/2"></div>
    <div className="flex flex-col">
    <h2 className="text-[64px] font-bolder leading-[60px] mb-[24px]"><span className="text-purpleSecondary">Lend</span> ETH without register.</h2>
    <p className="font-bold text-[20px]">Connect your wallet through metamask and start lending/investing.</p>
    </div>
   </div>
   <div className="flex items-center h-[500px]">
    <div className="flex flex-col">
    <h2 className="text-[64px] font-bolder leading-[60px] mb-[24px]">Choose your ideal opportunity to <span className="text-purpleSecondary">invest</span>.</h2>
    <p className="font-bold text-[20px]">Generate interest depending on the oportunity risk.</p>
    </div>
    <div className="w-1/2"></div>
   </div>
   {/* Choose your ideal opportunity to invest and generate interest */}

      {/* <Button className="w-[200px]" onClick={changeTheme}>Change theme</Button>
      {!wallet &&   <Button className="w-[200px] self-center my-[24px]" onClick={connectWallet}>Connect wallet</Button>}
      <p className="text-center">
      La dirección de tu wallet es: <span>{wallet as any}</span></p>
      <p className="text-center">Tienes disponibles: {balance} ETH </p>
      <Button className="w-[200px] self-center my-[24px]" onClick={sendTransaction}>Enviar ETH</Button> */}
    </section>
  );
};

export default Home