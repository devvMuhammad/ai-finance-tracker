"use client";

import { useEffect, useState } from "react";

export function BarChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-full w-full flex items-center justify-center">Loading chart...</div>;
  }

  // Generate random data for the bar chart
  const generateBars = () => {
    const bars = [];
    for (let i = 0; i < 31; i++) {
      const height = Math.floor(Math.random() * 80) + 20;
      bars.push(
        <div
          key={i}
          className="bg-gray-500 hover:bg-primary w-2 rounded-t-sm transition-colors"
          style={{ height: `${height}px` }}
        />
      );
    }
    return bars;
  };

  return (
    <div className="h-full w-full">
      <div className="h-full w-full flex items-end justify-between space-x-1 pb-4">
        {generateBars()}
      </div>
    </div>
  );
} 