import React, { useState, useEffect, useRef } from "react";
import "./chat-bot-audit.css";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  isTyping?: boolean;
}

interface Question {
  id: string;
  text: { es: string; en: string };
  options: { label: { es: string; en: string }; value: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: { es: "¡Hola! Soy tu Consultor Estratégico de Adeptos. Vamos a evaluar los cuellos de botella en tu operación. Para empezar, ¿cuál es tu volumen de facturación mensual actual?", en: "Hello! I am your Strategic Consultant from Adeptos. Let's evaluate the bottlenecks in your operation. To start, what is your current monthly revenue volume?" },
    options: [
      { label: { es: "< $10k", en: "< $10k" }, value: "tier1" },
      { label: { es: "$10k - $50k", en: "$10k - $50k" }, value: "tier2" },
      { label: { es: "> $50k", en: "> $50k" }, value: "tier3" },
    ]
  },
  {
    id: "q2",
    text: { es: "¿Cuál es tu principal cuello de botella operativo?", en: "What is your main operational bottleneck?" },
    options: [
      { label: { es: "Adquisición de leads", en: "Lead acquisition" }, value: "leads" },
      { label: { es: "Ventas y cierres", en: "Sales & closing" }, value: "sales" },
      { label: { es: "Entregables/Operaciones", en: "Fulfillment/Ops" }, value: "ops" },
    ]
  },
  {
    id: "q3",
    text: { es: "¿Cuánto tiempo dedica tu equipo a tareas manuales (data entry, seguimientos) a la semana?", en: "How much time does your team spend on manual tasks (data entry, follow-ups) per week?" },
    options: [
      { label: { es: "1-5 horas", en: "1-5 hours" }, value: "low" },
      { label: { es: "5-15 horas", en: "5-15 hours" }, value: "medium" },
      { label: { es: "+15 horas", en: "15+ hours" }, value: "high" },
    ]
  },
  {
    id: "q4",
    text: { 
      es: "Analizando tus respuestas... 📊\n\nDetecto una fuga importante de capital en tu negocio debido a cuellos de botella manuales. Aquí tienes el plan de 3 pasos para arreglar esta fuga de inmediato:\n\n1. Implementar respuesta instantánea 24/7 en todos tus canales.\n2. Delegar la calificación de leads a un Agente de IA.\n3. Automatizar seguimientos para nunca perder prospectos.\n\nHe compilado un informe de diagnóstico detallado de 10 páginas para tu negocio y una demo web interactiva de tu agente. ¿Te gustaría desbloquear este paquete por solo $27?", 
      en: "Analyzing your responses... 📊\n\nI detect a significant capital leak in your business due to manual bottlenecks. Here is a 3-step plan to fix this leak immediately:\n\n1. Implement 24/7 instant response across all channels.\n2. Delegate lead qualification to an AI Agent.\n3. Automate follow-ups to never lose a prospect.\n\nI have compiled a detailed 10-page diagnostic report for your business and an interactive web demo of your agent. Would you like to unlock this package for only $27?" 
    },
    options: [
      { label: { es: "Sí, desbloquear ($27)", en: "Yes, unlock ($27)" }, value: "checkout" },
      { label: { es: "Saber más", en: "Learn more" }, value: "info" },
    ]
  }
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
}

