import { NextResponse } from "next/server";

import { funcoesCalculadoras } from "@/lib/calculadoras/calc-functions";

// app/api/calculadoras/route.js
export async function POST(request, { params }) {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const { slug } = await params;
    const body = await request.json();

    const calcFunction = funcoesCalculadoras[slug];
    if (!calcFunction) {
      return NextResponse.json({ error: "Função de cálculo não implementada" }, { status: 500 });
    }

    const resultado = calcFunction(body);
    return NextResponse.json(resultado);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
