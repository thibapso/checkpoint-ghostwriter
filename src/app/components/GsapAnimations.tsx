"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface GsapAnimationsProps {
  type: "to" | "from";
  children: React.ReactNode;
  className?: string;
  trigger?: boolean;
}

export default function GsapAnimations({
  type,
  children,
  className = "",
  trigger = false,
}: GsapAnimationsProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      const element = elementRef.current;

      if (element) {
        if (type === "to") {
          // Comentário: Aqui estamos usando gsap.to() para animar o elemento para um estado final
          if (trigger) {
            gsap.to(element, {
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
              opacity: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 1,
              ease: "elastic.out(1, 0.3)",
            });
          } else {
            gsap.to(element, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 1,
              ease: "elastic.out(1, 0.3)",
              delay: 0.2,
            });
          }
        } else if (type === "from") {
          // Comentário: Aqui estamos usando gsap.from() para animar o elemento a partir de um estado inicial
          if (trigger) {
            gsap.from(element, {
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
              opacity: 0,
              y: 100,
              scale: 0.8,
              rotation: 10,
              duration: 1.2,
              ease: "power4.out",
            });
          } else {
            gsap.from(element, {
              opacity: 0,
              y: 100,
              scale: 0.8,
              rotation: 10,
              duration: 1.2,
              ease: "power4.out",
              delay: 0.3,
            });
          }
        }
      }
    }
  }, [type, trigger]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: type === "to" ? 0 : 1,
        transform:
          type === "to" ? "translateY(50px) scale(0.9) rotate(5deg)" : "none",
      }}
    >
      {children}
    </div>
  );
}
