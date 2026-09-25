

"use client";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";


export default function Navbar(){
    const pathname = usePathname ();
    return (
        <nav className="flex justify-between items-center px-6 py-4 border-b border-white/10">


        <div className="flex items-center gap-2">
            
  <Image src="/logo.png" alt="FitLog logo" width={28} height={28} />
  <div className="text-2xl font-black tracking-tight">FITLOG</div>
</div>
        
        
        
        
        
         {/* <div className="text-2xl font-black tracking-tight">
          <Link href="/">FITLOG</Link>  
          </div> */}


          <div className="flex gap-6">

          <Link href="/"
          className={`text-sm font-bold
            ${pathname === "/" ? "text-[#ccff00]" : "text-white"}`}>
                WORKOUT</Link>  

          <Link href="/my-plan" 
          className={`text-sm font-bold 
          pathname === "/my-plan" ? "text-[#ccff00]" :  "text-white"}`}> MY PLAN</Link> 
          </div>



          <div className="flex gap-6">
             <Link
              href="/my-plan"
              className="rounded-full bg-[#ccff00] px-4 py-2 text-sm font-bold font-bold text-black">
                PLAN 0</Link>  

         <Link
             href="/my-plan"
             className="rounded-full border border-[#ccff00] px-4 py-2 font-bold">
                SAVED 0
            </Link>
           </div>
        

        </nav>
    )

}




















// import ink from "next/link";
