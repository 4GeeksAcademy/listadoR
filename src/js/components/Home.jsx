import React, { useState } from "react";
import ButtonAddWrapper from "./ButtonAddWrapper";

const Home = () => {
  const [rows, setRows] = useState([
    { id: 1, visible: true, placeholder: "Hacer la comida", isEditing: true, text: "" },
    { id: 2, visible: true, placeholder: "Hacer la compra", isEditing: true, text: "" },
	  { id: 3, visible: true, placeholder: "Tener una colonia en RimWorld", isEditing: true, text: "" },
	  { id: 4, visible: true, placeholder: "Acabar este proyecto", isEditing: true, text: "" },
  ]);

  const handleKeyDown = (index, e) => {
    if (e.key === "Enter") {
      setRows((prev) =>
        prev.map((input, i) =>
          i === index ? { ...input, isEditing: false } : input
        )
      );
    }
  };

  const handleTextChange = (index, e) => {
    setRows((prev) =>
      prev.map((input, i) =>
        i === index ? { ...input, text: e.target.value } : input
      )
    );
  };


  //estado para el botón al pasar el cursor
  const [hoveredRowId, setHoveredRowId] = useState(null);
  
  const rowDelete = (id) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, visible: false } : row  //método spread para copiar y modificar un objeto.
    ));
  };

  //Crear un nuevo objeto. Date.now genera un identificador único
  const addRow = () => {
    const newRow = { id: Date.now(), visible: true, placeholder: "Nueva tarea", isEditing: true };
    setRows([...rows, newRow]);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="d-flex flex-wrap justify-content-center align-content-center col-6 m-4">
        <h1 className="text-center mt-5 col-12">Tareas pendientes</h1>
        <div className="w-100">
          {rows.some(row => row.visible) ? (      //método .some() para ver si se cumple al menos 1 vez la condición
            rows.map((row, index) =>
              row.visible && (
                <div key={row.id} className="text-center input-group my-2" 
                  onMouseEnter={() => setHoveredRowId(row.id)}
                  onMouseLeave={() => setHoveredRowId(null)}>
                    {row.isEditing ? (
                  <input type="text"
                    className="form-control"
                    placeholder={row.placeholder}
                    aria-label={row.placeholder}
                    aria-describedby="basic-addon2"
                    onChange={(e) => handleTextChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    autoFocus
                    />
                  ) : (
                    <p className="form-control">{row.text}</p>
                  )}
                  {hoveredRowId === row.id &&
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary btn-danger text-white" 
                        type="button" 
                        onClick={() => rowDelete(row.id)}>
                        x
                      </button>
                    </div>
                  }
                </div>
              )
            )
          ) : (
            <button onClick={addRow} 
                    className="btn btn-primary mt-2">No hay tareas, añadir tareas.</button>
          )}
          <ButtonAddWrapper addRow={addRow} rows={rows} />
        </div>
      </div>
    </div>
  );
}

export default Home;