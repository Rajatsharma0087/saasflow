import { Button } from "@/components/ui/button"
import Link from "next/link" // This is the line that was likely missing!

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
                S
              </div>
              <span className="font-bold text-xl tracking-tight">SaaSFlow</span>
            </Link>
          </div>
          
          {/* Navigation Links (Middle) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="#features" className="hover:text-blue-600 transition-colors cursor-pointer">Features</Link>
            <Link href="#pricing" className="hover:text-blue-600 transition-colors cursor-pointer">Pricing</Link>
            <Link href="#docs" className="hover:text-blue-600 transition-colors cursor-pointer">Documentation</Link>
          </div>

          {/* Auth Buttons (Right) */}
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="cursor-pointer">
                Log in
              </Button>
            </Link>
            
            <Link href="/login">
              <Button size="sm" className="rounded-full px-5 cursor-pointer">
                Join Now
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}