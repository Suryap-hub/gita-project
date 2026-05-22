"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
        textAlign: "center",
      }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          maxWidth: 680,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Lotus Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(99, 102, 241, 0.1)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
          }}
        >
          🪷
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(36px, 6vw, 56px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          <span className="text-gradient">Ancient Wisdom.</span>
          <br />
          <span style={{ color: "var(--text-primary)" }}>Modern Life.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            fontSize: 18,
            lineHeight: 1.7,
            color: "var(--text-secondary)",
            maxWidth: 520,
          }}
        >
          Your personal AI spiritual mentor, guided by the timeless teachings of
          the <strong style={{ color: "var(--saffron)" }}>Bhagavad Gita</strong>.
          Ask anything about life, purpose, duty, and inner peace.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ marginTop: 8 }}
        >
          <Link href="/chat" style={{ textDecoration: "none" }}>
            <button
              className="btn-glow"
              style={{
                background: "var(--gradient-spiritual)",
                color: "white",
                border: "none",
                padding: "16px 40px",
                borderRadius: 14,
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <span>Begin Your Journey</span>
              <span style={{ fontSize: 20 }}>→</span>
            </button>
          </Link>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="glass"
          style={{
            marginTop: 40,
            padding: "20px 28px",
            borderRadius: 14,
            maxWidth: 500,
          }}
        >
          <p
            style={{
              fontSize: 15,
              fontStyle: "italic",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}
          >
            &ldquo;Yoga is the journey of the self, through the self, to the
            self.&rdquo;
          </p>
          <p
            style={{
              fontSize: 13,
              color: "var(--text-muted)",
              marginTop: 8,
            }}
          >
            — Bhagavad Gita 6.20
          </p>
        </motion.div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          maxWidth: 680,
          width: "100%",
          marginTop: 60,
        }}
      >
        {[
          {
            icon: "🤖",
            title: "AI Guidance",
            desc: "Powered by Google Gemini",
          },
          {
            icon: "📖",
            title: "Gita Wisdom",
            desc: "700 verses of knowledge",
          },
          {
            icon: "🧘",
            title: "Inner Peace",
            desc: "Practical spiritual advice",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="glass"
            style={{
              padding: "24px 20px",
              borderRadius: 14,
              textAlign: "center",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-glow)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-subtle)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 10 }}>{feature.icon}</div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: 4,
              }}
            >
              {feature.title}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "var(--text-muted)",
              }}
            >
              {feature.desc}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
