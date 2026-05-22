"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatStore, Message } from "@/lib/store";
import toast from "react-hot-toast";

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Namaste 🙏 I am your Gita Mentor — a spiritual guide rooted in the wisdom of the Bhagavad Gita. Whether you're facing a difficult decision, seeking purpose, or simply curious about ancient Indian philosophy, I'm here to help.\n\nWhat's on your mind today?",
  timestamp: 0,
};

const SUGGESTION_PROMPTS = [
  "How do I find my purpose in life?",
  "I'm feeling anxious about the future",
  "What does the Gita say about duty?",
  "How to stay calm in difficult times?",
];

export default function ChatPage() {
  const { messages, isLoading, addMessage, setLoading, clearMessages } =
    useChatStore();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const allMessages =
    messages.length === 0 ? [WELCOME_MESSAGE] : [WELCOME_MESSAGE, ...messages];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    setInput("");
    addMessage("user", messageText);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      addMessage("assistant", data.response);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(errorMessage);
      addMessage(
        "assistant",
        "I apologize, but I'm having trouble connecting right now. Please try again in a moment. 🙏"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        paddingTop: 80,
      }}
    >
      {/* Messages Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 16px",
        }}
      >
        <div
          style={{
            maxWidth: 780,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <AnimatePresence initial={false}>
            {allMessages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                padding: "4px 0",
              }}
            >
              <div
                className="glass"
                style={{
                  padding: "14px 20px",
                  borderRadius: "18px 18px 18px 4px",
                  display: "flex",
                  gap: 6,
                  alignItems: "center",
                }}
              >
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </motion.div>
          )}

          {/* Suggestion Chips (show only when no user messages) */}
          {messages.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 12,
                paddingLeft: 4,
              }}
            >
              {SUGGESTION_PROMPTS.map((prompt, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  onClick={() => handleSubmit(prompt)}
                  className="glass"
                  style={{
                    padding: "10px 16px",
                    borderRadius: 12,
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontFamily: "'Inter', sans-serif",
                    background: "var(--bg-glass)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-glow)";
                    e.currentTarget.style.color = "var(--text-primary)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-subtle)";
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {prompt}
                </motion.button>
              ))}
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div
        style={{
          padding: "16px 16px 24px",
          borderTop: "1px solid var(--border-subtle)",
          background:
            "linear-gradient(to top, var(--bg-primary), transparent)",
        }}
      >
        <div
          style={{
            maxWidth: 780,
            margin: "0 auto",
            display: "flex",
            gap: 10,
            alignItems: "flex-end",
          }}
        >
          {/* Clear button */}
          {messages.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => {
                clearMessages();
                toast.success("Conversation cleared");
              }}
              title="Clear chat"
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-glass)",
                color: "var(--text-muted)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)";
                e.currentTarget.style.color = "#ef4444";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              🗑
            </motion.button>
          )}

          {/* Input */}
          <div
            className="glass"
            style={{
              flex: 1,
              borderRadius: 14,
              padding: "4px 4px 4px 16px",
              display: "flex",
              alignItems: "flex-end",
              gap: 8,
              transition: "border-color 0.2s ease",
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                // Auto-resize
                e.target.style.height = "auto";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 120) + "px";
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask the Gita Mentor..."
              rows={1}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--text-primary)",
                fontSize: 15,
                lineHeight: 1.5,
                padding: "10px 0",
                resize: "none",
                fontFamily: "'Inter', sans-serif",
                maxHeight: 120,
              }}
            />
            <button
              onClick={() => handleSubmit()}
              disabled={!input.trim() || isLoading}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border: "none",
                background:
                  input.trim() && !isLoading
                    ? "var(--gradient-spiritual)"
                    : "rgba(99, 102, 241, 0.1)",
                color:
                  input.trim() && !isLoading
                    ? "white"
                    : "var(--text-muted)",
                cursor:
                  input.trim() && !isLoading ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
                transition: "all 0.2s ease",
              }}
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Message Bubble Component */
function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        padding: "4px 0",
      }}
    >
      <div
        style={{
          maxWidth: "80%",
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
          flexDirection: isUser ? "row-reverse" : "row",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: isUser
              ? "rgba(99, 102, 241, 0.15)"
              : "rgba(232, 168, 56, 0.15)",
            border: `1px solid ${
              isUser
                ? "rgba(99, 102, 241, 0.25)"
                : "rgba(232, 168, 56, 0.25)"
            }`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          {isUser ? "👤" : "🪷"}
        </div>

        {/* Bubble */}
        <div
          style={{
            padding: "12px 16px",
            borderRadius: isUser
              ? "16px 16px 4px 16px"
              : "16px 16px 16px 4px",
            background: isUser
              ? "rgba(99, 102, 241, 0.12)"
              : "var(--bg-card)",
            border: `1px solid ${
              isUser
                ? "rgba(99, 102, 241, 0.2)"
                : "var(--border-subtle)"
            }`,
            fontSize: 14.5,
            lineHeight: 1.7,
            color: "var(--text-primary)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {message.content}
        </div>
      </div>
    </motion.div>
  );
}
