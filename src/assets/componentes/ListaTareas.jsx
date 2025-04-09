// Importaciones necesarias
import { useState } from "react";
import "../../assets/componentes/ListaTareas.css";
import { useTareas } from "./TareasContext";
import BotonEliminarTodo from "./BotonEliminarloTodo";

export default function ListaTareas() {
  // Estados locales para controlar tareas
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoTexto, setNuevoTexto] = useState("");

  // Funciones globales desde el contexto
  const { registrarId, eliminarTodo } = useTareas();

  // Datos para conexión API
  const USERNAME = "Esneider";
  const API_URL = `https://playground.4geeks.com/todo/todos/${USERNAME}`;

  // Añadir nueva tarea
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
        registrarId(data.id); // Guardar ID en contexto
        setTarea(""); // Limpiar input
      })
      .catch((error) => console.error("Error al agregar tarea:", error));
  };

  // Eliminar tarea individual
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

  // Editar contenido de tarea
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

  // 🔄 Aquí empieza el return que debe estar dentro de la función
  return (
    <div className="contenedor">
      {/* Título principal */}
      <h2 className="titulo">Lista de Tareas</h2>

      {/* Entrada de nueva tarea */}
      <div className="entrada">
        <input
          value={tarea}
          onChange={(e) => setTarea(e.target.value)}
          placeholder="Añadir una nueva tarea"
        />
        <button onClick={agregarTarea}>Añadir</button>

        {/* Botón para eliminar todas las tareas */}
        <BotonEliminarTodo 
          onLimpiarFront={() => setTareas([])} 
          onEliminarTodo={async () => {
            const exito = await eliminarTodo();
            if (exito) setTareas([]); // Solo si el back confirmó
          }}
        />
      </div>

      {/* Lista de tareas */}
      <ul className="lista">
        {tareas.map((t) => (
          <li key={t.id} className="tarea">
            {/* Si está en modo edición */}
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
                {/* Mostrar texto de la tarea */}
                <span>{t.label}</span>

                {/* Botón para editar tarea */}
                <button
                  onClick={() => {
                    setEditandoId(t.id);
                    setNuevoTexto(t.label);
                  }}
                >
                  ✏️
                </button>

                {/* Botón para eliminar tarea */}
                <button onClick={() => eliminarTarea(t.id)}>❌</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
