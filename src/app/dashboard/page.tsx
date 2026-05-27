"use client"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"
import { generateRoadmap } from "@/app/actions/ai-roadmap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { User } from "@supabase/supabase-js"

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [status, setStatus] = useState("free") // Track if user is Pro
  const [project, setProject] = useState("")
  const [roadmap, setRoadmap] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function getData() {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/login')
        return
      }
      setUser(data.user)

      // Check subscription status from our Supabase table
      const { data: sub } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('user_id', data.user.id)
        .single()
      
      if (sub) setStatus(sub.status)
    }
    getData()
  }, [supabase, router])

  const handleUpgrade = () => {
    // Replace with YOUR actual Lemon Squeezy link
    const checkoutUrl = `https://saasflow.lemonsqueezy.com/checkout/buy/your-id?checkout[custom][user_id]=${user?.id}&checkout[email]=${user?.email}`
    window.location.assign(checkoutUrl)
  }

  const handleAI = async () => {
    if (!project) return
    setLoading(true)
    const result = await generateRoadmap(project)
    setRoadmap(result)
    setLoading(false)
  }

  if (!user) return <div className="p-8">Loading...</div>

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">S</div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-slate-500 text-xs">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* 1. SHOW UPGRADE BUTTON ONLY IF STATUS IS 'FREE' */}
            {status === 'free' && (
              <Button onClick={handleUpgrade} className="bg-amber-500 hover:bg-amber-600 text-white cursor-pointer shadow-sm">
                ⭐ Upgrade to Pro ($49)
              </Button>
            )}
            {status === 'pro' && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">Pro Account</span>
            )}
            <Button onClick={() => supabase.auth.signOut()} variant="ghost" size="sm">Sign Out</Button>
          </div>
        </div>

        {/* AI Generator Section */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-blue-100">
          <h2 className="text-xl font-bold mb-4">✨ AI Roadmap Generator</h2>
          <div className="flex gap-3">
            <Input 
              placeholder="Describe your next big project..." 
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="h-12"
            />
            <Button onClick={handleAI} disabled={loading} className="h-12 px-8 bg-blue-600 hover:bg-blue-700 cursor-pointer">
              {loading ? "Thinking..." : "Generate"}
            </Button>
          </div>
          {roadmap && (
            <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200 whitespace-pre-wrap text-slate-700 font-medium">
              {roadmap}
            </div>
          )}
        </div>

        {/* 2. FREE LIMIT MESSAGE */}
        {status === 'free' && (
          <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <p className="text-sm text-blue-800">
              You are using the <strong>Free Plan</strong>. Upgrade to Pro for unlimited AI and priority processing.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}