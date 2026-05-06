import React from "react";
import { AdeptosLogo } from "@/shared/components/brand";
import { CheckCircle2, Lock, ArrowRight, Star } from "lucide-react";

export default function TripwirePage() {
  return (
    <div className="min-h-screen bg-(--brand-navy) text-white font-sans selection:bg-(--brand-sage) selection:text-black">
      {/* Navbar Minimalista */}
      <header className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <AdeptosLogo forBackground="dark" variant="horizontal-gray" imgClassName="h-6 w-auto" />
          <div className="flex items-center gap-2 text-sm text-white/50 font-medium">
            <Lock className="w-4 h-4" /> Pago 100% Seguro
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Columna Izquierda: Copy / VSL */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--brand-sage)/10 text-(--brand-sage) text-sm font-semibold border border-(--brand-sage)/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-(--brand-sage) opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-(--brand-sage)"></span>
              </span>
              Tu reporte está listo
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
              Descubre exactamente dónde tu negocio está <span className="text-(--brand-sage)">perdiendo dinero.</span>
            </h1>
            
            <p className="text-lg text-white/70 leading-relaxed">
              Basado en tu evaluación, hemos compilado un reporte de diagnóstico de 10 páginas exclusivo para tu operación. Te mostramos los pasos exactos para eliminar cuellos de botella manuales e implementar Inteligencia Artificial hoy mismo.
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-bold border-b border-white/10 pb-2">¿Qué incluye este paquete?</h3>
              <ul className="space-y-3">
                {[
                  "Reporte de Diagnóstico Estratégico (10 Páginas en PDF)",
                  "Demo Web Interactiva de tu futuro Agente de IA",
                  "Plan de Implementación Paso a Paso",
                  "Bono: 90 días de acceso a nuestra comunidad privada"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80">
                    <CheckCircle2 className="w-6 h-6 text-(--brand-sage) shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonio */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
              <div className="flex text-yellow-400 mb-3">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="italic text-white/80 mb-4">"El reporte detalló exactamente lo que sospechaba: estábamos perdiendo el 30% de nuestros leads por tiempos de respuesta lentos. Implementar el plan nos ahorró decenas de horas semanales."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-(--brand-sage) to-(--brand-navy) p-[2px]">
                  <div className="w-full h-full rounded-full bg-black"></div>
                </div>
                <div>
                  <div className="font-bold text-sm">Carlos M.</div>
                  <div className="text-xs text-white/40">Director de Operaciones</div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Checkout Widget Mockup */}
          <div className="relative">
            {/* Glow background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-(--brand-sage) to-emerald-600 rounded-[32px] blur-xl opacity-20"></div>
            
            <div className="relative bg-[#172930] rounded-[24px] border border-white/10 p-8 shadow-2xl">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Desbloquear Reporte</h2>
                  <p className="text-white/50 text-sm mt-1">Acceso inmediato y de por vida</p>
                </div>
                <div className="text-right">
                  <div className="text-white/30 line-through text-sm">$297.00</div>
                  <div className="text-4xl font-black text-(--brand-sage)">$27</div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1 block">Email donde recibirás el reporte</label>
                  <input type="email" placeholder="tu@email.com" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-(--brand-sage) transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1 block">Tarjeta de Crédito</label>
                  <div className="w-full h-12 bg-black/40 border border-white/10 rounded-xl flex items-center px-4 text-white/30">
                    4242 4242 4242 4242
                  </div>
                </div>
              </div>

              <button className="w-full bg-(--brand-sage) hover:brightness-110 text-[#172930] font-black text-lg py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(202,223,158,0.3)] flex items-center justify-center gap-2 group">
                Obtener mi Reporte Ahora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-center text-xs text-white/40 mt-4 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Transacción encriptada de 256-bits
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
