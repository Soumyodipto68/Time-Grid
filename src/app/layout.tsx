import type { Metadata } from "next";
import "./globals.css";

import SessionProvider from "../context/SessionProvider";
import { MeetingProvider } from "../context/MeetingContext";
import { TeamProvider } from "../context/TeamContext";

export const metadata: Metadata = {
  title: "Time-Zone Synchronizer",
  description:
    "Schedule meetings across different time zones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <TeamProvider>
            <MeetingProvider>
              {children}
            </MeetingProvider>
          </TeamProvider>
        </SessionProvider>
      </body>
    </html>
  );
}