"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, []);

  return (
    <div className="h-screen">
      <h2>Loading...</h2>
    </div>
  );
}
