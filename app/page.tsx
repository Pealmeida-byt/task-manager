"use client"

import { useState, useEffect } from "react"

type Tarefa = {
  id: number
  texto: string
  concluida: boolean
}

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [novaTarefa, setNovaTarefa] = useState("")
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    buscarTarefas()
  }, [])

  async function buscarTarefas() {
    const res = await fetch("/api/tarefas")
    const data = await res.json()
    setTarefas(data)
    setCarregando(false)
  }

  async function adicionarTarefa() {
    if (novaTarefa.trim() === "") return
    await fetch("/api/tarefas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto: novaTarefa }),
    })
    setNovaTarefa("")
    buscarTarefas()
  }

  async function alternarConcluida(id: number, concluida: boolean) {
    await fetch(`/api/tarefas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ concluida: !concluida }),
    })
    buscarTarefas()
  }

  async function deletarTarefa(id: number) {
    await fetch(`/api/tarefas/${id}`, { method: "DELETE" })
    buscarTarefas()
  }

  const concluidas = tarefas.filter((t) => t.concluida).length
  const progresso = tarefas.length > 0 ? (concluidas / tarefas.length) * 100 : 0

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center py-16 px-4 relative overflow-hidden">
      {/* Brilhos de fundo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-xl">
        {/* Cabeçalho */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Gerenciador de Tarefas
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent tracking-tight">
            Task Manager
          </h1>
          <p className="text-zinc-400 mt-3 text-lg">
            Organize seu dia com elegância
          </p>
        </div>

        {/* Card principal */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
          {/* Input */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={novaTarefa}
              onChange={(e) => setNovaTarefa(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && adicionarTarefa()}
              placeholder="O que precisa ser feito?"
              className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400/50 focus:bg-white/[0.07] transition-all"
            />
            <button
              onClick={adicionarTarefa}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500 font-semibold transition-all shadow-lg shadow-purple-500/25 active:scale-95"
            >
              Adicionar
            </button>
          </div>

          {/* Barra de progresso */}
          {tarefas.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-zinc-400 mb-2">
                <span>Progresso</span>
                <span className="text-purple-300 font-medium">
                  {concluidas}/{tarefas.length}
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-violet-400 rounded-full transition-all duration-500"
                  style={{ width: `${progresso}%` }}
                />
              </div>
            </div>
          )}

          {/* Lista */}
          <div className="space-y-2">
            {carregando ? (
              <p className="text-center text-zinc-500 py-8">Carregando...</p>
            ) : tarefas.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-zinc-500">Nenhuma tarefa ainda</p>
                <p className="text-zinc-600 text-sm mt-1">
                  Adicione sua primeira tarefa acima
                </p>
              </div>
            ) : (
              tarefas.map((tarefa) => (
                <div
                  key={tarefa.id}
                  className="group flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all"
                >
                  <button
                    onClick={() =>
                      alternarConcluida(tarefa.id, tarefa.concluida)
                    }
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      tarefa.concluida
                        ? "bg-purple-500 border-purple-500"
                        : "border-zinc-600 hover:border-purple-400"
                    }`}
                  >
                    {tarefa.concluida && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                  <span
                    className={`flex-1 transition-all ${
                      tarefa.concluida
                        ? "line-through text-zinc-600"
                        : "text-zinc-200"
                    }`}
                  >
                    {tarefa.texto}
                  </span>
                  <button
                    onClick={() => deletarTarefa(tarefa.id)}
                    className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400 transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <p className="text-center text-zinc-600 text-sm mt-6">
          Feito com Next.js, Prisma e PostgreSQL
        </p>
      </div>
    </main>
  )
}