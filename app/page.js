"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router=useRouter()
  useEffect(()=>{
    router.push('/dashboard/')
  })
  return (
    <div className="flex items-center flex-row justify-center ">
      <h4 className="text-red-700 font-serif  size-9 mt-9" >Welcome to Hirewise</h4>
    </div>
  );
}
