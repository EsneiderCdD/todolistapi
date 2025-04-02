import { useState } from "react";
import "../../assets/componentes/ListaTareas.css";

export default function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState("");

  const agregarTarea = () => {
    if (tarea.trim() !== "") {
      setTareas([...tareas, tarea]);
      setTarea("");
    }
  };

  const eliminarTarea = (indice) => {
    setTareas(tareas.filter((_, i) => i !== indice));
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
        {tareas.map((t, indice) => (
          <li key={indice} className="tarea">
            <span>{t}</span>
            <button className="eliminar" onClick={() => eliminarTarea(indice)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
