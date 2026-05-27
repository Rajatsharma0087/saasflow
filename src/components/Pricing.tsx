"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { useState } from "react"

const tiers = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for testing the power of SaaSFlow.",
    features: ["1,000 AI Tokens", "Standard Speed", "1 Project"],
    buttonText: "Current Plan",
    featured: false,
    link: "/login"
  },
  {
    name: "Pro",
    price: "$49",
    description: "Our most popular plan for professional creators.",
    features: ["25,000 AI Tokens", "Priority 'Turbo' Speed", "Unlimited Projects", "24/7 Support"],
    buttonText: "Upgrade to Pro",
    featured: true,
    // YOUR REAL LEMON SQUEEZY LINK
    link: "https://saasflow.lemonsqueezy.com/checkout/buy/e4bc7588-ed2d-4560-84e2-6372d6657904"
  }
]

export default function Pricing() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleUpgrade = async (checkoutUrl: string, isFeatured: boolean) => {
    if (!isFeatured) return;

    setLoading(true)
    
    // 1. Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push("/login")
      return
    }

    // 2. Build the Secure Checkout URL
    const secureCheckoutUrl = `${checkoutUrl}?checkout[custom][user_id]=${user.id}&checkout[email]=${user.email}`

    // 3. HIGH-LEVEL FIX: Use .assign() instead of direct .href mutation
    // This clears the 'immutability' lint error.
    window.location.assign(secureCheckoutUrl)
  }

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-blue-600 font-semibold text-sm uppercase tracking-wide">Pricing Plans</h2>
          <p className="mt-2 text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">Scale at the speed of AI</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <div key={tier.name} className={`relative p-8 rounded-3xl border transition-all duration-300 ${tier.featured ? 'border-blue-600 shadow-2xl ring-1 ring-blue-600 scale-105' : 'border-gray-200 hover:border-blue-300'}`}>
              {tier.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Most Popular</span>
              )}
              <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-gray-900">{tier.price}</span>
                <span className="text-sm font-semibold text-gray-600">/month</span>
              </p>
              <p className="mt-4 text-gray-600 text-sm leading-6 h-12">{tier.description}</p>
              
              <ul className="mt-8 space-y-3 text-sm text-gray-600">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3 items-center">
                    <Check className="h-5 w-5 text-blue-600 flex-none" /> {feature}
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => handleUpgrade(tier.link, tier.featured)}
                disabled={loading && tier.featured}
                className={`mt-8 w-full h-12 rounded-full font-bold text-md transition-all cursor-pointer ${tier.featured ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/20' : 'bg-gray-100 text-gray-400 border-none hover:bg-gray-100'}`}
              >
                {loading && tier.featured ? "Connecting..." : tier.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}