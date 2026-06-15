import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { MapPin, Zap, TrendingUp, Award, ArrowRight, Globe, Leaf, ShieldCheck } from "lucide-react";

/* ─── animation preset ─── */
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─── enhanced timeline milestones ─── */
const milestones = [
  {
    year: "2019",
    label: "Inception",
    icon: Award,
    heading: "GREE INDIA Launch",
    body: "Established in Noida as the official Indian division of GREE Electric. Our mission began by introducing world-class, globally backed cooling technology into the Indian market.",
    kpis: ["Est. in Noida", "Global Tech Access"],
    gradient: "from-blue-700 to-blue-800",
    chip: "bg-blue-50 text-blue-800 border-blue-200",
  },
  {
    year: "2020",
    label: "Expansion",
    icon: MapPin,
    heading: "Pan-India Network",
    body: "Rapidly scaled our footprint beyond metros, building a network of over 100 partners and branches across Tier 1, 2, and 3 cities for seamless accessibility.",
    kpis: ["100+ Partners", "Nationwide Reach"],
    gradient: "from-blue-700 to-indigo-600",
    chip: "bg-indigo-50 text-indigo-800 border-indigo-200",
  },
  {
    year: "2021",
    label: "Experience",
    icon: Globe,
    heading: "Exclusive Brand Zones",
    body: "Opened our first dedicated brand outlets in Srinagar and Bilaspur, enabling customers to directly experience our premium, immersive retail environment.",
    kpis: ["Brand Outlets", "Direct Customer Access"],
    gradient: "from-indigo-600 to-cyan-600",
    chip: "bg-cyan-50 text-cyan-800 border-cyan-200",
  },
  {
    year: "2022–23",
    label: "Adaptation",
    icon: Zap,
    heading: "Built for Extreme Summers",
    body: "Adapted our advanced R&D for local conditions, ensuring every unit features 100% copper coils and advanced filtration to withstand peak Indian summers.",
    kpis: ["100% Copper", "Summer Ready"],
    gradient: "from-cyan-600 to-amber-500",
    chip: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    year: "2024 & Beyond",
    label: "Leadership",
    icon: TrendingUp,
    heading: "Accelerated Growth",
    body: "Executing aggressive scaling strategies, streamlining operations, and establishing our position as one of India's fastest-growing premium HVAC brands.",
    kpis: ["Rapid Growth", "Premium HVAC"],
    gradient: "from-amber-500 to-blue-700",
    chip: "bg-blue-50 text-blue-700 border-blue-200",
  },
];

