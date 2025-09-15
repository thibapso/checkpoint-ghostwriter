// src/app/page.tsx
"use client";
import { ChatInterface } from "./components/chat-interface";
import AnimatedComponent from "./components/AnimatedComponent";
import TimelineAnimation from "./components/TimelineAnimation";
import GsapAnimations from "./components/GsapAnimations";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Registrar o plugin ScrollTrigger
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Animações para elementos decorativos do hero
      if (heroRef.current) {
        const decorElements =
          heroRef.current.querySelectorAll(".decor-element");

        // Comentário: Aqui estamos usando gsap.to() para animar elementos decorativos
        gsap.to(decorElements, {
          rotation: 360,
          duration: 20,
          ease: "none",
          repeat: -1,
          stagger: 2,
        });
      }

      // Animação para o CTA com timeline
      if (ctaRef.current) {
        // Comentário: Aqui estamos usando gsap.timeline() para criar uma sequência de animações
        const ctaTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        ctaTimeline
          .from(ctaRef.current, {
            backgroundColor: "rgba(102, 51, 153, 0.5)",
            duration: 1,
          })
          .from(
            ctaRef.current.querySelector("h2"),
            {
              y: 50,
              opacity: 0,
              duration: 0.7,
            },
            "-=0.5"
          )
          .from(
            ctaRef.current.querySelector("p"),
            {
              y: 30,
              opacity: 0,
              duration: 0.7,
            },
            "-=0.4"
          )
          .from(
            ctaRef.current.querySelector("button"),
            {
              scale: 0.5,
              opacity: 0,
              duration: 0.7,
              ease: "back.out(1.7)",
            },
            "-=0.3"
          );
      }

      // Animação para o footer
      if (footerRef.current) {
        // Comentário: Aqui estamos usando gsap.from() para animar o footer
        gsap.from(footerRef.current, {
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
      }
    }
  }, []);
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <AnimatedComponent
            className="text-center"
            animation="scale"
            delay={0.3}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Ghost Writer AI
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Transforme suas memórias em uma autobiografia profissional com
              inteligência artificial. Conte sua história de forma única e
              emocionante.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GsapAnimations type="to" className="inline-block">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Começar Agora
                </button>
              </GsapAnimations>
              <GsapAnimations type="from" className="inline-block">
                <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
                  Saiba Mais
                </button>
              </GsapAnimations>
            </div>
          </AnimatedComponent>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl decor-element"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl decor-element"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-500/30 rounded-full blur-lg decor-element"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-purple-500/30 rounded-full blur-lg decor-element"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedComponent className="text-center mb-16" animation="fromTop">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o Ghost Writer AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nossa plataforma combina tecnologia avançada com sensibilidade
              humana para criar histórias únicas
            </p>
          </AnimatedComponent>

          <TimelineAnimation
            className="grid md:grid-cols-3 gap-8"
            id="features-timeline"
          >
            <div className="text-center p-6 feature-card animate-item">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                IA Inteligente
              </h3>
              <p className="text-gray-600">
                Tecnologia de ponta que entende contexto e emoção para criar
                narrativas envolventes
              </p>
            </div>

            <div className="text-center p-6 feature-card animate-item">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Histórias Únicas
              </h3>
              <p className="text-gray-600">
                Cada autobiografia é personalizada e reflete a essência única de
                sua jornada
              </p>
            </div>

            <div className="text-center p-6 feature-card animate-item">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Feito com Amor
              </h3>
              <p className="text-gray-600">
                Preservamos a autenticidade e emoção de suas memórias mais
                preciosas
              </p>
            </div>
          </TimelineAnimation>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white steps-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedComponent
            className="text-center mb-16"
            animation="fromBottom"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Como funciona?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Em apenas 3 passos simples, você terá sua autobiografia pronta
            </p>
          </AnimatedComponent>

          <div className="grid md:grid-cols-3 gap-8">
            <GsapAnimations
              type="from"
              trigger={true}
              className="text-center step-item"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Conte sua história
              </h3>
              <p className="text-gray-600">
                Responda perguntas simples sobre sua vida, memórias e
                experiências
              </p>
            </GsapAnimations>

            <GsapAnimations
              type="from"
              trigger={true}
              className="text-center step-item"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                IA processa
              </h3>
              <p className="text-gray-600">
                Nossa inteligência artificial analisa e organiza suas respostas
              </p>
            </GsapAnimations>

            <GsapAnimations
              type="from"
              trigger={true}
              className="text-center step-item"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Receba seu livro
              </h3>
              <p className="text-gray-600">
                Baixe sua autobiografia em PDF, pronta para compartilhar
              </p>
            </GsapAnimations>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedComponent className="text-center mb-16" animation="fromLeft">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              O que nossos usuários dizem
            </h2>
          </AnimatedComponent>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GsapAnimations
              type="to"
              trigger={true}
              className="bg-white p-6 rounded-lg shadow-lg testimonial-card"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">Maria Silva</h4>
                  <p className="text-gray-500 text-sm">Aposentada</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Finalmente consegui documentar minha história para meus netos.
                O processo foi tão fácil e o resultado ficou incrível!"
              </p>
            </GsapAnimations>

            <GsapAnimations
              type="to"
              trigger={true}
              className="bg-white p-6 rounded-lg shadow-lg testimonial-card"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">João Santos</h4>
                  <p className="text-gray-500 text-sm">Empresário</p>
                </div>
              </div>
              <p className="text-gray-600">
                "A IA capturou perfeitamente a essência da minha jornada
                empresarial. Recomendo para todos!"
              </p>
            </GsapAnimations>

            <GsapAnimations
              type="to"
              trigger={true}
              className="bg-white p-6 rounded-lg shadow-lg testimonial-card"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">Ana Costa</h4>
                  <p className="text-gray-500 text-sm">Professora</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Processo simples e resultado profissional. Minha família adorou
                ler sobre minha vida!"
              </p>
            </GsapAnimations>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white"
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para contar sua história?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Comece agora mesmo e crie uma autobiografia que será um tesouro para
            sua família
          </p>
          <button className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Começar Gratuitamente
          </button>
        </div>
      </section>

      {/* Chat Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <TimelineAnimation className="text-center mb-12" id="chat-timeline">
            <h2 className="text-4xl font-bold text-white mb-4 animate-item">
              Vamos começar sua jornada
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-item">
              Responda algumas perguntas sobre sua vida e deixe nossa IA criar
              uma autobiografia única e emocionante
            </p>
          </TimelineAnimation>

          <AnimatedComponent
            className="mb-8"
            animation="fromBottom"
            delay={0.5}
          >
            <ChatInterface />
          </AnimatedComponent>
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Ghost Writer AI</h3>
              <p className="text-gray-400">
                Transformando memórias em histórias atemporais com inteligência
                artificial.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Como funciona
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Preços
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Exemplos
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Central de ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Termos de uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Ghost Writer AI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
