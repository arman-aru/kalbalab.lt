import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to KalbaLab to keep your progress and XP.",
};

export default function SigninLayout({ children }: { children: React.ReactNode }) {
  return children;
}