export function ChatBotAudit({ isOpen, onClose, lang }: Props) {
  const [step, setStep] = useState<"form" | "chat">("form");
  const [report, setReport] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Form states
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);

  // Reset logic
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep("form");
        setCurrentQuestionIndex(0);
        setReport(null);
        setAnswers([]);
        setIsBotTyping(false);
      }, 300);
    }
  }, [isOpen]);

  const handleOptionClick = async (optionLabel: string) => {
    const newAnswers = [...answers, optionLabel];
    setAnswers(newAnswers);

    // Bot typing next question
    setIsBotTyping(true);
    const nextIdx = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIdx);

    if (nextIdx === QUESTIONS.length - 1) {
      // Show final report based on predefined text instead of calling AI
      setTimeout(() => {
        setIsBotTyping(false);
        setReport(QUESTIONS[nextIdx].text[lang as "es" | "en"] || QUESTIONS[nextIdx].text.es);
      }, 1500); // Simulate "thinking" for a bit for the effect
    } else {
      setTimeout(() => {
        setIsBotTyping(false);
      }, 600);
    }
  };

  if (!isOpen) return null;

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const locale = lang as "es" | "en";

  return (
    <div className="chatbot-overlay">
      <div className="chatbot-container">
        {step === "chat" && <div className="wizard-ambient-glow" />}
        
        <div className="wizard-content">
          <div className="wizard-top-bar">
            {step === "chat" ? (
              <button className="wizard-back-btn" onClick={() => setStep("form")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={24}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
            ) : (
              <div></div>
            )}
            <button className="wizard-back-btn" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={24}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {step === "form" ? (
            <div className="chatbot-lead-form">
              <div className="lead-form-content">
                <h3>{lang === "es" ? "Antes de comenzar..." : "Before we start..."}</h3>
                <p>{lang === "es" ? "Ingresa tus datos para generar tu análisis estratégico." : "Enter your details to generate your strategic analysis."}</p>
                
                <form onSubmit={(e) => { e.preventDefault(); setStep("chat"); }} className="lead-form-fields">
                  <input type="text" required placeholder={lang === "es" ? "Nombre completo" : "Full Name"} value={userName} onChange={e => setUserName(e.target.value)} />
                  <input type="email" required placeholder={lang === "es" ? "Correo electrónico" : "Email"} value={userEmail} onChange={e => setUserEmail(e.target.value)} />
                  <div className="phone-group">
                    <select required defaultValue="">
                      <option value="" disabled>{lang === "es" ? "País" : "Country"}</option>
                      <option value="CO">Colombia (+57)</option>
                      <option value="MX">México (+52)</option>
                      <option value="US">Estados Unidos (+1)</option>
                      <option value="ES">España (+34)</option>
                      <option value="AR">Argentina (+54)</option>
                      <option value="CL">Chile (+56)</option>
                      <option value="PE">Perú (+51)</option>
                      <option value="OTHER">Otro</option>
                    </select>
                    <input type="tel" required placeholder={lang === "es" ? "Teléfono" : "Phone"} />
                  </div>
                  
                  <button type="submit" className="robot-verify-btn">
                    <div className="checkbox-box"></div>
                    <span>{lang === "es" ? "No soy un robot - Iniciar" : "I'm not a robot - Start"}</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <>
              {report ? (
                <>
                  <div className="wizard-report-text">
                    {report}
                  </div>
                  <div className="wizard-bottom-area">
                    <button className="wizard-checkout-btn" onClick={() => window.location.href = `/${lang}/tripwire`}>
                      {lang === "es" ? "Obtener mi Reporte y Demo ($27)" : "Get my Report & Demo ($27)"}
                    </button>
                  </div>
                </>
              ) : isBotTyping ? (
                <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)'}}>
                  <div className="wizard-glowing-action">
                    <div className="wizard-glowing-ring-1"></div>
                    <div className="wizard-glowing-ring-2"></div>
                    <div className="wizard-glowing-core">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={24}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="wizard-layout-chat">
                  <div className="wizard-header-text">
                    <h1>{lang === "es" ? `Hola ${userName.split(' ')[0] || "ahí"}` : `Hi ${userName.split(' ')[0] || "there"}`}</h1>
                    <p>{currentQuestion.text[locale] || currentQuestion.text.es}</p>
                  </div>

                  <div className="wizard-bottom-group">
                    <div className="wizard-options-grid">
                      {currentQuestion.options.map((opt) => (
                        <button
                          key={opt.value}
                          className="wizard-card-btn"
                          onClick={() => handleOptionClick(opt.label[locale] || opt.label.es)}
                        >
                          <span className="wizard-card-dot"></span>
                          <span className="wizard-card-text">{opt.label[locale] || opt.label.es}</span>
                        </button>
                      ))}
                    </div>

                    <div className="wizard-bottom-area">
                      <div className="wizard-pill-input">
                        <span className="wizard-pill-text">{lang === "es" ? "Toca una opción arriba" : "Tap an option above"}</span>
                        <div className="wizard-pill-btn">
                          <svg viewBox="0 0 24 24" fill="currentColor" width={16}>
                            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