export default function About() {
  return (
    <div className="bg-white min-h-screen font-inter overflow-x-hidden">
      <Helmet>
        <title>About Us | GREE INDIA</title>
        <meta
          name="description"
          content="GREE INDIA — the Indian chapter of the world's No.1 AC brand. Learn how we bring Fortune 500 cooling technology and innovation to the Indian market."
        />
      </Helmet>

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section className="relative min-h-[80vh] bg-[#080e1c] flex flex-col justify-end overflow-hidden">
        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* glow */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-blue-800 rounded-full blur-[130px] opacity-25 pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-blue-800 rounded-full blur-[130px] opacity-15 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-14 pb-20 md:pb-28 pt-40">
          <motion.div {...rise(0)}>
            <span className="inline-flex items-center gap-2 mb-8 text-white/40 text-[11px] font-bold tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Est. 2019 · Noida, Uttar Pradesh
            </span>
          </motion.div>

          <motion.h1
            {...rise(0.1)}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[0.92] tracking-tight mb-8 max-w-5xl"
          >
            Engineered for India.
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 bg-clip-text text-transparent">
              Backed by the World.
            </span>
          </motion.h1>

          <motion.p
            {...rise(0.2)}
            className="text-white/40 text-lg md:text-xl font-medium max-w-2xl leading-relaxed"
          >
            GREE INDIA operates as the official national entity of the planet's largest specialized air conditioner enterprise, delivering unmatched technological superiority.
          </motion.p>
        </div>

        {/* bottom gradient fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ══════════════════════════════════
          FLOATING STAT CARDS
      ══════════════════════════════════ */}
      <section className="relative z-10 -mt-12 max-w-5xl mx-auto px-6 md:px-14 mb-24">
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          {[
            { val: "No. 1", desc: "AC Brand Globally", gr: "from-blue-700 to-blue-700" },
            { val: "400M+", desc: "Global Users", gr: "from-blue-700 to-blue-600" },
            { val: "100+", desc: "Indian Partners", gr: "from-blue-600 to-cyan-600" },
          ].map((s, i) => (
            <motion.div
              key={i}
              {...rise(i * 0.08)}
              className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.1)] p-5 md:p-8 text-center"
            >
              <p className={`text-2xl md:text-4xl font-black bg-gradient-to-br ${s.gr} bg-clip-text text-transparent leading-none mb-2`}>
                {s.val}
              </p>
              <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          INTRO STRIP
      ══════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 md:px-14 mb-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center border-y border-gray-100 py-16">
          <motion.div {...rise(0)}>
            <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.25em] block mb-4">
              Who We Are
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              A Fortune 500 mandate.
              <br />
              An Indian mission.
            </h2>
          </motion.div>
          <motion.div {...rise(0.12)}>
            <p className="text-gray-500 text-lg leading-relaxed font-medium mb-4">
              GREE INDIA is the authorized entity of GREE Electric Appliances Inc. of Zhuhai — 
              consistently ranked as the world's leading manufacturer of air conditioning systems and a Fortune 500 enterprise. 
              Our mission is to integrate this immense global R&D advantage directly into the Indian market, 
              providing premium, durable, and highly efficient cooling solutions tailored for our unique climate.
            </p>
            <p className="text-gray-500 text-lg leading-relaxed font-medium">
              We operate with a commitment to zero-emission cooling technologies that protect our planet while delivering uncompromising performance. Through localized adaptation, we ensure that every product we offer stands up to the extreme demands of the Indian summer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          MISSION & VISION PILLARS
      ══════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 grid lg:grid-cols-3 gap-8 mb-24">
        <motion.div {...rise(0)} className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
            <Leaf size={32} />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-4">Eco-Innovation</h3>
          <p className="text-gray-600 leading-relaxed font-medium">
            We engineer our systems to consume vastly less power. Our next-generation refrigerants and inverter drives are designed to drastically reduce carbon footprints across residential and industrial sectors.
          </p>
        </motion.div>

        <motion.div {...rise(0.1)} className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-6">
            <Globe size={32} />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-4">Global Accessibility</h3>
          <p className="text-gray-600 leading-relaxed font-medium">
            Climate control is a necessity, not a luxury. We leverage our massive production capabilities to make state-of-the-art, durable air conditioning available to over 180 countries.
          </p>
        </motion.div>

        <motion.div {...rise(0.2)} className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-6">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-4">Unyielding Integrity</h3>
          <p className="text-gray-600 leading-relaxed font-medium">
            Every unit that leaves our facilities is rigorously tested to outlast standard industry benchmarks. We build trust by delivering hardware that simply does not fail when you need it most.
          </p>
        </motion.div>
      </section>

      {/* ══════════════════════════════════
          VISION STATEMENT
      ══════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 text-center mb-32">
        <motion.div {...rise(0)} className="bg-gradient-to-br from-gray-900 to-[#0b1120] rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-700/20 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-700/20 rounded-full blur-[80px]"></div>
          
          <h2 className="relative z-10 text-3xl md:text-5xl font-black text-white leading-tight mb-8">
            "To create a centenary enterprise and build a better environment for humankind."
          </h2>
          <p className="relative z-10 text-blue-300 font-bold uppercase tracking-widest text-sm">
            The GREE INDIA Vision
          </p>
        </motion.div>
      </section>

      {/* ══════════════════════════════════
          MILESTONE TIMELINE
      ══════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 md:px-14 mb-32">
        {/* section header */}
        <motion.div {...rise(0)} className="mb-16">
          <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.25em] block mb-3">
            Our Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            Evolution of Excellence
          </h2>
        </motion.div>

        {/* timeline */}
        <div className="space-y-6">
          {milestones.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={i}
                {...rise(i * 0.06)}
                className="grid md:grid-cols-[200px_1fr] gap-0 group"
              >
                {/* Left — year label */}
                <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0 pb-4 md:pb-0 md:pr-10">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center shadow-md flex-shrink-0`}>
                    <Icon size={17} className="text-white" strokeWidth={2.5} />
                  </div>
                  <div className="md:mt-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{m.label}</p>
                    <p className={`text-2xl font-black bg-gradient-to-br ${m.gradient} bg-clip-text text-transparent mt-0.5`}>
                      {m.year}
                    </p>
                  </div>
                  {/* connector line */}
                  {i < milestones.length - 1 && (
                    <div className="hidden md:block w-px h-full mt-6 ml-5 bg-gradient-to-b from-gray-200 to-transparent self-stretch" />
                  )}
                </div>

                {/* Right — content card */}
                <div className="bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] rounded-3xl p-8 md:p-10 transition-all duration-400">
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-tight">
                    {m.heading}
                  </h3>
                  <p className="text-gray-500 font-medium leading-relaxed mb-7 text-[0.95rem]">
                    {m.body}
                  </p>
                  {/* KPI pills */}
                  <div className="flex flex-wrap gap-2">
                    {m.kpis.map((k, ki) => (
                      <span
                        key={ki}
                        className={`text-[11px] font-bold px-3 py-1.5 rounded-full border ${m.chip}`}
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════
          CLOSING — DARK CARD
      ══════════════════════════════════ */}
      <section className="px-6 md:px-14 pb-28 max-w-7xl mx-auto">
        <motion.div
          {...rise(0)}
          className="relative overflow-hidden rounded-[2.5rem] bg-[#080e1c]"
        >
          {/* blobs */}
          <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] bg-blue-800 rounded-full blur-[120px] opacity-20 pointer-events-none" />
          <div className="absolute -bottom-40 right-1/4 w-[400px] h-[400px] bg-blue-800 rounded-full blur-[120px] opacity-15 pointer-events-none" />
          {/* grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 p-12 md:p-20 lg:p-28">
            <div className="max-w-4xl">
              <p className="text-white/25 text-[10px] font-black uppercase tracking-[0.3em] mb-12">
                Built on Vision · Strengthened by Technology · Driven by Scale
              </p>

              <div className="space-y-2 mb-16">
                {[
                  { txt: "Engineered for extremes.", dim: true },
                  { txt: "Powered by innovation.", dim: true },
                  { txt: "Defined by global scale.", dim: false },
                ].map((l, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.14, duration: 0.65 }}
                    className={`text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] ${
                      l.dim
                        ? "text-white/20"
                        : "bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent"
                    }`}
                  >
                    {l.txt}
                  </motion.p>
                ))}
              </div>

              <a
                href="/products"
                className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold px-7 py-4 rounded-2xl text-sm tracking-wide transition-all duration-300 group"
              >
                Explore Our Products
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="mt-20 pt-8 border-t border-white/5">
              <p className="text-white/20 text-xs font-medium tracking-wider">
                GREE INDIA Air Conditioners And Appliances Limited · Noida, Uttar Pradesh, India
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}