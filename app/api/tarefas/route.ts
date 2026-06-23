import { prisma } from "../../../lib/prisma"
import { NextResponse } from "next/server"

// Buscar todas as tarefas
export async function GET() {
  const tarefas = await prisma.tarefa.findMany({
    orderBy: { criadaEm: "desc" },
  })
  return NextResponse.json(tarefas)
}

// Criar uma tarefa nova
export async function POST(request: Request) {
  const { texto } = await request.json()
  const novaTarefa = await prisma.tarefa.create({
    data: { texto },
  })
  return NextResponse.json(novaTarefa)
}