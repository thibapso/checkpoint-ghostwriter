"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TimelineAnimationProps {
  children: React.ReactNode;
  className?: string;
  id: string;
}

export default function TimelineAnimation({
  children,
  className = "",
  id,
}: TimelineAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Certifique-se de que o código só é executado no cliente
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const container = containerRef.current;

      if (container) {
        // Selecionando elementos filhos para animar
        const elements = container.querySelectorAll(".animate-item");

        // Comentário: Aqui estamos usando gsap.timeline() com ScrollTrigger
        // para criar uma sequência de animações encadeadas
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            // markers: true, // Útil para debug, remover em produção
          },
        });

        // Adicionando animações à timeline
        elements.forEach((element, index) => {
          tl.from(
            element,
            {
              opacity: 0,
              y: 50,
              scale: 0.9,
              duration: 0.7,
              ease: "back.out(1.7)",
            },
            index * 0.2
          ); // Stagger de 0.2 segundos entre cada animação
        });
      }
    }
  }, []);

  return (
    <div ref={containerRef} className={className} id={id}>
      {children}
    </div>
  );
}
