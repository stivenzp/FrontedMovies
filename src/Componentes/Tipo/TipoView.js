import React, { useState, useEffect } from 'react';
import { createTipo, getTipo, UpdateTipo } from '../../Services/tipoServices';
import Swal from 'sweetalert2';
import './TipoView.css';
const moment = require('moment');

export const TipoView = () => {
  const [valuesForm, SetValuesForm] = useState({
    name: '',
    description: ''
  });
  const [tipo, setTipo] = useState([]);
  const { name, description } = valuesForm;
  const [tipoSelect, setTipoSelect] = useState(null);

  const listTipo = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();
      const resp = await getTipo();
      setTipo(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    listTipo();
  }, []);

  const handleOnChange = (e) => {
    SetValuesForm({
      ...valuesForm,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateTipo = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();

      if (tipoSelect) {
        await UpdateTipo(tipoSelect, valuesForm);
        setTipoSelect(null);
      } else {
        await createTipo(valuesForm);
      }

      SetValuesForm({ name: '', description: '' });
      listTipo();
      Swal.close();
    } catch (error) {
      console.log('error al guardar', error);
      Swal.close();
    }
  };

  const handleUpdateTipo = (e, tipo) => {
    e.preventDefault();
    SetValuesForm({
      name: tipo.name,
      description: tipo.description
    });
    setTipoSelect(tipo._id);
  };

  return (
    <div className='tipo-container'>
      <h2 className='form-title'>Gestión de Tipos</h2>
      <form onSubmit={handleCreateTipo} className='tipo-form'>
        <div className='row'>
          <div className='col-md-6'>
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
          <div className='col-md-6'>
            <div className='mb-3'>
              <label className='form-label'>Descripción</label>
              <input
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
            <th>Descripción</th>
            <th>Fecha Creación</th>
            <th>Fecha Actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipo.length > 0 &&
            tipo.map((tipo, index) => (
              <tr key={tipo._id || index}>
                <th scope='row'>{index + 1}</th>
                <td>{tipo.name}</td>
                <td>{tipo.description}</td>
                <td>{moment(tipo.createdAt).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(tipo.updatedAt).format('DD-MM-YYYY HH:mm')}</td>
                <td>
                  <button
                    className='btn btn-success btn-sm me-2'
                    onClick={(e) => handleUpdateTipo(e, tipo)}
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
