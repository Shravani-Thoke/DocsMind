import { motion } from "framer-motion";
import {
  MessageSquareText,
  BookOpen,
  BrainCircuit,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: MessageSquareText,
    title: "Chat with Documents",
    description:
      "Ask questions naturally and receive contextual answers from your uploaded PDFs.",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    icon: BookOpen,
    title: "Smart Flashcards",
    description:
      "Generate AI-powered flashcards instantly to make revision faster and more effective.",
    accent: "from-emerald-500 to-lime-500",
  },
  {
    icon: BrainCircuit,
    title: "AI Quiz Generation",
    description:
      "Create quizzes automatically and test your understanding with one click.",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: LayoutDashboard,
    title: "Learning Dashboard",
    description:
      "Monitor documents, flashcards, quizzes and your overall learning progress.",
    accent: "from-orange-500 to-amber-500",
  },
];

const card = {
  hidden: { opacity: 0, y: 35 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.55,
    },
  }),
};

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white py-6"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-10 top-16 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="max-w-2xl">
          {/* <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Features
          </span> */}

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900">
            Everything you need to
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              {" "}learn smarter
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            DocsMind AI transforms static study material into an interactive
            learning experience powered by AI.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                custom={index}
                variants={card}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.30 },
                }}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-2xl"
              >
                <div
                  className={`mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.accent} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon size={26} />
                </div>

                <h3 className="text-2xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {feature.description}
                </p>

                {/* <div className="mt-8 flex items-center gap-2 text-blue-600 font-medium">
                  Learn more
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div> */}

                <div
                  className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${feature.accent} transition-all duration-500 group-hover:w-full`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}