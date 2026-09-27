

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";


export default function Navbar(){
    const pathname = usePathname ();





    const [planCount, setPlanCount] = useState(0);
const [savedCount, setSavedCount] = useState(0);

useEffect(() => {
  function updateCounts() {
    const plan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    const saved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    setPlanCount(plan.length);
    setSavedCount(saved.length);
  }

  updateCounts();

  window.addEventListener("fitlog-updated", updateCounts);

  return () => {
    window.removeEventListener("fitlog-updated", updateCounts);
  };
}, []);



    return (
<nav className="flex flex-col gap-4 border-b border-white/10 px-6 py-4 md:flex-row md:items-center md:justify-between">

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

         <Link
  href="/my-plan"
  className={`text-sm font-bold ${
    pathname === "/my-plan" ? "text-[#ccff00]" : "text-white"
  }`}
>
  MY PLAN
</Link>
         
          </div>

          <div className="flex gap-6">
             <Link
              href="/my-plan"
              className="rounded-full bg-[#ccff00] px-4 py-2 text-sm font-bold font-bold text-black">
                 PLAN {planCount}</Link>  

         <Link
             href="/my-plan"
             className="rounded-full border border-[#ccff00] px-4 py-2 font-bold">
                SAVED {savedCount}
            </Link>
           </div>
        

        </nav>
    )

}




















// import ink from "next/link";
