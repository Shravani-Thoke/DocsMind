import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Bot,
  MessageCircle,
  BookOpen,
  ClipboardCheck,
  BarChart3,
} from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  {
    title: "Upload PDF",
    subtitle: "Drop your notes in seconds",
    icon: FileText,
    accent: "blue",
    chips: ["PDF", "18 MB", "Uploaded"],
  },
  {
    title: "AI Processing",
    subtitle: "Understanding every page",
    icon: Bot,
    accent: "emerald",
    chips: ["Indexed", "Ready"],
  },
  {
    title: "AI Chat",
    subtitle: "Ask anything from your notes",
    icon: MessageCircle,
    accent: "violet",
    chips: ["Context Aware"],
  },
  {
    title: "Flashcards",
    subtitle: "Generate active recall cards",
    icon: BookOpen,
    accent: "orange",
    chips: ["20 Cards"],
  },
  {
    title: "Quiz",
    subtitle: "Test your understanding",
    icon: ClipboardCheck,
    accent: "rose",
    chips: ["15 Questions"],
  },
  {
    title: "Dashboard",
    subtitle: "Track learning progress",
    icon: BarChart3,
    accent: "indigo",
    chips: ["Analytics"],
  },
];

export default function InteractiveDemo() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((p) => (p + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const step = steps[active];
  const Icon = step.icon;

  return (
    <section id= "overview" className="relative overflow-hidden py-21">
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-200/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-emerald-200/20 blur-3xl" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          
          <h2 className="text-4xl font-bold mt-2">
            Experience DocsMind AI
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Upload once and let AI handle chatting, flashcards, quizzes and learning insights.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {steps.map((s, i) => (
            <button
              key={s.title}
              onClick={() => setActive(i)}
              className={`cursor-pointer px-4 py-2 rounded-full text-sm transition ${
                active === i
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20, scale: .98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: .98 }}
            transition={{ duration: .4 }}
            className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,.06)]  p-10 md:p-14 max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
                  <Icon className="text-blue-600" size={30} />
                </div>

                <h3 className="text-3xl font-semibold">{step.title}</h3>
                <p className="text-gray-500 mt-3">{step.subtitle}</p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {step.chips.map((chip) => (
                    <span
                      key={chip}
                      className="px-3 py-1 rounded-full bg-gray-100 text-sm"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-8">
                  <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-600 to-emerald-500"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.5 }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Preparing your learning experience...
                  </p>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="w-full md:w-80 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-gray-200 p-6"
              >
                <div className="h-40 rounded-2xl border-2 border-dashed border-blue-200 flex items-center justify-center">
                  <Icon className="text-blue-600" size={48} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
