import { motion } from "framer-motion";
import {
  BrainCircuit,
  FileText,
  Sparkles,
  Code2,
  Database,
  Cpu,
} from "lucide-react";

const techStack = [
  { name: "React", icon: Code2 },
  { name: "Node.js", icon: Cpu },
  { name: "MongoDB", icon: Database },
  { name: "Groq AI", icon: BrainCircuit },
  { name: "Supabase", icon: Database },
  { name: "Tailwind CSS", icon: Sparkles },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#fafafa] py-10"
    >
      <div className="absolute left-0 top-16 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6 }}
          >
            {/* <span className="rounded-full bg-blue-50 px-4 py-2 text-3xl font-medium text-blue-700">
              About DocsMind AI
            </span> */}

            <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900">
              Learn Smarter,
              <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                {" "}Not Harder.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              DocsMind AI was built to transform traditional study material
              into an interactive learning experience.
            </p>

            <p className="mt-5 leading-8 text-gray-600">
              Instead of reading hundreds of pages repeatedly, upload your
              notes once and let AI help you understand concepts, generate
              flashcards, create quizzes and track your progress — all from a
              single platform.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {techStack.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm transition hover:shadow-md"
                  >
                    <Icon size={16} className="text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6 }}
            className="relative"
          >
            <div className="rounded-[32px]  bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,.06)]">

              <div className="flex items-center gap-4 border-b pb-5">
                <div className="rounded-2xl bg-blue-100 p-3">
                  <FileText className="text-blue-600" size={26} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold">
                    DocsMind Workflow
                  </h3>

                  <p className="text-sm text-gray-500">
                    One upload. Multiple learning experiences.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-5">

                {[
                  "Upload your study material",
                  "Chat with AI using your notes",
                  "Generate Flashcards instantly",
                  "Create quizzes automatically",
                  "Track your learning progress",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * .08 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 text-sm font-semibold text-white">
                      {index + 1}
                    </div>

                    <span className="text-gray-700">
                      {item}
                    </span>
                  </motion.div>
                ))}

              </div>

              <div className="mt-10 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 p-6 text-white">
                <p className="text-xl font-bold uppercase tracking-widest opacity-80">
                  Mission
                </p>

                <h4 className="mt-2 text-2xl font-semibold">
                  Making AI-powered learning accessible to every student.
                </h4>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}