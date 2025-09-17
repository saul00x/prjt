"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface AccountCardProps {
  id: number
  name: string
  price: number
  image1: string
  image2: string
  detailImage?: string
}

export function AccountCard({ id, name, price, image1, image2 }: AccountCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const handleCheckNow = () => {
    router.push(`/account/${id}`)
  }

  return (
    <div className="bg-dark-800 rounded-lg overflow-hidden">
      <div
        className="relative aspect-square cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCheckNow}
      >
        <Image
          src={isHovered ? image2 : image1}
          alt={name}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-100">{name}</h3>
        <p className="text-gray-400 mb-4">${price.toFixed(2)}</p>
        <Button 
          className="w-full" 
          variant="outline"
          onClick={handleCheckNow}
        >
          Check Now
        </Button>
      </div>
    </div>
  )
}