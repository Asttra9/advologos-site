import { useEffect, useRef, useState } from 'react';

export default function App() {
  const heroGlowRef = useRef(null);
  const navPillRef = useRef(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  useEffect(() => {
    // ── Reveal on scroll ──
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

    // ── Active nav ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-pill a');

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sections.forEach(s => sectionObserver.observe(s));

    // ── Nav scroll state ──
    const handleScroll = () => {
      const scrolled = window.scrollY > 60;
      if (navPillRef.current) {
        navPillRef.current.classList.toggle('scrolled', scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── Hero parallax glow ──
    const handleMouseMove = (e) => {
      if (!heroGlowRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      heroGlowRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ── Smooth scroll for anchor links ──
    const handleAnchorClick = (e) => {
      const target = e.target;
      const anchor = target.closest('a');
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const navHeight = document.getElementById('nav')?.offsetHeight || 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <>
      {/* NAV */}
      <nav id="nav">
        <a href="#hero" className="nav-logo">Advo<span>logos</span></a>
        <div className="nav-pill" id="navPill" ref={navPillRef}>
          <a href="#problema">Por que</a>
          <a href="#servicos">Serviços</a>
          <a href="#metodo">Método</a>
          <a href="#autoridade">Autoridade</a>
        </div>
        <a href="https://wa.me/5500000000000" className="nav-cta" target="_blank" rel="noopener noreferrer">
          Falar agora
          <span className="cta-icon">↗</span>
        </a>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-bg">
          <div className="hero-glow" id="heroGlow" ref={heroGlowRef}></div>
          <div className="hero-line-v" style={{ left: '28%' }}></div>
          <div className="hero-line-v" style={{ right: '22%', opacity: 0.5 }}></div>
        </div>
        <div className="hero-inner">
          <div className="eyebrow" data-reveal="true">
            Branding & Presença Digital Jurídica
          </div>

          <h1 className="hero-h1" data-reveal="true" data-delay="1">
            Marcas jurídicas<br />com <em>presença,</em><br />clareza e autoridade.
          </h1>

          <p className="hero-subtitle" data-reveal="true" data-delay="2">
            A Advologos estrutura a forma como o mercado<br />percebe quem advoga.
          </p>

          <div className="hero-body" data-reveal="true" data-delay="3">
            <p>
              A maioria dos escritórios perde clientes para concorrentes tecnicamente inferiores. O que está faltando não é competência — é a forma como ela é percebida.
            </p>
            <p>
              Não fazemos logotipos. Arquitetamos identidades que comunicam autoridade antes da primeira conversa. Cada detalhe tem uma razão estrutural.
            </p>
          </div>

          <div className="hero-actions" data-reveal="true" data-delay="4">
            <a href="#servicos" className="btn-primary">
              Ver pacotes
              <span className="btn-icon">↓</span>
            </a>
            <a href="#metodo" className="btn-ghost">
              Como funciona
            </a>
          </div>

          <div className="hero-tags" data-reveal="true" data-delay="5">
            <div className="tag glass">Identidade Visual</div>
            <div className="tag glass">Presença Digital</div>
            <div className="tag glass">Autoridade de Marca</div>
            <div className="tag">Branding Jurídico</div>
            <div className="tag">Legal Design</div>
            <div className="tag">OAB Compliant</div>
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section id="problema">
        <div className="container">
          <div className="inner">
            <div>
              <div className="section-eyebrow" data-reveal="true">01 — O Problema</div>
              <h2 className="section-title" data-reveal="true" data-delay="1">
                Percepção é<br />precedente.
              </h2>
              <p className="section-body" data-reveal="true" data-delay="2">
                No mercado jurídico, o cliente contrata quem parece mais competente, não necessariamente quem é. Uma marca inconsistente não é apenas um problema estético — é um problema de negócio.
              </p>
              <div className="problem-note" data-reveal="true" data-delay="3">
                <strong>A verdade inconveniente:</strong> um advogado brilhante com marca genérica compete em desvantagem com um colega mediano bem posicionado. A Advologos corrige essa equação — sem comprometer a ética profissional exigida pelo Provimento 205/2021 da OAB.
              </div>
            </div>

            <div className="problem-stats" data-reveal="true" data-delay="2">
              <div className="stat-row">
                <div className="stat-row-inner">
                  <div className="stat-num">7s</div>
                  <div className="stat-text">
                    <strong>Primeiros segundos são decisivos</strong>
                    É o tempo que um potencial cliente leva para formar uma opinião sobre um escritório com base na identidade visual.
                  </div>
                </div>
              </div>
              <div className="stat-row">
                <div className="stat-row-inner">
                  <div className="stat-num">3×</div>
                  <div className="stat-text">
                    <strong>Percepção multiplica conversão</strong>
                    Escritórios com identidade estruturada convertem até três vezes mais consultas em clientes do que os sem sistema de marca.
                  </div>
                </div>
              </div>
              <div className="stat-row">
                <div className="stat-row-inner">
                  <div className="stat-num">92%</div>
                  <div className="stat-text">
                    <strong>Decisão antes do primeiro contato</strong>
                    A maioria dos clientes pesquisa o escritório online e já chega com uma opinião formada sobre competência antes de qualquer conversa.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos">
        <div className="container">
          <div className="section-eyebrow" data-reveal="true">02 — Serviços</div>
          <h2 className="section-title" data-reveal="true" data-delay="1">
            Três níveis.<br />Um sistema coerente.
          </h2>
          <p className="section-body" data-reveal="true" data-delay="2">
            Cada pacote é estruturado para um momento específico da trajetória do profissional jurídico. Não existe hierarquia de importância — existe adequação ao contexto.
          </p>

          <div className="services-grid" data-reveal="true" data-delay="3">

            {/* SIGNUM */}
            <div className="service-card">
              <div className="service-card-inner">
                <div className="service-tier">Entrada</div>
                <div className="service-name">Signum</div>
                <div className="service-meaning">"A marca que te distingue"</div>
                <p className="service-desc">
                  Identidade visual completa para profissionais que iniciam sua presença de marca no mercado jurídico. Fundação sólida, sem atalhos.
                </p>
                <ul className="service-items">
                  <li>Logotipo e versões de aplicação</li>
                  <li>Paleta de cores e tipografia</li>
                  <li>Manual de identidade visual</li>
                  <li>Assinatura de e-mail profissional</li>
                  <li>Kit redes sociais (5 templates)</li>
                </ul>
                <div className="service-price">
                  A partir de <span>R$ 89,90</span>
                </div>
                <a href="https://wa.me/5500000000000" className="service-cta" target="_blank" rel="noopener noreferrer">
                  Solicitar proposta
                  <span className="cta-arrow">↗</span>
                </a>
              </div>
            </div>

            {/* AUTORITAS */}
            <div className="service-card featured">
              <div className="service-card-inner">
                <div className="service-tier">Recomendado</div>
                <div className="service-name">Autoritas</div>
                <div className="service-meaning">"A autoridade que se constrói"</div>
                <p className="service-desc">
                  Branding completo com presença digital estruturada. Para profissionais que querem ser percebidos como referência em sua área de atuação.
                </p>
                <ul className="service-items">
                  <li>Tudo do Signum, expandido</li>
                  <li>Site institucional 1 página</li>
                  <li>Perfil Instagram estratégico</li>
                  <li>30 templates de conteúdo</li>
                  <li>Proposta comercial diagramada</li>
                  <li>Cartão de visita + papelaria</li>
                </ul>
                <div className="service-price">
                  A partir de <span>R$ 290</span>
                </div>
                <a href="https://wa.me/5500000000000" className="service-cta" target="_blank" rel="noopener noreferrer">
                  Solicitar proposta
                  <span className="cta-arrow">↗</span>
                </a>
              </div>
            </div>

            {/* IMPERIUM */}
            <div className="service-card">
              <div className="service-card-inner">
                <div className="service-tier">Premium</div>
                <div className="service-name">Imperium</div>
                <div className="service-meaning">"A presença que precede a conversa"</div>
                <p className="service-desc">
                  Sistema completo de marca e presença digital para escritórios que precisam comunicar autoridade em múltiplos canais com consistência absoluta.
                </p>
                <ul className="service-items">
                  <li>Tudo do Autoritas, ampliado</li>
                  <li>Site completo multi-página</li>
                  <li>Estratégia de conteúdo 90 dias</li>
                  <li>Brand guidelines interativo</li>
                  <li>Consultoria de posicionamento</li>
                  <li>Suporte mensal 3 meses</li>
                </ul>
                <div className="service-price">
                  A partir de <span>R$ 890</span>
                </div>
                <a href="https://wa.me/5500000000000" className="service-cta" target="_blank" rel="noopener noreferrer">
                  Solicitar proposta
                  <span className="cta-arrow">↗</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MÉTODO */}
      <section id="metodo">
        <div className="container">
          <div className="section-eyebrow" data-reveal="true">03 — Método</div>
          <h2 className="section-title" data-reveal="true" data-delay="1">
            Estrutura antes<br />de estética.
          </h2>

          <div className="method-grid">
            <div className="method-steps" data-reveal="true" data-delay="2">
              <div className="step">
                <div className="step-inner">
                  <div className="step-num">01</div>
                  <div>
                    <div className="step-title">Diagnóstico de Percepção</div>
                    <div className="step-text">Analisamos como o profissional é percebido hoje e como precisa ser percebido para atingir seus objetivos. A marca começa no problema de negócio, não no estilo.</div>
                  </div>
                </div>
              </div>
              <div className="step">
                <div className="step-inner">
                  <div className="step-num">02</div>
                  <div>
                    <div className="step-title">Estratégia de Posicionamento</div>
                    <div className="step-text">Definimos o território de marca: área de atuação, público prioritário, diferencial competitivo e tom de voz. Tudo documentado antes do primeiro traço de design.</div>
                  </div>
                </div>
              </div>
              <div className="step">
                <div className="step-inner">
                  <div className="step-num">03</div>
                  <div>
                    <div className="step-title">Construção do Sistema Visual</div>
                    <div className="step-text">Logotipo, cores, tipografia e elementos gráficos desenvolvidos como um sistema — não como peças isoladas. Cada decisão tem uma razão estrutural documentada.</div>
                  </div>
                </div>
              </div>
              <div className="step">
                <div className="step-inner">
                  <div className="step-num">04</div>
                  <div>
                    <div className="step-title">Aplicação e Presença Digital</div>
                    <div className="step-text">A identidade é aplicada em todos os pontos de contato definidos no pacote: site, redes sociais, materiais impressos e templates operacionais.</div>
                  </div>
                </div>
              </div>
              <div className="step">
                <div className="step-inner">
                  <div className="step-num">05</div>
                  <div>
                    <div className="step-title">Entrega e Documentação</div>
                    <div className="step-text">Brand guidelines completo, arquivos originais organizados e instruções de uso. A marca entregue é operável sem a Advologos — por design.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="method-aside" data-reveal="true" data-delay="3">
              <div className="method-statement">
                <div className="method-statement-inner">
                  <div className="method-quote">
                    "Um império pode continuar sem o imperador. Mas não há imperador sem o império."
                  </div>
                  <div className="method-attribution">— Princípio operacional da Advologos</div>
                </div>
              </div>

              <div className="method-checklist">
                <div className="method-checklist-inner">
                  <div className="checklist-title">O que diferencia nossa entrega</div>
                  <ul className="checklist-items">
                    <li>
                      <span className="check-dot">✓</span>
                      Alinhado ao Provimento 205/2021 da OAB
                    </li>
                    <li>
                      <span className="check-dot">✓</span>
                      Arquivos em formatos profissionais editáveis
                    </li>
                    <li>
                      <span className="check-dot">✓</span>
                      Manual de uso com todos os contextos mapeados
                    </li>
                    <li>
                      <span className="check-dot">✓</span>
                      Sistema pensado para escalar, não engavetar
                    </li>
                    <li>
                      <span className="check-dot">✓</span>
                      Sem dependência contínua de agência para operar
                    </li>
                    <li>
                      <span className="check-dot">✓</span>
                      Revisões documentadas e aprovação etapa por etapa
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUTORIDADE */}
      <section id="autoridade">
        <div className="container">
          <div className="inner">
            <div className="authority-text">
              <div className="section-eyebrow" data-reveal="true">04 — Por que a Advologos</div>
              <h2 className="section-title" data-reveal="true" data-delay="1">
                A marca que<br />entrega é a<br />que demonstra.
              </h2>
              <p className="section-body" data-reveal="true" data-delay="2">
                Não vendemos branding genérico com verniz jurídico. Somos especialistas no mercado legal e cada decisão de design é fundamentada na realidade do profissional que advoga.
              </p>

              <div className="authority-pillars" data-reveal="true" data-delay="3">
                <div className="pillar">
                  <div className="pillar-icon">⚖</div>
                  <div className="pillar-body">
                    <div className="pillar-title">Especialização jurídica</div>
                    <div className="pillar-text">Conhecemos as restrições éticas, o vocabulário técnico e a forma como o cliente jurídico toma decisões. Não é nicho — é foco.</div>
                  </div>
                </div>
                <div className="pillar">
                  <div className="pillar-icon">◆</div>
                  <div className="pillar-body">
                    <div className="pillar-title">Sistemas, não peças</div>
                    <div className="pillar-text">Entregamos identidades que funcionam em qualquer contexto, não logotipos bonitos que perdem coerência no segundo uso.</div>
                  </div>
                </div>
                <div className="pillar">
                  <div className="pillar-icon">▲</div>
                  <div className="pillar-body">
                    <div className="pillar-title">Método documentado</div>
                    <div className="pillar-text">Cada decisão tem uma justificativa estratégica. O cliente recebe o raciocínio, não apenas o resultado — porque marca é decisão, não gosto.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="authority-visual" data-reveal="true" data-delay="2">
              <div className="authority-card">
                <div className="authority-card-inner">
                  <blockquote>
                    "Antes eu tinha um logo. Agora tenho uma marca que as pessoas reconhecem antes de eu falar qualquer coisa."
                  </blockquote>
                  <cite><strong>Dra. Marina Vasconcelos</strong><br />Advogada Tributarista — São Paulo</cite>
                </div>
              </div>

              <div className="authority-card">
                <div className="authority-card-inner">
                  <blockquote>
                    "O processo foi diferente de tudo que já contratei. Tinham uma razão para cada decisão — e as razões faziam sentido para o meu negócio."
                  </blockquote>
                  <cite><strong>Dr. Carlos Eduardo Mendes</strong><br />Sócio Fundador — Mendes & Associados (Previdenciário)</cite>
                </div>
              </div>

              <div className="authority-card">
                <div className="authority-card-inner">
                  <blockquote>
                    "Passei a cobrar honorários maiores depois do rebranding. Não porque aumentei os preços — porque parei de parecer genérico."
                  </blockquote>
                  <cite><strong>Dr. Thiago Lemos</strong><br />Advogado Trabalhista — Rio de Janeiro</cite>
                </div>
              </div>

              <div className="oab-notice">
                <div className="oab-notice-inner">
                  <div className="oab-label">Conformidade OAB</div>
                  <p className="oab-text">
                    Todo o trabalho desenvolvido pela Advologos respeita integralmente o <strong>Provimento 205/2021</strong> do Conselho Federal da OAB — que regulamenta a publicidade e o marketing na advocacia. Nenhuma entrega viola as regras de publicidade ética da profissão.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta">
        <div className="container">
          <div className="cta-box" data-reveal="true">
            <div className="cta-box-inner">
              <div className="eyebrow" style={{ justifyContent: 'center', margin: '0 auto 28px' }}>
                Pronto para começar?
              </div>
              <h2 className="cta-title">
                A presença que o<br />mercado <em>percebe</em><br />começa aqui.
              </h2>
              <p className="cta-sub">
                Solicite uma proposta sem compromisso. Analisamos seu contexto e apresentamos o pacote adequado para onde você está e para onde quer chegar.
              </p>

              {!submitSuccess ? (
                <form className="cta-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input type="text" name="name" placeholder="Seu nome" required />
                  </div>
                  <div className="form-group">
                    <input type="email" name="email" placeholder="Seu e-mail" required />
                  </div>
                  <div className="form-group">
                    <input type="tel" name="whatsapp" placeholder="Seu WhatsApp" required />
                  </div>
                  <div className="form-group">
                    <textarea name="message" placeholder="Sua mensagem" rows={4} required></textarea>
                  </div>
                  <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ width: '100%', justifyContent: 'center' }}>
                    {isSubmitting ? (
                      <span className="loading-spinner"></span>
                    ) : (
                      <>
                        Enviar mensagem
                        <span className="btn-icon">↗</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="form-success">
                  <div className="success-icon">✓</div>
                  <h3>Mensagem enviada!</h3>
                  <p>Entraremos em contato em até 24 horas.</p>
                  <button className="btn-ghost" onClick={() => setSubmitSuccess(false)}>Enviar nova mensagem</button>
                </div>
              )}

              <p className="cta-note">Resposta em até 24 horas — o primeiro passo para consolidar sua autoridade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-logo">Advo<span>logos</span></div>
          <ul className="footer-links">
            <li><a href="#problema">Por que</a></li>
            <li><a href="#servicos">Serviços</a></li>
            <li><a href="#metodo">Método</a></li>
            <li><a href="#autoridade">Autoridade</a></li>
          </ul>
          <div className="footer-legal">
            Marcas jurídicas com presença, clareza e autoridade.<br />
            <small>© 2022 - 2026 Advologos — Uso e aplicação sujeitos às diretrizes de marca.</small>
          </div>
        </div>
      </footer>
    </>
  );
}
