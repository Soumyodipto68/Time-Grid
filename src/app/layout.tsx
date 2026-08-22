import type { Metadata } from "next";
import "./globals.css";
import { MeetingProvider } from "../context/MeetingContext";

export const metadata: Metadata = {
  title: "Time-Zone Synchronizer",
  description: "Schedule meetings across time zones",
};

export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
        <MeetingProvider>
          {children}
        </MeetingProvider>
      </body>
    </html>
  );
}