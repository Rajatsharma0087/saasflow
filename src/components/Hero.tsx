import { Button } from "@/components/ui/button"
import { ArrowRight, } from "lucide-react" // These are high-quality icons

export default function Hero() {
  return (
    <div className="relative isolate pt-14 overflow-hidden bg-white">
      {/* High-End Background Gradient */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3b82f6] to-[#9333ea] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="py-24 sm:py-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            {/* Animated Badge */}
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 transition-all">
                The future of SaaS is here.{" "}
                <a href="#" className="font-semibold text-blue-600">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              Scale your business <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                without the limits.
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Build, deploy, and scale your SaaS project with an enterprise-ready 
              stack designed for maximum security and lightning-fast speed.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              {/* This is your new Shadcn Button */}
              <Button size="lg" className="rounded-full px-8 h-12 text-md shadow-xl hover:shadow-blue-500/20 transition-all cursor-pointer">
                Get Started for Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="lg" className="text-md cursor-pointer">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}