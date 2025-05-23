import React, { useState, useEffect } from 'react';
import { createGenero, getGenero, UpdateGenero } from '../../Services/generoServices';
import Swal from 'sweetalert2';
import './GeneroView.css'; 
const moment = require('moment');

export const GeneroView = () => {
  const [valuesForm, SetValuesForm] = useState({
    name: '',
    state: '',
    description: ''
  });
  const [genero, setGenero] = useState([]);
  const { name, state, description } = valuesForm;
  const [generoSelect, setGeneroSelect] = useState(null);

  const listGenero = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();
      const resp = await getGenero();
      setGenero(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    listGenero();
  }, []);

  const handleOnChange = (e) => {
    SetValuesForm({
      ...valuesForm,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateGenero = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();

      if (generoSelect) {
        await UpdateGenero(generoSelect, valuesForm);
        setGeneroSelect(null);
      } else {
        await createGenero(valuesForm);
      }

      SetValuesForm({ name: '', state: '', description: '' });
      listGenero();
      Swal.close();
    } catch (error) {
      console.log('error al guardar', error);
      Swal.close();
    }
  };

  const handleUpdateGenero = (e, genero) => {
    e.preventDefault();
    SetValuesForm({
      name: genero.name,
      state: genero.state,
      description: genero.description || ''
    });
    setGeneroSelect(genero._id);
  };

  return (
    <div className='genero-container'>
      <h2 className='form-title'>Gestión de Géneros</h2>
      <form onSubmit={handleCreateGenero} className='genero-form'>
        <div className='row'>
          <div className='col-md-4'>
            <div className='mb-3'>
              <label className='form-label'>Nombre</label>
              <input
                required
                name='name'
                value={name}
                type='text'
                className='form-control'
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='mb-3'>
              <label className='form-label'>Estado</label>
              <select
                required
                name='state'
                value={state}
                className='form-select'
                onChange={handleOnChange}
              >
                <option value=''>Seleccione</option>
                <option value='Activo'>Activo</option>
                <option value='Inactivo'>Inactivo</option>
              </select>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='mb-3'>
              <label className='form-label'>Descripción</label>
              <input
                required
                name='description'
                value={description}
                type='text'
                className='form-control'
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>
        <button className='btn-custom' type='submit'>Guardar</button>
      </form>

      <table className='table table-dark table-hover table-bordered mt-4'>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Descripción</th>
            <th>Fecha Creación</th>
            <th>Fecha Actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {genero.length > 0 &&
            genero.map((genero, index) => (
              <tr key={genero._id || index}>
                <th scope='row'>{index + 1}</th>
                <td>{genero.name}</td>
                <td>{genero.state}</td>
                <td>{genero.description}</td>
                <td>{moment(genero.createdAt).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(genero.updatedAt).format('DD-MM-YYYY HH:mm')}</td>
                <td>
                  <button
                    className='btn btn-success btn-sm me-2'
                    onClick={(e) => handleUpdateGenero(e, genero)}
                  >
                    Actualizar
                  </button>
                  <button className='btn btn-danger btn-sm'>Eliminar</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
