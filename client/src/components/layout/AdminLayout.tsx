import {Outlet} from 'react-router-dom'

export function AdminLayout(){
   return(
    <>
    <div className="min-h-screen bg-background txet-forground">
        <main className='mx-auto '> 
           <Outlet/>
       </main>
    </div>
    </>
   ) 
}