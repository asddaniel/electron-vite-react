import Datepicker from "react-tailwindcss-datepicker"
import { useState, useRef, useEffect } from "react"
import { Facture, ClientType, Client, FactureType, LigneFactureType, Produit, ProduitType } from "@/utils/Database"
import useKeyboardShortcut from "use-keyboard-shortcut"
import { useReactToPrint } from "react-to-print"
import { getPageStyle } from "@/utils/Facade"
import { Switch, Card, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs, Tooltip } from "@nextui-org/react";


interface DataFacture {
    Facture:FactureType|{},
    Lignes:LigneFactureType[], 
    suggestion:string,
    toAdd?:{
      quantite:number,
      Produit?:ProduitType
    }
}

interface dataType {
    clients: ClientType[];
    factures: FactureType[];
    produits: ProduitType[];
}

export default function RapportFacture(){

    const [filterdate, setFilterDate] = useState({startDate:new Date(Date.now()-86400000), 
        endDate:new Date()})
        const printer = useRef(null)
        const [searchFacture, setsearchFacture] = useState("");
        const [data, setdata] = useState<dataType>({clients:[], factures:[], produits:[]})
    
        const { flushHeldKeys } = useKeyboardShortcut(
          ["Control", "P"],
          shortcutKeys => {console.log("Shift + H has been pressed.");
        imprimer()},
          { 
            overrideSystem: false,
            ignoreInputFields: false, 
            repeatOnHold: false 
          }
        );
        const [dataFacture, setdataFacture] = useState<DataFacture>({
          Facture:{},
          Lignes:[], 
          suggestion:"", 
          toAdd:{quantite:0, Produit:{} as any}
        })
        useEffect(()=>{
            Promise.all([Facture.all(), Client.all(), Produit.all()])
      .then(([factures, clients, products])=>{
        console.log(clients)
        clients = clients.filter((c)=>c.is_deleted==false);
        factures = factures.filter(f=>f.is_deleted==false).reverse();
        console.log(factures)
       const produits = products.filter(p=>p.is_deleted==false).reverse();
       
        setdata({clients, factures, produits})
      })
        }, [])


        const imprimer = async ()=>{
            document.querySelector(".header-printer")?.classList.remove("hidden")
            const all = document.querySelectorAll(".no-print");
            all.forEach((e)=>e.classList.add("hidden"))
            await handlePrint();
            document.querySelector(".header-printer")?.classList.add("hidden")
            all.forEach((e)=>e.classList.remove("hidden"))
          }
      
          const handlePrint = useReactToPrint({
            content: () => printer.current,
            documentTitle: 'facture '+(dataFacture?.Facture as FactureType).numfacture,
            copyStyles:true, 
            pageStyle: () => getPageStyle(),
          });
    

    return <div>
        <div className="w-full h-full p-2">
            <div className="py-3 px-2 bg-white">
            

            <div className="py-3">
            <div className="p-3">
              <div className="py-3">
                <Input label="Rechercher par numéro de facture" value={searchFacture} onInput={(e:any)=>setsearchFacture(e.target.value)} />
              </div>
              <div className="py-3">
              <Datepicker 
                    value={filterdate as any} 
                onChange={(value:any)=>{
                  setFilterDate({startDate:new Date(value.startDate), endDate:new Date(value.endDate)})
                  // console.log(value)
                  data.factures.map(f=>{
                    console.log(filterdate.startDate<(f?.created_at as any), filterdate.endDate>(f?.created_at as any))
                    console.log(((f?.created_at as any )>=filterdate.startDate) && (f?.created_at as any) <=filterdate.endDate)
                  })
                }} 
                popoverDirection="down"
                />
              </div>
              <div className="py-3">
                <div>Tableau </div>
              <Switch defaultSelected aria-label="switcher entre les labels"/>
              </div>
              
            <Card className="p-3 py-2">
                <Table aria-label="Liste des factures">
                    <TableHeader>
                        <TableColumn>id</TableColumn>
                        <TableColumn>NumFacture</TableColumn>
                        <TableColumn>Date</TableColumn>
                        <TableColumn>Client</TableColumn>
                        <TableColumn>Total</TableColumn>
                       
                    </TableHeader>
                    <TableBody>
                       {(data.factures.reverse()).filter((f)=>((new Date((f.created_at as any).toString().split("/").reverse().join("-")).getTime()>=filterdate.startDate.getTime()) && (new Date((f.created_at as any).toString().split("/").reverse().join("-")).getTime()<=filterdate.endDate.getTime()))).filter(f=>f.numfacture?.includes(searchFacture)).map((facture, index)=>(
                        <TableRow key={facture.special_id}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{facture.numfacture}</TableCell>
                        <TableCell>{facture?.created_at?.toLocaleDateString()}</TableCell>
                        <TableCell>{facture.Client.name}</TableCell>
                        <TableCell>--</TableCell>
                        
                    </TableRow>
                       ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
            </div>
            </div>
        </div>
    </div>
}