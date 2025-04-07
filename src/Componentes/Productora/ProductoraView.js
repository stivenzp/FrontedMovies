import React, { useState, useEffect } from 'react';
import { createProductora, getProductora, UpdateProductora } from '../../Services/productoraServices';
import Swal from 'sweetalert2';
import './ProductoraView.css';
const moment = require('moment');

export const ProductoraView = () => {
  const [valuesForm, SetValuesForm] = useState({
    name: '',
    state: '',
    slogan: '',
    description: ''
  });
  const [productora, setProductora] = useState([]);
  const { name, state, slogan, description } = valuesForm;
  const [productoraSelect, setProductoraSelect] = useState(null);

  const listProductora = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();
      const resp = await getProductora();
      setProductora(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    listProductora();
  }, []);

  const handleOnChange = (e) => {
    SetValuesForm({
      ...valuesForm,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateProductora = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();

      if (productoraSelect) {
        await UpdateProductora(productoraSelect, valuesForm);
        setProductoraSelect(null);
      } else {
        await createProductora(valuesForm);
      }

      SetValuesForm({ name: '', state: '', slogan: '', description: '' });
      listProductora();
      Swal.close();
    } catch (error) {
      console.log('error al guardar', error);
      Swal.close();
    }
  };

  const handleUpdateProductora = (e, productora) => {
    e.preventDefault();
    SetValuesForm({
      name: productora.name,
      state: productora.state,
      slogan: productora.slogan || '',
      description: productora.description || ''
    });
    setProductoraSelect(productora._id);
  };

  return (
    <div className='productora-container'>
      <h2 className='form-title'>Gestión de Productoras</h2>
      <form onSubmit={handleCreateProductora} className='productora-form'>
        <div className='row'>
          <div className='col-md-3'>
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
          <div className='col-md-3'>
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
          <div className='col-md-3'>
            <div className='mb-3'>
              <label className='form-label'>Slogan</label>
              <input
                required
                name='slogan'
                value={slogan}
                type='text'
                className='form-control'
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className='col-md-3'>
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
            <th>Slogan</th>
            <th>Descripción</th>
            <th>Fecha Creación</th>
            <th>Fecha Actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productora.length > 0 &&
            productora.map((productora, index) => (
              <tr key={productora._id || index}>
                <th scope='row'>{index + 1}</th>
                <td>{productora.name}</td>
                <td>{productora.state}</td>
                <td>{productora.slogan}</td>
                <td>{productora.description}</td>
                <td>{moment(productora.createdAt).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(productora.updatedAt).format('DD-MM-YYYY HH:mm')}</td>
                <td>
                  <button
                    className='btn btn-success btn-sm me-2'
                    onClick={(e) => handleUpdateProductora(e, productora)}
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
