"use client"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"
import { generateRoadmap } from "@/app/actions/ai-roadmap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { User } from "@supabase/supabase-js" // 1. Added proper type

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null) // 2. Fixed 'any' error
  const [project, setProject] = useState("")
  const [roadmap, setRoadmap] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/login')
      } else {
        setUser(data.user)
      }
    }
    getUser()
  }, [supabase, router]) // 3. Fixed dependency error

  const handleAI = async () => {
    if (!project) return
    setLoading(true)
    const result = await generateRoadmap(project)
    setRoadmap(result)
    setLoading(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!user) return <div className="p-8">Loading...</div>

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 text-sm">Logged in: {user.email}</p>
          </div>
          <Button onClick={handleSignOut} variant="outline" className="cursor-pointer">Sign Out</Button>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md border border-blue-100">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">✨ AI Roadmap Generator</h2>
          <div className="flex gap-3">
            <Input 
              placeholder="e.g. Build an E-commerce site" 
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="h-12"
            />
            <Button onClick={handleAI} disabled={loading} className="h-12 px-8 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white">
              {loading ? "Generating..." : "Generate Roadmap"}
            </Button>
          </div>
          {roadmap && (
            <div className="mt-8 p-6 bg-blue-50/50 rounded-xl border border-blue-100 whitespace-pre-wrap text-slate-800 italic">
              {roadmap}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}