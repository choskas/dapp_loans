"use client"
import { Button } from "@/components/ui/button";
import { AddressLike, ethers } from "ethers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react"
import Loader from "../loader";
import { GeneralContext } from "@/context";

const NavBar = () => {
  const router = useRouter()
  const { state, dispatch } = useContext(GeneralContext);
    const [hideBar, setHideBar] = useState(false)
    const [wallet, setWallet] = useState<AddressLike[]>([""]);
    const [balance, setBalance] = useState<{wallet: number, balance: string}[] | null>(null);
    const [loading, setLoading] = useState(false)
console.log(state)
    const getUserWalletBalance = async (walletAddress: AddressLike[]) => {
      try {
        setLoading(true)
        const network = "sepolia";
        const provider = ethers.getDefaultProvider(network);
        const balancePromises = walletAddress.map(async (item, key) => {
          const balanceItem = await provider.getBalance(item);
          const balanceInEth = ethers.formatEther(balanceItem);
          return {wallet: key+1, balance: balanceInEth, address: item};
      });
      const balanceArr = await Promise.all(balancePromises);
        dispatch({type: 'UPDATE_USER', data: balanceArr})
        setBalance(balanceArr);

    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
      };

    const connectWallet = () => {
        if (window.ethereum) {
          window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((result: AddressLike[]) => {
              console.log(result, "po");
              setWallet(result);
              getUserWalletBalance(result);
            });
        } else {
          console.log("metamask not installed");
        }
      };
    useEffect(() => {
        const handle = (e: Event) => {

            const position = window.scrollY
            if (position >= 100){
                setHideBar(true)
            } else {
                setHideBar(false)
            }
        }
        window.addEventListener('scroll', handle)
        return () => {
            window.removeEventListener('scroll', handle)
        }
    }, [])
    return (
        <nav className={`px-[24px] h-[56px] w-full flex items-center justify-between translate fixed left-0 top-0 bg-backgroundAlt transition ease-in-out duration-200 ${hideBar ? '-translate-y-96' : ''}`}>
          <section className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
            <Image width={24} height={24} className="mr-[12px]" src="/assets/imgs/logo.png" alt="logo"/>
            <p className="font-bolder text-[24px]">Descentralized Loans</p>
            </section>
            <section className="flex items-center">
              <p className="mr-[24px] cursor-pointer" onClick={() => router.push('/oportunities')}>Oportunities</p>
              <p className="mr-[24px] cursor-pointer" >My loans</p>
              <p className="mr-[24px] cursor-pointer" onClick={() => router.push('/debts')}>My debts</p>
              <p className="mr-[24px] cursor-pointer">About</p>
            </section>
            <section className="flex items-center">
                <div className="font-bold mr-[24px]">{balance ? balance.map((item) => <p key={item.wallet}>{item.wallet}: ${parseFloat(item.balance).toFixed(9)} ETH</p>) : ''}</div>
                {!balance && !loading && (
            <Button onClick={connectWallet}>Connect wallet</Button>
                )}
                {loading && <Loader title="Loading wallet..." />}

            </section>
        </nav>
    )
}

export default NavBar