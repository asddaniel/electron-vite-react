
import { Card } from "@nextui-org/react"
import { HomeIcon, ReceiptIcon, ShoppingCartIcon, DollarSignIcon,
     LogOutIcon, BookIcon, UsersIcon, BaggageClaimIcon, MenuIcon, XCircleIcon } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
// import { Popover } from "@nextui-org/react"


import { motion } from "framer-motion";
import { useLayoutWidth, LayouType } from "@/utils/Store";

export default function Sidebar() {
    const [activetab, setactivetab] = useState(0)
    const [openMenu, setOpenMenu] = useState(false)
    const {setLayoutWidth, sidebar} = useLayoutWidth() as LayouType

    const updateLayout = (state:boolean)=>{
        console.log(state)
        if(state){
            setLayoutWidth({sidebar:"min", page:"full"})
            setOpenMenu(!openMenu)
            return
        }
        setLayoutWidth({sidebar:"full", page:"middle"})
        setOpenMenu(!openMenu)
    }
    return (<>
            <div className={" h-screen py-6 "+(sidebar=="full"?"w-64":"w-16")}>
        <Card className="h-5/6 p-3 bg-slate-800 shadow-lg">
        
        <motion.div layout className="flex justify-end px-3">
        {openMenu? <MenuIcon onClick={()=>updateLayout(true)} className="hover:scale-110 cursor-pointer font-bold transition-all duration-300 text-white "/>:<XCircleIcon onClick={()=>updateLayout(false)} className="hover:scale-110 cursor-pointer font-bold transition-all duration-300 text-white "/>}
        </motion.div>
        
    
      
        <Link to={"/"} className={"flex flex-col justify-evenly pt-6 text-decoration-none "}>
                <div className={"hover:bg-gray-900 transition-all duration-300 py-1 text-white rounded  p-2 flex justify-start gap-2 items-center "+(activetab==0?"bg-gray-950":"")} onClick={()=>setactivetab(0)}>
                    <HomeIcon  />
                    {sidebar=="full" &&<button className="hidden lg:block bg-transparent text-inherit text-start text-2xl font-light rounded-xl outline-none border-none   "> Accueil </button>}
                </div>
               
            </Link>
            <Link to={"/facturation"} className="flex flex-col justify-evenly pt-6">
                <div className={"hover:bg-gray-900  transition-all duration-300 py-1 text-white rounded  p-2 flex justify-start gap-2 items-center "+(activetab==1?"bg-gray-950":"")} onClick={()=>setactivetab(1)}>
                    <ReceiptIcon  />
                    {sidebar=="full" &&<button className=" lg:block hidden bg-transparent text-inherit text-start text-2xl font-light rounded-xl outline-none border-none   "> Facturation </button>}
                </div>
               
            </Link>
            <Link to={"/livraison"} className="flex flex-col justify-evenly pt-6">
                <div className={"hover:bg-gray-900 transition-all duration-300 py-1 text-white rounded  p-2 flex justify-start gap-2 items-center "+(activetab==2?"bg-gray-950":"")} onClick={()=>setactivetab(2)}>
                    <ShoppingCartIcon  />
                    {sidebar=="full" &&<button className="hidden lg:block bg-transparent text-inherit text-start text-2xl font-light rounded-xl outline-none border-none   "> Livraison </button>}
                </div>
               
            </Link>
            <Link to={"/caisse"} className="flex flex-col justify-evenly pt-6">
                <div className={"hover:bg-gray-900 transition-all duration-300 py-1 text-white rounded  p-2 flex justify-start gap-2 items-center "+(activetab==3?"bg-gray-950":"")} onClick={()=>setactivetab(3)}>
                    <DollarSignIcon  />
                    {sidebar=="full" && <button className="hidden lg:block bg-transparent text-inherit text-start text-2xl font-light rounded-xl outline-none border-none   "> caisse </button>}
                </div>
               
            </Link>
            <Link to={"/stock"} className="flex flex-col justify-evenly pt-6">
                <div className={"hover:bg-gray-900 transition-all duration-300 py-1 text-white rounded  p-2 flex justify-start gap-2 items-center "+(activetab==4?"bg-gray-950":"")} onClick={()=>setactivetab(4)}>
                    <BaggageClaimIcon  />
                    {sidebar=="full" && <button className="hidden lg:block bg-transparent text-inherit text-start text-2xl font-light rounded-xl outline-none border-none   "> Stock </button>}
                </div>
               
            </Link>

            <Link to={"/rapport"} className="flex flex-col justify-evenly pt-6">
                <div className={"hover:bg-gray-900 transition-all duration-300 py-1 text-white rounded shadow p-2 flex justify-start gap-2 items-center "+(activetab==5?"bg-gray-950":"")} onClick={()=>setactivetab(5)}>
                    <BookIcon  />
                   {sidebar=="full" && <button className="hidden lg:block bg-transparent text-inherit text-start text-2xl font-light rounded-xl outline-none border-none   "> Rapport </button>}
                </div>
               
            </Link>

            <Link to={"/users"} className="flex flex-col justify-evenly pt-6">
                <div className={"hover:bg-gray-900 hover:shadow-lg transition-all duration-300 py-1 text-white rounded  p-2 flex justify-start gap-2 items-center "+(activetab==6?"bg-gray-950":"")} onClick={()=>setactivetab(6)}>
                    <UsersIcon  />
                   { sidebar=="full" && <button className="hidden lg:block bg-transparent text-inherit text-start text-2xl font-light rounded-xl outline-none border-none   "> Users </button>}
                </div>
               
            </Link>
            <div className="flex flex-col justify-evenly pt-6">
                <div className="hover:bg-gray-800 hover:shadow-lg transition-all duration-300 py-1 text-white rounded  p-2 flex justify-start gap-2 items-center">
                    <LogOutIcon  />
                   { sidebar=="full" &&<button className="hidden lg:block bg-transparent text-inherit text-start text-2xl font-light rounded-xl outline-none border-none   "> Log out </button>}
                </div>
               
            </div>
        </Card>
    </div>
    </>)
}