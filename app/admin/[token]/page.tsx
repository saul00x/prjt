"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPanel() {
  const params = useParams()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [whatsappLink, setWhatsappLink] = useState("")

  useEffect(() => {
    // Verify admin token
    const token = params.token
    fetch(`http://localhost:8000/api/verify-admin/${token}/`)
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true)
          loadData()
        } else {
          router.push('/')
        }
      })
      .catch(() => router.push('/'))
  }, [params.token, router])

  const loadData = () => {
    // Load accounts
    fetch('http://localhost:8000/api/accounts/')
      .then(res => res.json())
      .then(data => setAccounts(data))

    // Load WhatsApp link
    fetch('http://localhost:8000/api/whatsapp-link/')
      .then(res => res.json())
      .then(data => setWhatsappLink(data.link))
  }

  const handleAddAccount = (formData: FormData) => {
    fetch('http://localhost:8000/api/accounts/', {
      method: 'POST',
      body: formData
    })
    .then(() => loadData())
  }

  const handleUpdateWhatsApp = () => {
    fetch('http://localhost:8000/api/whatsapp-link/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link: whatsappLink })
    })
    .then(() => alert('WhatsApp link updated!'))
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <div className="text-white">Verifying access...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Bergomi Store - Admin Panel</h1>
        
        <Tabs defaultValue="accounts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-dark-800">
            <TabsTrigger value="accounts">Manage Accounts</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp Link</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="accounts" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-dark-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Add New Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <AccountForm onSubmit={handleAddAccount} />
                </CardContent>
              </Card>
              
              <Card className="bg-dark-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Existing Accounts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {accounts.map((account: any) => (
                      <div key={account.id} className="p-4 bg-dark-700 rounded-lg">
                        <h3 className="font-semibold">{account.name}</h3>
                        <p className="text-gray-400">${account.price}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="whatsapp" className="mt-6">
            <Card className="bg-dark-800 border-gray-700">
              <CardHeader>
                <CardTitle>WhatsApp Group Link</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    value={whatsappLink}
                    onChange={(e) => setWhatsappLink(e.target.value)}
                    placeholder="https://chat.whatsapp.com/..."
                    className="bg-dark-700 border-gray-600"
                  />
                  <Button onClick={handleUpdateWhatsApp}>
                    Update WhatsApp Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <Card className="bg-dark-800 border-gray-700">
              <CardHeader>
                <CardTitle>Site Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Analytics coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function AccountForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData()
    data.append('name', formData.name)
    data.append('price', formData.price)
    data.append('description', formData.description)
    
    // Add file inputs
    const form = e.target as HTMLFormElement
    const files = form.querySelectorAll('input[type="file"]')
    files.forEach((input: any) => {
      if (input.files[0]) {
        data.append(input.name, input.files[0])
      }
    })
    
    onSubmit(data)
    setFormData({ name: '', price: '', description: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Account Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        className="bg-dark-700 border-gray-600"
        required
      />
      <Input
        type="number"
        step="0.01"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({...formData, price: e.target.value})}
        className="bg-dark-700 border-gray-600"
        required
      />
      <Textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        className="bg-dark-700 border-gray-600"
      />
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Image 1 (Default)</label>
        <Input type="file" name="image1" accept="image/*" className="bg-dark-700 border-gray-600" required />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Image 2 (Hover)</label>
        <Input type="file" name="image2" accept="image/*" className="bg-dark-700 border-gray-600" required />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Detail Image (Large)</label>
        <Input type="file" name="detail_image" accept="image/*" className="bg-dark-700 border-gray-600" required />
      </div>
      <Button type="submit" className="w-full">Add Account</Button>
    </form>
  )
}