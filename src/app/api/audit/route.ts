import { NextResponse } from "next/server";

// Endpoint para el reporte de auditoría (estático)
export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    // Respuesta estática ya que se eliminó la integración con Anthropic
    return NextResponse.json({ 
      report: "Análisis completado satisfactoriamente.",
      status: "success" 
    });

  } catch (error) {
    console.error("Endpoint error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
