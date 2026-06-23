import { prisma } from "../../../../lib/prisma"
import { NextResponse } from "next/server"

// Atualizar tarefa (marcar como concluída)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { concluida } = await request.json()
  const tarefa = await prisma.tarefa.update({
    where: { id: Number(id) },
    data: { concluida },
  })
  return NextResponse.json(tarefa)
}

// Deletar tarefa
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await prisma.tarefa.delete({
    where: { id: Number(id) },
  })
  return NextResponse.json({ ok: true })
}