import React, { useState, useEffect } from 'react';
import {
  createDirector,
  getDirector,
  UpdateDirector,
} from '../../Services/directorServices';
import Swal from 'sweetalert2';
import './DirectorView.css'; 
const moment = require('moment');

export const DirectorView = () => {
  const [valuesForm, SetValuesForm] = useState({
    name: '',
    state: '',
  });
  const [director, setDirector] = useState([]);
  const { name, state } = valuesForm;
  const [directorSelect, setDirectorSelect] = useState(null);

  const listDirector = async () => {
    try {
      Swal.fire({ allowOutsideClick: false, text: 'Cargando...' });
      Swal.showLoading();
      const resp = await getDirector();
      setDirector(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    listDirector();
  }, []);

  const handleOnChange = (e) => {
    SetValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
  };

  const handleCreateDirector = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({ allowOutsideClick: false, text: 'Cargando...' });
      Swal.showLoading();

      if (directorSelect) {
        await UpdateDirector(directorSelect, valuesForm);
        setDirectorSelect(null);
      } else {
        await createDirector(valuesForm);
      }

      SetValuesForm({ name: '', state: '' });
      listDirector();
      Swal.close();
    } catch (error) {
      console.log('error al guardar', error);
      Swal.close();
    }
  };

  const handleUpdateDirector = (e, director) => {
    e.preventDefault();
    SetValuesForm({ name: director.name, state: director.state });
    setDirectorSelect(director._id);
  };

  return (
    <div className="container mt-4">
      <h2 className="form-title mb-4 text-center">
        <i className="fa-solid fa-user-tie me-2"></i>Gestión de Directores
      </h2>

      <div className="form-card p-4 rounded-4 shadow mb-4">
        <form onSubmit={handleCreateDirector}>
          <div className="row">
            <div className="col-lg-8 mb-3">
              <label className="form-label text-white">Nombre</label>
              <input
                required
                name="name"
                value={name}
                type="text"
                className="form-control"
                onChange={handleOnChange}
              />
            </div>
            <div className="col-lg-4 mb-3">
              <label className="form-label text-white">Estado</label>
              <select
                required
                name="state"
                value={state}
                className="form-select"
                onChange={handleOnChange}
              >
                <option value="">Seleccione</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          <button className="btn save-btn">Guardar</button>
        </form>
      </div>

      <table className="table table-dark table-hover table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Fecha Creación</th>
            <th>Fecha Actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {director.length > 0 &&
            director.map((director, index) => (
              <tr key={director._id || index}>
                <th scope="row">{index + 1}</th>
                <td>{director.name}</td>
                <td>{director.state}</td>
                <td>{moment(director.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(director.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={(e) => handleUpdateDirector(e, director)}
                  >
                    Actualizar
                  </button>
                  <button className="btn btn-danger btn-sm">Eliminar</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
