'use client';

import { X, ShieldCheck } from 'lucide-react';

export function PrivacyPolicyDialog() {
  return (
    <dialog
      id="privacy-policy-dialog"
      className="fixed inset-0 z-[9999] m-auto max-w-[640px] w-[calc(100%-32px)] max-h-[85vh] rounded-2xl border border-[rgba(184,196,204,0.1)] bg-[var(--ardosia)] text-[var(--editorial)] p-0 backdrop-blur-xl shadow-[0_16px_60px_rgba(0,0,0,0.5)] [&::backdrop]:bg-[rgba(0,0,0,0.7)] [&::backdrop]:backdrop-blur-sm"
    >
      <div className="flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-[rgba(184,196,204,0.08)] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(139,30,45,0.12)] border border-[rgba(139,30,45,0.25)]">
              <ShieldCheck className="h-4.5 w-4.5 text-[var(--crimson)]" />
            </div>
            <h2 className="font-serif text-lg text-[var(--editorial)]">Política de Privacidade</h2>
          </div>
          <button
            type="button"
            onClick={() => {
              const dialog = document.getElementById('privacy-policy-dialog');
              dialog?.close();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(184,196,204,0.12)] bg-transparent text-[var(--nevoa)] hover:text-[var(--editorial)] hover:border-[rgba(184,196,204,0.3)] transition-all duration-200 cursor-pointer"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 pt-4 flex-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--ardosia-md)] [&::-webkit-scrollbar-thumb]:rounded-full">
          <p className="text-[11px] text-[var(--nevoa)] mb-6 tracking-wide">
            Última atualização: Abril 2025
          </p>

          <div className="space-y-6 text-[13px] leading-[1.8] text-[var(--prata)]">
            <section>
              <h3 className="text-[var(--editorial)] text-[15px] font-semibold mb-2">1. Dados que coletamos</h3>
              <p className="mb-2">
                Coletamos apenas os dados necessários para prestar nossos serviços e manter a comunicação com você:
              </p>
              <ul className="flex flex-col gap-1.5 ml-4">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--crimson)] flex-shrink-0 mt-2" />
                  <span><strong className="text-[var(--editorial)]">Dados de contato:</strong> nome, e-mail e telefone (WhatsApp) fornecidos voluntariamente através do formulário de contato.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--crimson)] flex-shrink-0 mt-2" />
                  <span><strong className="text-[var(--editorial)]">Dados de navegação:</strong> informações técnicas como endereço IP, tipo de navegador, páginas visitadas e tempo de permanência, coletados automaticamente.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--crimson)] flex-shrink-0 mt-2" />
                  <span><strong className="text-[var(--editorial)]">Cookies:</strong> utilizamos cookies essenciais para o funcionamento do site e cookies analíticos (quando aceitos) para entender como os visitantes interagem com nosso conteúdo.</span>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-[var(--editorial)] text-[15px] font-semibold mb-2">2. Como utilizamos seus dados</h3>
              <p className="mb-2">
                Seus dados são utilizados exclusivamente para:
              </p>
              <ul className="flex flex-col gap-1.5 ml-4">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--crimson)] flex-shrink-0 mt-2" />
                  <span>Responder às suas solicitações de contato e proposta comercial</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--crimson)] flex-shrink-0 mt-2" />
                  <span>Enviar newsletter ou comunicações relevantes (mediante consentimento)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--crimson)] flex-shrink-0 mt-2" />
                  <span>Melhorar nosso site e a experiência de navegação</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--crimson)] flex-shrink-0 mt-2" />
                  <span>Cumprir obrigações legais aplicáveis</span>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-[var(--editorial)] text-[15px] font-semibold mb-2">3. Compartilhamento de dados</h3>
              <p>
                Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing. Podemos compartilhar informações apenas com prestadores de serviços que nos auxiliam na operação do site (hospedagem, análise de dados), sempre sob obrigações contratuais de confidencialidade.
              </p>
            </section>

            <section>
              <h3 className="text-[var(--editorial)] text-[15px] font-semibold mb-2">4. Segurança dos dados</h3>
              <p>
                Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, destruição, perda ou alteração. Isso inclui criptografia de sessões, proteção contra ataques de força bruta e controles de acesso administrativo.
              </p>
            </section>

            <section>
              <h3 className="text-[var(--editorial)] text-[15px] font-semibold mb-2">5. Seus direitos</h3>
              <p className="mb-2">
                Você tem o direito de:
              </p>
              <ul className="flex flex-col gap-1.5 ml-4">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--crimson)] flex-shrink-0 mt-2" />
                  <span>Acessar seus dados pessoais que temos armazenados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--crimson)] flex-shrink-0 mt-2" />
                  <span>Solicitar a correção ou exclusão dos seus dados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--crimson)] flex-shrink-0 mt-2" />
                  <span>Revogar o consentimento para cookies e comunicações</span>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-[var(--editorial)] text-[15px] font-semibold mb-2">6. Contato</h3>
              <p>
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato pelo e-mail{' '}
                <a href="mailto:advologos@gmail.com" className="text-[var(--crimson-lt)] hover:text-[var(--crimson)] transition-colors no-underline underline-offset-2 decoration-[var(--crimson-lt)]/30 hover:decoration-[var(--crimson-lt)]/60">
                  advologos@gmail.com
                </a>.
              </p>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-[rgba(184,196,204,0.06)] flex-shrink-0">
          <button
            type="button"
            onClick={() => {
              const dialog = document.getElementById('privacy-policy-dialog');
              dialog?.close();
            }}
            className="w-full rounded-lg bg-[var(--crimson)] text-[var(--editorial)] text-[12px] font-bold tracking-[0.08em] uppercase py-3 border-none cursor-pointer transition-all duration-300 hover:bg-[var(--crimson-dp)] active:scale-[0.98]"
          >
            Entendi
          </button>
        </div>
      </div>
    </dialog>
  );
}
