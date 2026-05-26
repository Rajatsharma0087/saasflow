import { Zap, Shield, BarChart3, Globe, Smartphone, Lock } from "lucide-react"

const features = [
  {
    title: "Enterprise Security",
    description: "Your data is protected by industry-leading encryption and high-level security protocols.",
    icon: Shield,
  },
  {
    title: "Lightning Fast",
    description: "Built on Next.js 15 for sub-second load times and incredible user experience.",
    icon: Zap,
  },
  {
    title: "Global Scalability",
    description: "Deploy to edge locations worldwide and serve customers anywhere with zero latency.",
    icon: Globe,
  },
  {
    title: "Advanced Analytics",
    description: "Track every click and conversion with our built-in high-performance dashboard.",
    icon: BarChart3,
  },
  {
    title: "Mobile First",
    description: "A seamless experience across all devices, from desktop to the palm of your hand.",
    icon: Smartphone,
  },
  {
    title: "Secure Auth",
    description: "Magic links and social logins keep your users safe without the need for passwords.",
    icon: Lock,
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to scale
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-10 transition duration-300" />
              <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}               