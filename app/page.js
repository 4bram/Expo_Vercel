"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [error, setError] = useState("");

  async function cargar() {
    const res = await fetch("/api/tareas");
    const data = await res.json();
    if (!res.ok) return setError(data.error || "Error al cargar las tareas");
    setError("");
    setTareas(data);
  }

  useEffect(() => {
    cargar();
  }, []);

  async function crear(e) {
    e.preventDefault();
    if (!titulo.trim()) return;
    const res = await fetch("/api/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo }),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error || "Error al crear la tarea");
    setTitulo("");
    cargar();
  }

  async function alternar(tarea) {
    await fetch(`/api/tareas/${tarea.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completada: !tarea.completada }),
    });
    cargar();
  }

  async function eliminar(id) {
    await fetch(`/api/tareas/${id}`, { method: "DELETE" });
    cargar();
  }

  return (
    <main className="min-h-screen bg-neutral-100 p-6 text-neutral-900">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-4 text-2xl font-bold">Mis tareas</h1>

        <form onSubmit={crear} className="mb-4 flex gap-2">
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Nueva tarea..."
            className="flex-1 rounded border border-neutral-300 bg-white px-3 py-2"
          />
          <button className="rounded bg-black px-4 py-2 text-white">Agregar</button>
        </form>

        {error && <p className="mb-3 text-red-600">{error}</p>}

        <ul className="space-y-2">
          {tareas.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between rounded bg-white px-3 py-2 shadow"
            >
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={t.completada}
                  onChange={() => alternar(t)}
                />
                <span className={t.completada ? "text-neutral-400 line-through" : ""}>
                  {t.titulo}
                </span>
              </label>
              <button onClick={() => eliminar(t.id)} className="text-red-600">
                Eliminar
              </button>
            </li>
          ))}
        </ul>

        {tareas.length === 0 && (
          <p className="text-neutral-500">No hay tareas todavía.</p>
        )}
      </div>
    </main>
  );
}