"use client";
import { MarqueeDemo } from "@/components/magicui/users";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";

export default function Client() {
  return (
    <div className="flex flex-col gap-8 min-h-screen">
      <div className="min-h-screen">
        <div className="flex flex-col items-center justify-center px-4 pt-32">
          <motion.h1
            initial={{ opacity: 0.5, y: 100, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1}}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-3xl md:text-7xl font-bold tracking-tight text-transparent"
          >
            Build your PCs the fun and easiest way
          </motion.h1>
          
          <motion.div
            style={{
              background: "linear-gradient(90deg, #94a3b8, #e2e8f0, #94a3b8)",
              boxShadow: "0px 0px 12px #fff,0px 0px 12px #fff,0px 0px 16px #fff",
              height: "2px",
              width: "100%",
              maxWidth: "600px",
              marginTop: "2rem",
              marginBottom: "2rem",
              zIndex: 2
            }}
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{
              delay: 0.5,
              duration: 1.2,
              ease: "easeInOut",
            }}
          />

          <div className="space-y-6 w-full max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                ease: "easeInOut",
              }}
              className="text-center text-base md:text-lg bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent"
            >
              &quot;Chosen by you, created by us.&quot;
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.6,
                ease: "easeInOut"
              }}
              className="text-center text-base md:text-lg bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent"
            >
              A platform that provides<br/> Hardware specifically for gamers.
            </motion.p>
          </div>
        </div>

        {/* Enhanced Stats section with hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8 max-w-5xl mx-auto px-4">
          {[
            { number: "1000+", label: "Satisfied Customers", icon: "👥" },
            { number: "500+", label: "Custom Builds", icon: "🔧" },
            { number: "24/7", label: "Support Available", icon: "💬" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{
                delay: 0.2 + index * 0.1,
                duration: 0.5,
              }}
              className="text-center p-6 rounded-xl bg-slate-800/30 backdrop-blur-sm hover:bg-slate-800/50"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent">
                {stat.number}
              </h3>
              <p className="text-slate-400 text-sm md:text-base mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Features section with animations */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4">
          {[
            { title: "Expert PC Building Consultation", icon: "💻", description: "Get personalized advice from our tech experts" },
            { title: "Premium Component Selection", icon: "⚡", description: "Access to top-tier hardware components" },
            { title: "Performance Optimization", icon: "🚀", description: "Maximum efficiency for your specific needs" },
            { title: "Lifetime Technical Support", icon: "🛠️", description: "We're here for you, always" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{
                delay: 0.3 * index,
                duration: 0.5,
              }}
              className="flex flex-col space-y-2 bg-slate-800/50 p-6 rounded-lg hover:bg-slate-800/70"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{feature.icon}</span>
                <h3 className="text-lg font-semibold text-slate-200">{feature.title}</h3>
              </div>
              <p className="text-slate-400 text-sm pl-9">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* New Call-to-Action section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-16 mb-12 px-4"
        >
          <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent mb-4">
            Ready to Build Your Dream PC?
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>

      {/* Move MarqueeDemo to bottom only */}
      <div className="w-full">
        <MarqueeDemo />
      </div>
    </div>
  );
}
