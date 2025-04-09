import { useState } from "react";
import "../../assets/componentes/ListaTareas.css";

export default function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoTexto, setNuevoTexto] = useState("");

  const USERNAME = "Esneider";
  const API_URL = `https://playground.4geeks.com/todo/todos/${USERNAME}`;

  const agregarTarea = () => {
    if (tarea.trim() === "") return;

    const nuevaTarea = {
      label: tarea,
      is_done: false,
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaTarea),
    })
      .then((res) => res.json())
      .then((data) => {
        setTareas((prev) => [...prev, data]);
        setTarea("");
      })
      .catch((error) => console.error("Error al agregar tarea:", error));
  };

  const eliminarTarea = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setTareas((prev) => prev.filter((t) => t.id !== id));
        }
      })
      .catch((error) => console.error("Error al eliminar tarea:", error));
  };

  const actualizarTarea = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ label: nuevoTexto }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTareas((prev) =>
          prev.map((t) => (t.id === id ? { ...t, label: data.label } : t))
        );
        setEditandoId(null);
        setNuevoTexto("");
      })
      .catch((error) => console.error("Error al actualizar tarea:", error));
  };

  const toggleCompletada = (id, estadoActual) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_done: !estadoActual }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTareas((prev) =>
          prev.map((t) => (t.id === id ? { ...t, is_done: data.is_done } : t))
        );
      })
      .catch((error) => console.error("Error al actualizar tarea:", error));
  };

  return (
    <div className="contenedor">
      <h2 className="titulo">Lista de Tareas</h2>
      <div className="entrada">
        <input
          value={tarea}
          onChange={(e) => setTarea(e.target.value)}
          placeholder="Añadir una nueva tarea"
        />
        <button onClick={agregarTarea}>Añadir</button>
           
      </div>
      <ul className="lista">
        {tareas.map((t) => (
          <li key={t.id} className="tarea">
            {editandoId === t.id ? (
              <>
                <input
                  value={nuevoTexto}
                  onChange={(e) => setNuevoTexto(e.target.value)}
                />
                <button onClick={() => actualizarTarea(t.id)}>Guardar</button>
                <button onClick={() => setEditandoId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleCompletada(t.id, t.is_done)}
                  style={{
                    textDecoration: t.is_done ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                >
                  {t.label}
                </span>
                <button onClick={() => {
                  setEditandoId(t.id);
                  setNuevoTexto(t.label);
                }}>✏️</button>
                <button onClick={() => eliminarTarea(t.id)}>❌</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
