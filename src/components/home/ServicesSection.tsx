'use client';

import {
  Cpu, Cog, Flame, Zap, CircuitBoard, Wrench,
} from 'lucide-react';

const services = [
  { icon: Cpu, name: 'Instrumentation', description: 'Precision measurement systems for industrial-grade monitoring and control.' },
  { icon: Cog, name: 'Automation', description: 'End-to-end automation solutions that streamline operations and reduce costs.' },
  { icon: Flame, name: 'Process Engineering', description: 'Optimized process design for maximum efficiency and throughput.' },
  { icon: Zap, name: 'Electrical Engineering', description: 'Power distribution, control panels, and electrical infrastructure.' },
  { icon: CircuitBoard, name: 'Electronics Engineering', description: 'Custom PCB design, embedded systems, and smart device prototyping.' },
  { icon: Wrench, name: 'Maintenance & Support', description: 'Proactive maintenance, calibration, and 24/7 technical support services.' },
];

export default function ServicesSection() {
  return (
    <section className="py-24" id="services">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-full border border-teal-500/20 mb-4">What We Do</span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 dark:from-white to-gray-400 dark:to-zinc-400 bg-clip-text text-transparent mb-4">We Are More Than a Store</h2>
        <p className="max-w-2xl mx-auto text-gray-500 dark:text-zinc-400 text-lg leading-relaxed">
          Inovate is a technical services provider specializing in industrial automation, instrumentation, and engineering solutions. We design, build, and deploy systems that drive precision and performance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.name} className="group relative bg-white dark:bg-zinc-900/60 rounded-2xl border border-gray-200 dark:border-white/5 p-6 transition-transform duration-300 will-change-transform transform-gpu hover:scale-[1.02] hover:-translate-y-1 overflow-hidden shadow-sm dark:shadow-none">
              <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-teal-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{service.name}</h3>
                <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">{service.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
