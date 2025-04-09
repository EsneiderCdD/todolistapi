import { createContext, useContext, useState } from "react";

// Crear contexto
const TareasContext = createContext();

// Hook para consumir el contexto
export const useTareas = () => useContext(TareasContext);

// Proveedor del contexto
export const TareasProvider = ({ children }) => {
  const [ids, setIds] = useState([]);

  // Agregar nuevo ID de tarea al contexto
  const registrarId = (id) => {
    setIds((prev) => [...prev, id]);
  };

  // Limpiar todos los IDs del contexto
  const limpiarIds = () => setIds([]);

  // Eliminar todas las tareas registradas (en el backend)
  const eliminarTodo = async () => {
    try {
      const resultados = await Promise.all(
        ids.map((id) =>
          fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE",
          })
        )
      );

      const todosOk = resultados.every((res) => res.ok);

      if (todosOk) {
        setIds([]); // Limpiar contexto si todo salió bien
        return true;
      } else {
        console.error("Error: algunas tareas no se eliminaron");
        return false;
      }
    } catch (error) {
      console.error("Error eliminando en lote:", error);
      return false;
    }
  };

  return (
    <TareasContext.Provider
      value={{ ids, registrarId, limpiarIds, eliminarTodo }}
    >
      {children}
    </TareasContext.Provider>
  );
};
