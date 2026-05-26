import { Button } from "./ui/button" // Fixed this path
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
              S
            </div>
            <span className="font-bold text-xl tracking-tight">SaaSFlow</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
            <Link href="#docs" className="hover:text-blue-600 transition-colors">Documentation</Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="cursor-pointer">Log in</Button>
            <Button size="sm" className="rounded-full px-5 cursor-pointer">Join Now</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}