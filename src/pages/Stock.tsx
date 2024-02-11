import { Tab, Tabs, Card, TableRow, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react"
import { Table, TableBody, TableHeader, TableColumn, TableCell, Button, ModalHeader } from "@nextui-org/react"
import { FilePenLine, Trash2 } from "lucide-react"
import Swal from "sweetalert2"
import { Modal, ModalContent } from "@nextui-org/react"
import { useState } from "react"


const exampleproduits = [
    {name:"Ananas", 
quantite:34, 
prix:4.5},
{name:"Arachide", 
quantite:34, 
prix:4.5},
]

const exampleFournisseur = [
    {name:"Bernard", 
    telephone:"0974080251", 
    email:"john@doe.com"},
    {name:"Micheal", 
    telephone:"0899687664",  
    email:"micheal@doe.com"},
]

export default function Stock (){
    const [modalProduct, setModalProduct] = useState(false);
    const [modalFournisseur, setModalFournisseur] = useState(false);
    const deleteProduit = ()=>{

        Swal.fire({
            title: "Etes vous sur ?",
            text: "cet action est irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0F172A",
            cancelButtonColor: "#d33",
            confirmButtonText: "oui, supprimer!",
            cancelButtonText:"annuler"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Supprimé!",
                text: "le produit a été supprimé avec succès.",
                icon: "success"
              });
            }
          });
    }

    const deleteFournisseur = ()=>{
        Swal.fire({
            title: "Etes vous sur ?",
            text: "cet action est irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0F172A",
            cancelButtonColor: "#d33",
            confirmButtonText: "oui, supprimer!",
            cancelButtonText:"annuler"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Supprimé!",
                text: "le fournisseur a été supprimé avec succès.",
                icon: "success"
              });
            }
          });
    }

    return (
        <div className="w-full bg-inherit font-inherit font-sans ">
            <Modal isOpen={modalProduct} onClose={() => setModalProduct(false)} size="5xl" >
            
                <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Ajouter un produit</ModalHeader>
                    {/* <h1>Ajouter un produit</h1> */}
                    <div className="border border-gray-300 rounded mx-0 p-3 font-sans ">
                            <div className="w-full ">
                                <label htmlFor="" className="block font-bold w-full font-inherit">Name</label>
                                <input type="text" className="border w-full border-gray-300 border-2 inset rounded p-2" placeholder="ex:John Doe"/>
                            </div>
                            <div>
                                <label htmlFor="" className="block font-bold  font-inherit">Prix</label>
                                <input type="number" className="border border-gray-300 border-2 w-full inset rounded p-2" placeholder="ex:234 000"/>
                            </div>
                            <div>
                                <label htmlFor="" className="block font-bold font-inherit">Quantité</label>
                                <input type="number" className="border border-gray-300 border-2 w-full inset rounded p-2" placeholder="ex:67000"/>
                            </div>
                            <div>
                                <label htmlFor="" className="block font-bold font-inherit">Description</label>
                                <textarea className="border w-full border-gray-300 border-2w-full inset rounded p-2" placeholder="ex:John Doe"/>
                            </div>
                            <div className="pt-3">
                                <Button color="primary" className="outline-none border-none cursor-pointer">Enregistrer</Button>
                            </div>
                      
                        </div>
                </ModalContent>
            </Modal>
            <Modal isOpen={modalFournisseur} onClose={() => setModalFournisseur(false)} size="5xl" >
            
                <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Ajouter un fournisseur</ModalHeader>
                    {/* <h1>Ajouter un produit</h1> */}
                    <div className="border border-gray-300 rounded mx-0 p-3 font-sans ">
                            <div className="w-full ">
                                <label htmlFor="" className="block font-bold w-full font-inherit">Name</label>
                                <input type="text" className="border w-full border-gray-300 border-2 inset rounded p-2" placeholder="ex:John Doe"/>
                            </div>
                            <div>
                                <label htmlFor="" className="block font-bold  font-inherit">Tél</label>
                                <input type="number" className="border border-gray-300 border-2 w-full inset rounded p-2" placeholder="ex:234 000"/>
                            </div>
                            <div>
                                <label htmlFor="" className="block font-bold font-inherit">Email</label>
                                <input type="number" className="border border-gray-300 border-2 w-full inset rounded p-2" placeholder="ex:67000"/>
                            </div>
                            <div>
                                <label htmlFor="" className="block font-bold font-inherit">Description</label>
                                <textarea className="border w-full border-gray-300 border-2w-full inset rounded p-2" placeholder="ex:John Doe"/>
                            </div>
                            <div className="pt-3">
                                <Button color="primary" className="outline-none border-none cursor-pointer">Enregistrer</Button>
                            </div>
                      
                        </div>
                </ModalContent>
            </Modal>

            <h1>Stock</h1>
            
            <div className="pt-3 pb-2 px-3">
                <Tabs color="primary" className="bg-white px-3">
                    <Tab key={"Produits"} title="Produits" className="border-none">
                        
                        <div className="py-6 flex gap-2 w-full  px-3 justify-start items-center">
                            <Card className="p-3">
                                <Button onClick={() => setModalProduct(true)} className="border-none outline-none text-white bg-slate-800 cursor-pointer">Ajouter un produit</Button>
                            </Card>
                            <Card className="p-2 w-full  flex flex-row  gap-2">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </div>
                                <input type="text" placeholder="rechercher " className="p-2 rounded border inline-block w-full" />
                                <span className="px-2 inline-block"><Button>Rechercher</Button></span>
                            </Card>
                        </div>

                        <div className="px-8">
                            <div className="pt-3 pb-3">
                                
                            </div>
                        <Table aria-label="Example empty table">
                    <TableHeader>
                        <TableColumn>Nom</TableColumn>
                        <TableColumn>Prix</TableColumn>
                        <TableColumn>Quantité</TableColumn>
                        <TableColumn>Actions</TableColumn>
                    </TableHeader>
      <TableBody emptyContent={"aucun produit disponible."}>{exampleproduits.map((produit, index)=>(
        <TableRow key={index}>

            <TableCell>{produit.name}</TableCell>
            <TableCell>{produit.prix}</TableCell>
            <TableCell>{produit.quantite}</TableCell>
            <TableCell>
                <div className="flex gap-4">
                   <Popover placement="top-end" showArrow={true}>
                    <PopoverTrigger>
                    <FilePenLine className="cursor-pointer"></FilePenLine>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="border border-gray-300 rounded p-3 font-sans">
                            <div>
                                <label htmlFor="" className="block font-bold font-inherit">Name</label>
                                <input type="text" className="border border-gray-300 border-2 inset rounded p-2" placeholder="ex:John Doe"/>
                            </div>
                            <div>
                                <label htmlFor="" className="block font-bold font-inherit">Prix</label>
                                <input type="number" className="border border-gray-300 border-2 inset rounded p-2" placeholder="ex:234 000"/>
                            </div>
                            <div>
                                <label htmlFor="" className="block font-bold font-inherit">Quantité</label>
                                <input type="number" className="border border-gray-300 border-2 inset rounded p-2" placeholder="ex:67000"/>
                            </div>
                            <div>
                                <label htmlFor="" className="block font-bold font-inherit">Description</label>
                                <input type="text" className="border border-gray-300 border-2 inset rounded p-2" placeholder="ex:John Doe"/>
                            </div>
                            <div className="pt-3">
                                <Button color="primary" className="outline-none border-none cursor-pointer">Enregistrer</Button>
                            </div>
                      
                        </div>
                    </PopoverContent>
                   </Popover>
                   <Trash2 onClick={deleteProduit} className="cursor-pointer"/>
                </div>
            </TableCell>
        </TableRow>
      ))}</TableBody>
    </Table>

                        </div>

                    </Tab>
                    <Tab className="border-none" key={"fournisseurs"} title="Fournisseurs">
                    <div className="py-6 flex gap-2 w-full  px-3 justify-start items-center">
                            <Card className="p-3">
                                <Button onClick={() => setModalFournisseur(true)} className="border-none p-2 outline-none text-white bg-slate-800 cursor-pointer"> <span className="p-2">Ajouter un fournisseur </span></Button>
                            </Card>
                            <Card className="p-2 w-full  flex flex-row  gap-2">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </div>
                                <input type="text" placeholder="rechercher " className="p-2 rounded border inline-block w-full" />
                                <span className="px-2 inline-block"><Button className="p-3">Rechercher</Button></span>
                            </Card>
                        </div>

                        <div className="px-8">
                            <div className="pt-3 pb-3">
                                
                            </div>
                        <Table aria-label="Example empty table">
                    <TableHeader>
                        <TableColumn>Nom</TableColumn>
                        <TableColumn>Email</TableColumn>
                        <TableColumn>Télephone</TableColumn>
                        <TableColumn>Actions</TableColumn>
                    </TableHeader>
      <TableBody emptyContent={"aucun fournisseur disponible."}>{exampleFournisseur.map((fournisseur, index)=>(
        <TableRow key={index}>

            <TableCell>{fournisseur.name}</TableCell>
            <TableCell>{fournisseur.email}</TableCell>
            <TableCell>{fournisseur.telephone}</TableCell>
            <TableCell>
                <div className="flex gap-4">
                   <Popover placement="top-end" showArrow={true}>
                    <PopoverTrigger>
                    <FilePenLine className="cursor-pointer"></FilePenLine>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="border border-gray-300 rounded p-3 font-sans">
                            <div>
                                <label htmlFor="" className="block font-bold font-inherit">Name</label>
                                <input type="text" className="border border-gray-300 border-2 inset rounded p-2" placeholder="ex:John Doe"/>
                            </div>
                            <div>
                                <label htmlFor="" className="block font-bold font-inherit">Email</label>
                                <input type="number" className="border border-gray-300 border-2 inset rounded p-2" placeholder="ex:234 000"/>
                            </div>
                            <div>
                                <label htmlFor="" className="block font-bold font-inherit">Télephone</label>
                                <input type="number" className="border border-gray-300 border-2 inset rounded p-2" placeholder="ex:67000"/>
                            </div>
                            <div>
                                <label htmlFor="" className="block font-bold font-inherit">Description</label>
                                <input type="text" className="border border-gray-300 border-2 inset rounded p-2" placeholder="ex:John Doe"/>
                            </div>
                            <div className="pt-3">
                                <Button color="primary" className="outline-none border-none cursor-pointer">Enregistrer</Button>
                            </div>
                      
                        </div>
                    </PopoverContent>
                   </Popover>
                   <Trash2 onClick={deleteFournisseur} className="cursor-pointer"/>
                </div>
            </TableCell>
        </TableRow>
      ))}</TableBody>
    </Table>

                        </div>

                    </Tab>
                    <Tab key={"stat"} className="border-none" title="Stat">Stat</Tab>
                </Tabs>
            </div>
        </div>
    )
}