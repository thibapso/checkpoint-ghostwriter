# Ghost Writer AI - Animações com GSAP

Este projeto implementa uma landing page para o Ghost Writer AI com animações avançadas utilizando GSAP (GreenSock Animation Platform).

## Tecnologias Utilizadas

- Next.js 15.5.2
- GSAP (GreenSock Animation Platform)
- TailwindCSS
- TypeScript

## Animações Implementadas

### Métodos GSAP Utilizados

1. **gsap.fromTo()** - Utilizado no componente `AnimatedComponent.tsx` para animar elementos de um estado inicial para um estado final com diferentes tipos de animações:

   - Animações de entrada de cima para baixo
   - Animações de entrada de baixo para cima
   - Animações de entrada da esquerda para a direita
   - Animações de entrada da direita para a esquerda
   - Animações de escala
   - Animações de rotação

2. **gsap.to()** - Utilizado no componente `GsapAnimations.tsx` e na página principal para animar elementos para um estado final:

   - Animação dos elementos decorativos no hero (rotação contínua)
   - Animação dos cards de depoimentos

3. **gsap.from()** - Utilizado no componente `GsapAnimations.tsx` e na página principal para animar elementos a partir de um estado inicial:

   - Animação dos passos na seção "Como funciona"
   - Animação do footer

4. **gsap.timeline()** - Utilizado nos componentes `TimelineAnimation.tsx` e na página principal para criar sequências de animações:
   - Timeline para animar os cards de recursos
   - Timeline para animar a seção CTA
   - Timeline para animar a seção de chat

### ScrollTrigger

Foram implementados triggers de rolagem em diferentes seções da página:

1. **Seção de Recursos** - Animação sequencial dos cards de recursos quando o usuário rola até esta seção
2. **Seção Como Funciona** - Animação dos passos quando o usuário rola até esta seção
3. **Seção de Depoimentos** - Animação dos cards de depoimentos quando o usuário rola até esta seção
4. **Seção CTA** - Animação com timeline da seção CTA quando o usuário rola até esta seção
5. **Seção de Chat** - Animação com timeline dos elementos de chat quando o usuário rola até esta seção

## Componentes de Animação

1. **AnimatedComponent** - Componente reutilizável para animações básicas com diferentes estilos
2. **GsapAnimations** - Componente para demonstrar o uso de gsap.to() e gsap.from() com e sem ScrollTrigger
3. **TimelineAnimation** - Componente para criar animações sequenciais com timeline e ScrollTrigger

## Como Executar

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse http://localhost:3000 no seu navegador

## Observações

- Todas as animações são otimizadas para dispositivos móveis e desktop
- As animações são acionadas com base na rolagem da página
- O erro de hidratação foi corrigido adicionando o atributo `suppressHydrationWarning` e `cz-shortcut-listen="true"` ao elemento body no layout.tsx
