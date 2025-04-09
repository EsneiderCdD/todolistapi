export default function BotonEliminarTodo({ onEliminarTodo }) {
    // Maneja el clic del botón y ejecuta la función pasada desde ListaTareas
    const handleEliminarTodo = () => {
      onEliminarTodo();
    };
  
    return (
      <button onClick={handleEliminarTodo} style={{ marginTop: "10px" }}>
        🗑️ Borrar todas las tareas
      </button>
    );
  }
  