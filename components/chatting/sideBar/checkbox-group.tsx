"use client";

import React, { useEffect, useRef, useState } from "react";
import CheckBoxCard from "./checkbox-card";

type Option = {
  id: string;
  title: string;
  description: string;
};

type CheckBoxCardGroupProps = {
  type: "small" | "large";
  options: Option[];
  defaultSelected?: string;
  isCollapsed?: boolean;
};

const CheckBoxCardGroup = ({
  options,
  defaultSelected = "",
  isCollapsed = false,
  type,
}: CheckBoxCardGroupProps) => {
  const [selectedId, setSelectedId] = useState(defaultSelected);
  const containerRef = useRef(null);
  const [size, setSize] = useState("");

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width <= 1024 && width > 768) {
        setSize("220px");
      } else if (width <= 768 && width > 440) {
        setSize("700px");
      } else if (width <= 440 && width > 375) {
        setSize("400px");
      } else if (width <= 375 && width > 344) {
        setSize("350px");
      } else if (width <= 344) {
        setSize("320px");
      } else {
        setSize("400px");
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  return (
    <div
      ref={containerRef}
      className={`space-y-5 ${isCollapsed ? "flex flex-col items-center" : ""}`}
      style={{ width: type === "large" ? size : "auto" }}
    >
      {options.map((option, index) => (
        <CheckBoxCard
          key={option.id}
          id={option.id}
          title={option.title}
          description={option.description}
          checked={selectedId === option.id}
          onSelect={handleSelect}
          isCollapsed={isCollapsed}
          isLastItem={index === options.length - 1}
        />
      ))}
    </div>
  );
};

export default CheckBoxCardGroup;
