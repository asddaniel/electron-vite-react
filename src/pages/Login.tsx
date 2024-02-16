import { Card, CardHeader, CardBody, Input } from "@nextui-org/react"
import bcrypt from "bcryptjs"
import { useNavigate } from "react-router-dom"
import {User, Usertype} from "@/utils/Database"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
export default function Login(){
   const [users, setusers] = useState<Usertype[]>([])
   const route = useNavigate()
   const [datalogin, setdatalogin] = useState({
       email:"",
       password:""
   })
   useEffect(()=>{
       User.all().then(res=>{
        res = res.filter(r=>r.is_deleted == false);
        setusers(res)
       })
   }, [])
   const connexion = async ()=>{
            if(datalogin.email.length > 0 && datalogin.password.length > 0){
                const user = users.find((u)=>u.email == datalogin.email || u.telephone == datalogin.email)
                if(user){
                    const is_valid = await bcrypt.compare(datalogin.password, user.password)
                    if(is_valid){
                        localStorage.setItem("user", JSON.stringify(user))
                        Swal.fire({
                            title:"Réussi", 
                            text: "Connexion réussi avec succès", 
                            icon:"success", 
                        })
                        .then(()=>route("/"))
                        
                    }else{
                        Swal.fire({
                            title:"Oops..", 
                            text: "Mot de passe incorrect",
                            icon:"error", 
                        })
                    }
            }
            return;
        }
        Swal.fire({
            title:"Oops..",
            text:"Veuillez remplir correctement le formulaire", 
            icon:"error",
        })
   }
    return (
        <div className="p-2 w-full">
            <div className="py-6">
                <div className="text-start px-3 font-bold text-2xl">Login</div>
            </div>
            <div className="w-full flex justify-center">
            <Card className="w-1/2 h-2/3">
            <CardHeader className="font-bold text-2xl"> Login </CardHeader>
            <CardBody className="b-gray-600 p-2 flex flex-col gap-3">
               <Input label="email ou telephone" value={datalogin.email} onInput={(e:any)=>setdatalogin({...datalogin, email:e.target.value})} />
                <Input label="Mot de passe" type="password" value={datalogin.password} onInput={(e:any)=>setdatalogin({...datalogin, password:e.target.value})} />
                <div className="py-2">
                    <button className="rounded p-2 bg-gray-800 text-white" onClick={connexion}>Connexion</button>
                </div>
            </CardBody>
               
            </Card>
            </div>
           
            
        </div>
    )
}