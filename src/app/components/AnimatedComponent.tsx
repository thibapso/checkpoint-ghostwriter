"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AnimatedComponentProps {
  children: React.ReactNode;
  className?: string;
  animation?:
    | "fromTop"
    | "fromBottom"
    | "fromLeft"
    | "fromRight"
    | "scale"
    | "rotate";
  delay?: number;
}

export default function AnimatedComponent({
  children,
  className = "",
  animation = "fromBottom",
  delay = 0,
}: AnimatedComponentProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Certifique-se de que o código só é executado no cliente
    if (typeof window !== "undefined") {
      // Animação básica com GSAP
      const element = elementRef.current;
      if (element) {
        // Exemplo de uso do gsap.fromTo()
        // Comentário: Aqui estamos usando gsap.fromTo() para animar o elemento de um estado inicial para um estado final
        let fromVars = {};
        let toVars = {
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: delay,
        };

        switch (animation) {
          case "fromTop":
            fromVars = { opacity: 0, y: -100 };
            toVars = { ...toVars, y: 0 };
            break;
          case "fromBottom":
            fromVars = { opacity: 0, y: 100 };
            toVars = { ...toVars, y: 0 };
            break;
          case "fromLeft":
            fromVars = { opacity: 0, x: -100 };
            toVars = { ...toVars, x: 0 };
            break;
          case "fromRight":
            fromVars = { opacity: 0, x: 100 };
            toVars = { ...toVars, x: 0 };
            break;
          case "scale":
            fromVars = { opacity: 0, scale: 0.5 };
            toVars = { ...toVars, scale: 1 };
            break;
          case "rotate":
            fromVars = { opacity: 0, rotation: -45 };
            toVars = { ...toVars, rotation: 0 };
            break;
          default:
            fromVars = { opacity: 0, y: 50 };
            toVars = { ...toVars, y: 0 };
        }

        gsap.fromTo(element, fromVars, toVars);
      }
    }
  }, [animation, delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
