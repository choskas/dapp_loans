"use client"
import CustomTable from "@/components/common/table"
import { Button } from "@/components/ui/button"
import { GeneralContext } from "@/context"
import { sendTransaction } from "@/lib/web3"
import { ColumnDef } from "@tanstack/react-table"
import { AddressLike } from "ethers"
import { GitCommitIcon } from "lucide-react"
import { useContext } from "react"
import Web3 from "web3"
export type Payment = {
    id?: string
    amount: number | string
    username: string
    apr: string | number
    risk: string
    walletAddress: AddressLike
  }


const Oportunites = () => {
  const { state, dispatch } = useContext(GeneralContext);
  console.log(state, 'ppppp')
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "username",
      header: "Alias",
    },
    {
      accessorKey: "amount",
      header: "ETH",
      cell: ({ row }) => {
        return `$ ${row.getValue('amount')}`
      }
    },
    {
        id: 'apr',
        accessorKey: "apr",
        header: "APR",
        cell: ({ row }) => {
            return `$ ${row.getValue('apr')}`
          }
      },
      {
        accessorKey: "risk",
        header: "Risk",
      },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
            <Button
            onClick={async () => {
                await sendTransaction(state.user[0].address, row.original.walletAddress, row.original.amount as number)
            }}
            ><GitCommitIcon /> Pay debt </Button>
        )
      }
    },
  ]
    return (<section className="mt-[68px] px-[24px]">
        <div className="px-[64px]">
        <CustomTable columns={columns} data={[{username: 'Choskas', amount: 0.000001, apr: 16, risk: 'A1', walletAddress: '0xe09130c10f68cfcb266b96cd1a81b56d27dd3949'}]} />
        </div>
    </section>)
}

export default Oportunites