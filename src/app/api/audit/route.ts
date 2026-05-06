import { NextResponse } from "next/server";

// Este es el endpoint para conectar con Claude de Anthropic
export async function POST(req: Request) {
  try {
    const { name, email, revenue, bottleneck, manualHours } = await req.json();

    // Validar payload
    if (!name || !email) {
      return NextResponse.json({ error: "Faltan datos de usuario" }, { status: 400 });
    }

    // Usaremos la API REST de Anthropic directamente
    const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "TU_API_KEY_AQUI";

    const prompt = `
      Eres un Consultor Estratégico Senior de Adeptos. 
      Actúa como experto en optimización de procesos y automatización para negocios.
      
      Datos del cliente:
      - Nombre: ${name}
      - Ingresos: ${revenue}
      - Cuello de botella principal: ${bottleneck}
      - Horas manuales semanales: ${manualHours}
      
      Escribe un mini-reporte de diagnóstico (máximo 150 palabras) muy persuasivo y directo al grano.
      Debe tener este formato:
      1. Un saludo personalizado a ${name}.
      2. Una observación dura pero profesional sobre la cantidad de dinero que están perdiendo por culpa de [${bottleneck}] y sus [${manualHours}] horas manuales.
      3. Un plan de 3 pasos accionables de IA/Automatización para arreglar esto.
      4. Al final, invítalo a obtener el reporte completo y la demo por $27.
    `;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-opus-20240229", // o claude-3-haiku-20240307 para velocidad
        max_tokens: 500,
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Anthropic error:", errorData);
      return NextResponse.json({ error: "Error al generar reporte de IA" }, { status: 500 });
    }

    const data = await response.json();
    const botReply = data.content[0].text;

    return NextResponse.json({ report: botReply });

  } catch (error) {
    console.error("Endpoint error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
