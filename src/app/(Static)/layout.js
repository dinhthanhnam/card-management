"use client";
import "../globals.css";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LoadingBar from "../../components/Visibility/LoadingBar";

export default function AuthLayout({ children }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // Simulate loading time
    return () => clearTimeout(timeout);
  }, [pathname]); // Run loading effect when pathname changes

  return (
      <html lang="en">
      <body className="bg-gradient-purple min-h-screen">
      <LoadingBar loading={loading}/>
      {children}
      </body>
      </html>
  );
}