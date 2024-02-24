import { useEffect, useState } from 'react'
import UpdateElectron from '@/components/update'
import { Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Sidebar from './layouts/Sidebar'
import Home from './pages/Home'
import Facturation from './pages/Facturation'
import { useLayoutWidth, LayouType } from './utils/Store'
import { motion } from 'framer-motion'
import Stock from './pages/Stock'
import { NextUIProvider } from '@nextui-org/react'
import Users from './pages/Users'
import Login from './pages/Login'
import Caisse from './pages/Caisse'
import {Livraison as Livra} from './pages/Livraison'
import { models } from '@/utils/beast'
import Rapport from './pages/Rapport'
import { useAuth } from './utils/Store'

import { Produit, Depense as DataDepense, Categorie, Client, Facture, Fournisseur, Approvisionnement, LigneFacture, Livraison , CodeBarre, RoleUser, Reduction, Paiement, LivraisonLine, User, Role } from './utils/Database'
import Depense from './pages/Depense'
models.register({
  databaseName:"mtech", 
  version:1, 
  type: "indexedDB", 
  models: [User, Role, Categorie, Produit, Client, Facture, Fournisseur, Approvisionnement, LigneFacture, Livraison,
          CodeBarre, RoleUser, Reduction, Paiement, LivraisonLine, DataDepense]
})


const isproductionroute = /^\/[A-Z]:\//;
function App() {
  const {page, sidebar} = useLayoutWidth() as LayouType
   const {auth, setAuth}:any = useAuth()
   const [reloadstate, setreloadstate] = useState(false)
//  const [AuthState, setAuthState] = useState({
//   user:{}, 
//   isAuthenticated: false
//  })
const actualiser = ()=>{
  setreloadstate(!reloadstate)
}
 useEffect(()=>{
   const user = localStorage.getItem("user")
   if(user){
     setAuth({isLogged:true, user:JSON.parse(user)})
     console.log(auth, user)
   }
   
 }, [reloadstate])
  
  return (
    <NextUIProvider>
         <motion.div layout className='grid grid-cols-9 gap-1 font-sans px-8 lg:px-1 font-sans'>
      <div className="w-5/6 hidden"></div>
    <Router >
    <div className={"inline-block transition-all duration-300 flex justify-center col-span-1   overflow-x-auto "+(page=="full"?"lg:col-span-1":"lg:col-span-2")}>
    <Sidebar />  
        </div>
  
   <div className={" inline-block flex justify-center  transition-all duration-300 col-span-8 "+(page=="full"?"lg:col-span-8":"lg:col-span-7")}>
    
          <Routes>
       
      {isproductionroute.test(location.pathname)?(
        <Route >
        <Route path='/C:/' element={auth.isLogged ? <Home />: <Login actualiser={actualiser} />} />
        <Route path='/C:/stock' element={auth.isLogged ? <Stock />: <Login actualiser={actualiser} />} />
        <Route path='/C:/depense' element={auth.isLogged ? <Depense />: <Login actualiser={actualiser} />} />
        <Route path='/C:/rapport' element={auth.isLogged ? <Rapport />: <Login actualiser={actualiser} />} />
        <Route path='/C:/facturation' element={auth.isLogged ? <Facturation />: <Login actualiser={actualiser} />} />
        <Route path='/C:/users' element={auth.isLogged ? <Users />: <Login actualiser={actualiser} />} />
        <Route path='/C:/login' element={<Login actualiser={actualiser} />} />
        <Route path='/C:/caisse' element={auth.isLogged ? <Caisse />: <Login actualiser={actualiser} />} />
        <Route path='/C:/livraison' element={auth.isLogged ? <Livra/>: <Login actualiser={actualiser} />} />
      </Route>
      ):(<Route>
        <Route path='/' element={auth.isLogged ? <Home /> : <Login actualiser={actualiser} />} />
        <Route path='/stock' element={auth.isLogged ? <Stock />: <Login actualiser={actualiser} />} />
        <Route path='/depense' element={auth.isLogged ? <Depense />: <Login actualiser={actualiser} />} />
        <Route path='/rapport' element={auth.isLogged ? <Rapport />: <Login actualiser={actualiser} />} />
        <Route path='/facturation' element={auth.isLogged? <Facturation />: <Login actualiser={actualiser} />} />
        <Route path='/users' element={auth.isLogged ? <Users />: <Login actualiser={actualiser} />} />
        <Route path='/login' element={<Login actualiser={actualiser} />} />
        <Route path='/caisse' element={auth.isLogged ? <Caisse />: <Login actualiser={actualiser} />} />
        <Route path='/livraison' element={auth.isLogged ? <Livra />: <Login actualiser={actualiser} />} />
      </Route>)}
              {/* <Route>
                <Route path='/' element={<Home />} />
                <Route path='/stock' element={<Stock />} />
                <Route path='/facturation' element={<Facturation />} />
                <Route path='/users' element={<Users />} />
                <Route path='/login' element={<Login />} />
                <Route path='/caisse' element={<Caisse />} />
                <Route path='/livraison' element={<Livraison />} />
              </Route> */}
       </Routes>
   </div>
     
    </Router>
      
      {/* <UpdateElectron /> */}
    </motion.div>
    </NextUIProvider>
   
  )
}

export default App