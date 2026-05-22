import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface ChatStore {
  messages: Message[];
  isLoading: boolean;
  addMessage: (role: "user" | "assistant", content: string) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [],
      isLoading: false,

      addMessage: (role, content) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              role,
              content,
              timestamp: Date.now(),
            },
          ],
        })),

      setLoading: (loading) => set({ isLoading: loading }),

      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: "gita-mentor-chat",
    }
  )
);
