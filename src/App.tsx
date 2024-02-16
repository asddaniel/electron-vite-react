import { useState } from 'react'
import UpdateElectron from '@/components/update'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
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


function App() {
  const {page, sidebar} = useLayoutWidth() as LayouType
  
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
       
      
              <Route>
                <Route path='/' element={<Home />} />
                <Route path='/stock' element={<Stock />} />
                <Route path='/facturation' element={<Facturation />} />
                <Route path='/users' element={<Users />} />
                <Route path='/login' element={<Login />} />
              </Route>
       </Routes>
   </div>
     
    </Router>
      
      {/* <UpdateElectron /> */}
    </motion.div>
    </NextUIProvider>
   
  )
}

export default App