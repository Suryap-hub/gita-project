"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: "🪷" },
    { href: "/chat", label: "Chat", icon: "💬" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "0 24px",
      }}
    >
      <div
        className="glass-strong"
        style={{
          maxWidth: 900,
          margin: "12px auto 0",
          borderRadius: 16,
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <span style={{ fontSize: 24 }}>🪷</span>
          <span
            className="text-gradient"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "-0.02em",
            }}
          >
            Gita Mentor
          </span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: "flex", gap: 4 }}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                  color: isActive
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                  background: isActive
                    ? "rgba(99, 102, 241, 0.15)"
                    : "transparent",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    e.currentTarget.style.background =
                      "rgba(99, 102, 241, 0.08)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ fontSize: 16 }}>{link.icon}</span>
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    style={{
                      position: "absolute",
                      bottom: -1,
                      left: "20%",
                      right: "20%",
                      height: 2,
                      borderRadius: 1,
                      background: "var(--gradient-spiritual)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
