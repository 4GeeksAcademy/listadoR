import React from "react";

const ButtonAdd = ({ addRow }) => {
    return (
      <button onClick={addRow} className="btn btn-primary mt-2">
        Agregar tarea
      </button>
    );
  };
  

export default ButtonAdd;