import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../../assets/icon.png";

const links = [
  { title: "Features", href: "#features" },
  { title: "About", href: "#about" },
  { title: "Get Started", href: "/register" },
];

const socials = [
  {
    icon: Github,
    href: "https://github.com/Shravani-Thoke",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/Shravani-Thoke",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:shravanithoke@gmail.com",
    label: "Email",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white">
      <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-blue-100/30 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-emerald-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-5">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[32px] border bg-gradient-to-r from-blue-600 to-emerald-500 p-10 text-white shadow-xl"
        >
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">

            <div>
              <h2 className="text-3xl font-bold">
                Ready to transform your learning?
              </h2>

              <p className="mt-3 max-w-xl text-white/90">
                Upload your study material once and let DocsMind AI generate
                chats, flashcards, quizzes and insights in seconds.
              </p>
            </div>

            <a
              href="/register"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:scale-105"
            >
              Get Started
              <ArrowUpRight size={18} />
            </a>

          </div>
        </motion.div>

        <div className="mt-10 grid gap-12 md:grid-cols-3">

          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="DocsMind AI" className="h-10" />
              <h3 className="text-2xl font-bold">
                DocsMind AI
              </h3>
            </div>

            <p className="mt-5 leading-7 text-gray-600">
              AI-powered learning companion that transforms static documents
              into interactive study experiences.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">
              Navigation
            </h4>

            <div className="mt-5 space-y-3">
              {links.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="block text-gray-600 transition hover:text-blue-600"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">
              Connect
            </h4>

            <div className="mt-5 flex gap-4">
              {socials.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                  >
                    <Icon size={20} className="text-gray-700" />
                  </a>
                );
              })}
            </div>

            {/* <p className="mt-6 text-sm text-gray-500">
              Built with ❤️ using React, Node.js, MongoDB, Groq AI and
              Supabase.
            </p> */}
          </div>

        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-gray-500 md:flex-row">
          <p>&copy; 2026 DocsMind AI. All rights reserved.</p>

          <p>
            Learn smarter. Build confidence. Achieve more.
          </p>
        </div>

      </div>
    </footer>
  );
}