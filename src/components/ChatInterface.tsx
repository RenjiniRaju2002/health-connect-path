import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Image, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "patient" | "doctor";
  time: string;
  attachment?: { name: string; type: string };
}

interface ChatInterfaceProps {
  onRequestVideo?: () => void;
}


const initialMessages: Message[] = [
  { id: "1", text: "Hello! I've reviewed your medical records. How can I help you today?", sender: "doctor", time: "10:30 AM" },
  { id: "2", text: "Hi Doctor, I wanted to discuss the knee replacement procedure and understand the recovery timeline.", sender: "patient", time: "10:32 AM" },
  { id: "3", text: "Of course! The total knee replacement typically involves a 5-7 day hospital stay, followed by 6-8 weeks of physical therapy. Most patients return to normal activities within 3 months.", sender: "doctor", time: "10:35 AM" },
];

export function ChatInterface({ onRequestVideo }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [showCTA, setShowCTA] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    if (messages.length >= 5) setShowCTA(true);
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "patient",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const isEnd = input.trim().toLowerCase() === "end";
    setMessages([...messages, newMsg]);
    setInput("");

    // Simulated doctor response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: isEnd
            ? "Thank you for the chat! I'd recommend we continue with a video consultation for a thorough discussion. Please request one below."
            : "Thank you for your question. I'd recommend scheduling a video consultation so we can discuss this in detail. Would you like to proceed?",
          sender: "doctor",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      if (isEnd) {
        setShowCTA(true);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border bg-muted/30">
        <p className="text-xs text-muted-foreground">
          💬 Doctor typically responds within a few hours
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.sender === "patient"
                  ? "gradient-hero text-primary-foreground rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={`text-[10px] mt-1.5 ${
                msg.sender === "patient" ? "text-primary-foreground/60" : "text-muted-foreground"
              }`}>
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Video CTA */}
      <AnimatePresence>
        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="px-5 py-3 bg-medical-teal-light border-t border-border"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground font-medium">Ready for a deeper consultation?</p>
              <div className="flex items-center gap-2">
                <Button size="sm" className="text-xs gradient-hero border-0 text-primary-foreground" onClick={onRequestVideo}>
                  Request Video Consultation
                </Button>
                <button onClick={() => setShowCTA(false)}>
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-card">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message…"
            className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm outline-none text-foreground placeholder:text-muted-foreground"
          />
          <Button
            size="icon"
            onClick={sendMessage}
            disabled={!input.trim()}
            className="gradient-hero border-0 text-primary-foreground rounded-xl h-10 w-10"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
