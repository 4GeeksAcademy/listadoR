import React, { useState } from "react";
import ButtonAdd from "./ButtonAdd";

const Home = () => {
  const [rows, setRows] = useState([
    { id: 1, visible: true, placeholder: "Hacer la comida" },
    { id: 2, visible: true, placeholder: "Hacer la compra" },
	  { id: 3, visible: true, placeholder: "Tener una colonia en RimWorld" },
	  { id: 4, visible: true, placeholder: "Acabar este proyecto" },
  ]);
  //estado para el botón al pasar el cursor
  const [hoveredRowId, setHoveredRowId] = useState(null);
  
  const rowDelete = (id) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, visible: false } : row  //método spread para copiar y modificar un objeto.
    ));
  };

  //Creo un nuevo objeto con tres propiedades. Date.now genera un identificador único
  const addRow = () => {
    const newRow = { id: Date.now(), visible: true, placeholder: "Nueva tarea" };
    setRows([...rows, newRow]);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
    <div className="d-flex flex-wrap justify-content-center align-content-center col-6 m-4">
      <h1 className="text-center mt-5 col-12">Tareas pendientes</h1>
      <div className="col-12">
      {rows.map((row) => 
        row.visible && (
          <div key={row.id} className="text-center input-group my-2" 
            onMouseEnter={() => setHoveredRowId(row.id)}
            onMouseLeave={() => setHoveredRowId(null)}>
            <input
              type="text"
              className="form-control"
              placeholder={row.placeholder}
              aria-label={row.placeholder}
              aria-describedby="basic-addon2"
            />
            {hoveredRowId === row.id &&
            <div className="input-group-append">
              <button 
                className="btn btn-outline-secondary text-danger" 
                type="button" 
                onClick={() => rowDelete(row.id)}
                onMouseEnter
              >
                x
              </button>
            </div>
              }
          </div>
        )
      )}
	    <ButtonAdd addRow={addRow} />
      </div>
    </div>
    </div>
  );
};

export default Home;