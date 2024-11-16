'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, DollarSign, HandHeart, Users } from 'lucide-react'

// Simplified project type
type Project = {
  id: string
  title: string
  description: string
  amountNeeded: number
  amountRaised: number
  borrowerId: string
}

export function MicrocreditAppComponent() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Handmade Jewelry Business',
      description: 'Support Maria in starting her handmade jewelry business',
      amountNeeded: 1000,
      amountRaised: 250,
      borrowerId: 'maria123'
    },
    {
      id: '2',
      title: 'Organic Farming Initiative',
      description: 'Help Ana expand her organic farming project',
      amountNeeded: 2000,
      amountRaised: 800,
      borrowerId: 'ana456'
    }
  ])

  const [userBalance, setUserBalance] = useState(5000)

  const handleLend = (projectId: string, amount: number) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? {...project, amountRaised: project.amountRaised + amount}
        : project
    ))
    setUserBalance(userBalance - amount)
  }

  const handleDonate = (projectId: string, amount: number) => {
    // Similar to handleLend, but maybe with different logic for tracking donations
    handleLend(projectId, amount)
  }

  const handleBorrow = (projectTitle: string, amount: number) => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: projectTitle,
      description: 'New project description',
      amountNeeded: amount,
      amountRaised: 0,
      borrowerId: 'currentUser' // In a real app, this would be the authenticated user's ID
    }
    setProjects([...projects, newProject])
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Sukha</h1>
      
      <Tabs defaultValue="lend" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lend">Lend</TabsTrigger>
          <TabsTrigger value="borrow">Borrow</TabsTrigger>
          <TabsTrigger value="manage">Manage</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lend">
          <Card>
            <CardHeader>
              <CardTitle>Available Projects</CardTitle>
              <CardDescription>Support women-led projects by lending or donating</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {projects.map(project => (
                  <Card key={project.id}>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Needed: ${project.amountNeeded}</p>
                      <p>Raised: ${project.amountRaised}</p>
                      <progress 
                        value={project.amountRaised} 
                        max={project.amountNeeded}
                        className="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button onClick={() => handleLend(project.id, 100)}>
                        <CreditCard className="mr-2 h-4 w-4" /> Lend $100
                      </Button>
                      <Button onClick={() => handleDonate(project.id, 50)} variant="outline">
                        <HandHeart className="mr-2 h-4 w-4" /> Donate $50
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="borrow">
          <Card>
            <CardHeader>
              <CardTitle>Request a Microcredit</CardTitle>
              <CardDescription>Create a new project to receive funding</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleBorrow(formData.get('title') as string, Number(formData.get('amount')))
              }}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="title">Project Title</Label>
                    <Input id="title" name="title" placeholder="Enter your project title" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="amount">Amount Needed</Label>
                    <Input id="amount" name="amount" type="number" placeholder="Enter amount in USD" />
                  </div>
                </div>
                <Button type="submit" className="mt-4">
                  <Users className="mr-2 h-4 w-4" /> Submit Project
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>Manage Your Account</CardTitle>
              <CardDescription>View your balance and active investments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">Balance: ${userBalance}</p>
              <h3 className="text-xl font-semibold mb-2">Your Investments</h3>
              {/* In a real app, you'd fetch and display the user's investments here */}
              <p>You have no active investments.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                <DollarSign className="mr-2 h-4 w-4" /> Withdraw Funds
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}