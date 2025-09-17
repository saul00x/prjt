"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Account {
  id: number
  name: string
  price: number
  image1: string
  image2: string
  detailImage: string
  description: string
  whatsappLink: string
  managers: string[]
  defenders: string[]
  midfielders: string[]
  forwards: string[]
}

export default function AccountDetail() {
  const params = useParams()
  const [account, setAccount] = useState<Account | null>(null)
  const [whatsappLink, setWhatsappLink] = useState("")

  useEffect(() => {
    // Fetch account details from Django API
    const accountId = params.id
    fetch(`http://localhost:8000/api/accounts/${accountId}/`)
      .then(res => res.json())
      .then(data => setAccount(data))
      .catch(err => console.error(err))

    // Fetch WhatsApp link
    fetch('http://localhost:8000/api/whatsapp-link/')
      .then(res => res.json())
      .then(data => setWhatsappLink(data.link))
      .catch(err => console.error(err))
  }, [params.id])

  // Fallback data for development
  const fallbackAccount: Account = {
    id: 1,
    name: "Premium FIFA Account",
    price: 149.99,
    image1: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
    image2: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
    detailImage: "https://images.pexels.com/photos/159204/game-controller-joystick-joypad-gamepad-159204.jpeg",
    description: "This premium FIFA account includes top-tier players and exclusive content.",
    whatsappLink: "https://wa.me/1234567890",
    managers: [
      "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg",
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
    ],
    defenders: [
      "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg",
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
    ],
    midfielders: [
      "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg",
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
    ],
    forwards: [
      "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg",
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
    ]
  }

  const displayAccount = account || fallbackAccount
  const displayWhatsappLink = whatsappLink || "https://wa.me/1234567890"

  const handleBuyNow = () => {
    window.open(displayWhatsappLink, '_blank')
  }

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Large Detail Image */}
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={displayAccount.detailImage}
            alt={displayAccount.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Account Info */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{displayAccount.name}</h1>
          <p className="text-2xl text-yellow-400 mb-4">${displayAccount.price}</p>
        </div>

        {/* Description Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {displayAccount.description}
          </p>
        </div>

        {/* Best Players Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Best Players</h2>
          
          <Tabs defaultValue="managers" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-dark-800">
              <TabsTrigger value="managers" className="text-white">Managers</TabsTrigger>
              <TabsTrigger value="defenders" className="text-white">Defenders</TabsTrigger>
              <TabsTrigger value="midfielders" className="text-white">Midfielders</TabsTrigger>
              <TabsTrigger value="forwards" className="text-white">Forwards</TabsTrigger>
            </TabsList>
            
            <TabsContent value="managers" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {displayAccount.managers.map((image, index) => (
                  <div key={index} className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gradient-to-b from-blue-600 to-red-600 p-1">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Manager ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        95
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 text-white text-xs p-1 rounded text-center">
                        Manager
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="defenders" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {displayAccount.defenders.map((image, index) => (
                  <div key={index} className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gradient-to-b from-blue-600 to-red-600 p-1">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Defender ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {90 + index}
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 text-white text-xs p-1 rounded text-center">
                        CB
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="midfielders" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {displayAccount.midfielders.map((image, index) => (
                  <div key={index} className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gradient-to-b from-blue-600 to-red-600 p-1">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Midfielder ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {88 + index}
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 text-white text-xs p-1 rounded text-center">
                        CM
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="forwards" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {displayAccount.forwards.map((image, index) => (
                  <div key={index} className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gradient-to-b from-blue-600 to-red-600 p-1">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Forward ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {92 + index}
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 text-white text-xs p-1 rounded text-center">
                        ST
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Buy Button */}
        <div className="text-center">
          <Button 
            onClick={handleBuyNow}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-xl"
          >
            Buy Right Now
          </Button>
        </div>
      </div>
    </div>
  )
}