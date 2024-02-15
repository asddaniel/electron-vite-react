import { Table, TableRow, TableHeader, TableBody, TableCell, TableColumn, Card } from "@nextui-org/react"
import { Tabs, Tab, 
    Button, ModalFooter,
    Modal, ModalBody, ModalHeader, ModalContent } from "@nextui-org/react"
import { EyeIcon, Trash2, FilePenIcon } from "lucide-react"
import { useEffect, useState } from "react"
import {Input, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import { Client, ClientType, Facture, FactureType, LigneFacture, LigneFactureType } from "@/utils/Database";
import Swal from "sweetalert2";
interface dataType {
    clients: ClientType[];
    factures: FactureType[];
}
const defaultClientData = {
    name:"",
    tel:"", 
    created_at:new Date(),
    updated_at:new Date(), 
    special_id:"",
    email:"",
    is_deleted:false,
    id:0,
}

export default function Facturation (){
    const [showfacture, setShowfacture] = useState(false)
    const [modals, setmodals] = useState({createClient:false, show_facture:false, show_lignes:false})
    const [searchClientFocus, setSearchClientFocus] = useState(false)
    const [data, setdata] = useState<dataType>({clients:[], factures:[]})
    const [datatoAdd, setdatatoAdd] = useState({clients:{
        name:"",
        tel:"", 
        created_at:new Date(),
        updated_at:new Date(), 
        special_id:"",
        email:"",
        is_deleted:false,
        id:0,
    } as ClientType, factures:{
        numfacture:"", 
        tempClient:"",
        Client:{},
        created_at:new Date(),
        updated_at:new Date(), 
        special_id:"",
        id:0,
    } as any, ligneFacture:{}})

    useEffect(()=>{
      Promise.all([Facture.all(), Client.all()])
      .then(([factures, clients])=>{
        console.log(clients)
        clients = clients.filter((c)=>c.is_deleted==false);
        factures = factures.filter(f=>f.is_deleted==false);
       
        setdata({clients, factures})
      })
    }, [])

    const createClient = async()=>{
      if(datatoAdd.clients.name.length>0){
        //create random string for special_id
        const special_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
         const all = await Client.all();
         const lenght = all.length
        const newclient = await Client.create({
          ...datatoAdd.clients,
          special_id:special_id,
          id:lenght
        })
        setdata({
          ...data,
          clients:[...data.clients, newclient]
        })
        setdatatoAdd({
          ...datatoAdd,
          clients:{
            name:"",
            tel:"", 
            created_at:new Date(),
            updated_at:new Date(), 
            special_id:"",
            email:"",
            is_deleted:false,
            id:0,
          }
        })
        Swal.fire({
          title:"Ajouté!",
          text:"Le client a été ajouté avec succès.",
          icon:"success",
        })
        return
      }
      Swal.fire({
        title:"Oops..",
        text:"Veuillez remplir tous les champs",
        icon:"error",
      })
    }
    const createSilentClient = async(name:string)=>{
      console.log(name)
      const all = await Client.all();
      console.log(all)
      const newClient  = {
        name:name, 
        created_at:new Date(),
        updated_at:new Date(),
        special_id:Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        email:"",
        is_deleted:false,
        tel:"",
        id:all.length
      }
      const created = await Client.create(newClient)
      console.log(created)
      setdatatoAdd({
        ...datatoAdd,
        factures:{
          ...datatoAdd.factures,
          Client:created, 
          tempClient:name
        }
      })
      setdata({
        ...data, 
        clients:[...data.clients, created]
      })

    }
    const updateClient = async()=>{
      const newClient = await Client.filter({special_id:datatoAdd.clients.special_id}).update({...datatoAdd.clients})
      console.log(newClient)
      setdata({
        ...data, 
        clients: [...data.clients.filter(c=>c.special_id!=datatoAdd.clients.special_id), datatoAdd.clients]
      })
      
      setdatatoAdd({
        ...datatoAdd,
        clients:{
          name:"",
          tel:"", 
          created_at:new Date(),
          updated_at:new Date(), 
          special_id:"",
          email:"",
          is_deleted:false,
          id:0,
        }
      })
      Swal.fire({
        title:"Modifié!",
        text:"Le client a été modifié avec succès.",
        icon:"success",
      })
    }
    const deleteClient = (special_id:string)=>{
      Swal.fire({
        title: "Etes-vous sur de vouloir supprimer ce client ?",
        text: "Vous ne pourrez pas le reprendre!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, supprimer!",
      }).then((confirm)=>{
        if(confirm.isConfirmed){
          Client.filter({special_id:special_id}).update({is_deleted:true, deleted_at:new Date().toLocaleDateString()})
          setdata({
            ...data, 
            clients: data.clients.filter(c=>c.special_id!=special_id)
          })
          Swal.fire(
            "Supprimé!",
            "Le client a été supprimé avec succès.",
            "success"
          )
        }
      })

    }

    const openFacture = ()=>{
        setShowfacture(true)
    }
    const createFacture = async()=>{
      if(!datatoAdd.factures.Client.name){
        Swal.fire({
          title:"Oops..",
          text:"Veuillez selectionner un client",
          icon:"error",
        })
        return
      }
      const all = await Facture.all();
      const special_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const facture = await Facture.create({
          special_id:special_id, 
          created_at:new Date(),
          updated_at:new Date(),
          Client:datatoAdd.factures.Client, 
          id:all.length,
          is_deleted:false,
          is_paid:false,
          numfacture:new Date().toLocaleDateString().toString()+Math.random().toString(36).substring(2, 15),
        })
        setdata({
          ...data, 
          factures:[...data.factures, facture]
        })
        setdatatoAdd({
          ...datatoAdd,
          factures:{
            numfacture:"", 
            tempClient:"",
            created_at:new Date(),
            updated_at:new Date(), 
            special_id:"",
            id:0,
          }
        })
        setShowfacture(false)
        Swal.fire({
          title:"Ajouté!",
          text:"La facture a été ajoutée avec succès.",
          icon:"success",
        })
    }
    return (<div className="w-full bg-inherit font-inherit">

        <Modal isOpen={showfacture} onOpenChange={setShowfacture} size="full" backdrop="blur">
        <ModalContent>
           {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Creer une facture</ModalHeader>
              <ModalBody>
                <p> 
                   <Input label="Client" onFocusChange={(e)=>{
                    console.log(e);
                     setSearchClientFocus(true)
                  }} 
                    onInput={(e:any)=>{
                      setdatatoAdd({
                        ...datatoAdd,
                        factures:{
                          ...datatoAdd.factures,
                          tempClient:e.target.value
                        }
                      })
                    }}
                    value={datatoAdd.factures.tempClient}
                    />
                   

                </p>
                       {/* <div>{JSON.stringify(datatoAdd.factures)}</div>
                       <div>   --- {JSON.stringify(datatoAdd.factures?.Client?.name  )}</div> */}
                      
                <p>
                   {searchClientFocus && <div className="py-2 bg-slate-100 px-2 rounded">
                    {((datatoAdd.factures.tempClient!=datatoAdd.factures?.Client?.name) && datatoAdd.factures.tempClient.length>0)?<div className="py-2 pb-4 mb-8">
                    <Button className="" onClick={()=>createSilentClient(datatoAdd.factures.tempClient)} color="warning">créer le client <span className="text-white font-bold">{datatoAdd.factures.tempClient}</span></Button>
                    </div>:""}
                  
                     {(datatoAdd.factures.tempClient!=datatoAdd.factures?.Client?.name) && data.clients.filter((client)=>client.name.toLocaleLowerCase().includes(datatoAdd.factures.tempClient.toLowerCase())).map((client)=>(
                      <Button  className="w-full text-gray-600 mt-2" key={client.special_id} onClick={()=>setdatatoAdd({...datatoAdd, factures:{...datatoAdd.factures, Client:client, tempClient:client.name}})}>{client.name}</Button>
                     ))}
                   </div>}
                </p>
                <div className="py-5">
                  <button className="rounded p-2 bg-gray-800 text-white" onClick={createFacture}>Ajouter</button>
                </div>
                
              </ModalBody>
              <ModalFooter>
               
                <Button color="primary" onPress={onClose}>
                  Fermer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={modals.createClient} onOpenChange={(e)=>setmodals({...modals, createClient:e})} size="lg" backdrop="blur">
        <ModalContent>
           {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Ajouter un client</ModalHeader>
              <ModalBody>
                <p> 
                   <Input label="Nom" value={datatoAdd.clients.name} onInput={(e:any)=>setdatatoAdd({...datatoAdd, clients:{...datatoAdd.clients, name:e.target.value}})}  />
                </p>
                <p>
                <Input label="tel" value={datatoAdd.clients.tel} onInput={(e:any)=>setdatatoAdd({...datatoAdd, clients:{...datatoAdd.clients, tel:e.target.value}})}   />
                </p>
                <p>
                <Input label="email"  type="email" value={datatoAdd.clients.email} onInput={(e:any)=>setdatatoAdd({...datatoAdd, clients:{...datatoAdd.clients, email:e.target.value}})}  />
                </p>
                <div className="py-5">
                  <button className="rounded p-2 bg-gray-800 text-white" onClick={createClient}>Ajouter</button>
                </div>
                
              </ModalBody>
              <ModalFooter>
               
                <Button color="primary" onPress={onClose}>
                  annuler
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
        <div className="py-4 px-2">
        <h1 className="text-3xl font-bold">Facturation</h1>
        </div>
        <Card className="px-2 p-3 ">
          <div className="flex justify-start items-center gap-2">
              <button onClick={()=>setShowfacture(true)} className="rounded-xl bg-gray-800 p-2 text-white">Creer une facture</button>
              <button onClick={()=>setmodals({...modals, createClient:true})} className="rounded-xl bg-gray-800 p-2 text-white">Creer un client</button>
          </div>
          
        </Card>
        <Tabs>
            <Tab title="Factures" key={"facture"}>
            <div className="p-3">
            <Card className="p-3 py-2">
                <Table aria-label="Liste des factures">
                    <TableHeader>
                        <TableColumn>id</TableColumn>
                        <TableColumn>NumFacture</TableColumn>
                        <TableColumn>Date</TableColumn>
                        <TableColumn>Client</TableColumn>
                        <TableColumn>Total</TableColumn>
                        <TableColumn>Actions</TableColumn>
                    </TableHeader>
                    <TableBody>
                       {data.factures.map((facture, index)=>(
                        <TableRow>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{facture.numfacture}</TableCell>
                        <TableCell>{facture?.created_at?.toLocaleDateString()}</TableCell>
                        <TableCell>{facture.Client.name}</TableCell>
                        <TableCell>--</TableCell>
                        <TableCell>
                            <div className="flex gap-2 items-center justify-center">
                            <EyeIcon className="w-5 h-5 cursor-pointer" onClick={openFacture} />
                            <Trash2 className="w-5 h-5 cursor-pointer" />
                            <FilePenIcon className="w-5 h-5 cursor-pointer" />
                            </div>
                           
                        </TableCell>
                    </TableRow>
                       ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
            </Tab>
            <Tab key={"Clients"} title="Clients">
            <div className="p-3">
            <Card className="p-3 py-2">
                <Table aria-label="Liste des clients">
                    <TableHeader>
                        <TableColumn>id</TableColumn>
                        <TableColumn>Nom</TableColumn>
                        <TableColumn>Tél</TableColumn>
                        <TableColumn>Email</TableColumn>
                        <TableColumn>Actions</TableColumn>
                        
                    </TableHeader>
                    <TableBody>
                       {data.clients.map((client:ClientType, index)=>(
                         <TableRow>
                         <TableCell>{index+1}</TableCell>
                         <TableCell>{client.name}</TableCell>
                         <TableCell>{client.tel}</TableCell>
                         <TableCell>{client.email}</TableCell>
                         <TableCell>
                             <div className="flex gap-2 items-center justify-center">
                             <EyeIcon className="w-5 h-5 cursor-pointer" />
                             <Trash2 className="w-5 h-5 cursor-pointer" onClick={()=>deleteClient(client.special_id)} />
                             <Popover placement="bottom" showArrow={true} onOpenChange={(e)=>{
                                if(e){
                                    setdatatoAdd({...datatoAdd,clients:client})
                                }else{
                                  setdatatoAdd({...datatoAdd,clients:defaultClientData})
                                }
                              }}>
                                <PopoverTrigger>
                                <FilePenIcon className="w-5 h-5 cursor-pointer" />
                                </PopoverTrigger>
                                <PopoverContent>
                                     <div className="rounded border p-2">
                                     <p className="py-2"> 
                   <Input label="Nom" value={datatoAdd.clients.name} onInput={(e:any)=>setdatatoAdd({...datatoAdd, clients:{...datatoAdd.clients, name:e.target.value}})}  />
                </p>
                <p className="py-2">
                <Input label="tel" value={datatoAdd.clients.tel} onInput={(e:any)=>setdatatoAdd({...datatoAdd, clients:{...datatoAdd.clients, tel:e.target.value}})}   />
                </p>
                <p className="py-2">
                <Input label="email"  type="email" value={datatoAdd.clients.email} onInput={(e:any)=>setdatatoAdd({...datatoAdd, clients:{...datatoAdd.clients, email:e.target.value}})}  />
                </p>
                <div className="py-5">
                  <button className="rounded p-2 bg-gray-800 text-white" onClick={updateClient}>modifier</button>
                </div> 
                                     </div>
                                </PopoverContent>
                             </Popover>
                             </div>
                         </TableCell>
                         
                     </TableRow>
                       ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
            </Tab>
        </Tabs>
       
    </div>)
}