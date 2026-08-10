import { useState } from "react";
import axios from "../../../../api/axios";
import { Check, Copy, MessageSquare, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEffect } from "react";

const Chat = ({ documentId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [copy , setCopy] = useState(false);

useEffect(() => {
  const saved = sessionStorage.getItem(`chat-${documentId}`);
  if (saved) setMessages(JSON.parse(saved));
  setHydrated(true);
}, [documentId]);

useEffect(() => {
  if (!hydrated) return;
  sessionStorage.setItem(`chat-${documentId}`, JSON.stringify(messages));
}, [messages, documentId, hydrated]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setLoading(true);

    // Add user message instantly
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const res = await axios.post(`/ai/${documentId}/chat`, {
        message: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.reply },
      ]);
    } catch (err) {
      console.error("Chat error:", err.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-100 bg-white rounded-xl shadow p-4">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {messages.length === 0 ? (
          // 🔹 EMPTY STATE
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-blue-100 p-4 rounded-2xl mb-4">
              <MessageSquare className="text-blue-500" />
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              Start a conversation
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Ask me anything about this document!
            </p>
          </div>
        ) : (
          // 🔹 CHAT MESSAGES
          <div className="space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-xl max-w-[70%] ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        const isBlockCode = Boolean(match);

                        return isBlockCode ? (
                          <div className="relative group">
                            <button
                              onClick={() =>{
                                navigator.clipboard.writeText(String(children))
                                setCopy(true);
                                setTimeout(() => setCopy(false), 5000);
                              }
                              }
                              className="absolute top-2 right-2 text-xs bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition cursor-pointer"
                            >
                              {
                                copy ? <Check className="w-4 h-4"/>: <Copy className="w-4 h-4"/>
                              }

                            </button>

                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code className="bg-gray-200 px-1 rounded" {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-gray-500 text-sm">Thinking...</div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <form action="" onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}>
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-xl px-3 py-2"
          placeholder="Ask something about this document..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded-xl"
        >
          <Send />
        </button>
      </div>
      </form>
    </div>
  );
};

export default Chat;
