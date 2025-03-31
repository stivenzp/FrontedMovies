import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaForId, UpdateMedia } from '../../Services/mediaServices';
import { getDirector } from '../../Services/directorServices';
import { getGenero } from '../../Services/generoServices';
import { getProductora } from '../../Services/productoraServices';
import { getTipo } from '../../Services/tipoServices';
import Swal from 'sweetalert2';

export const MediaUpdate = () => {
  const { mediaId } = useParams();
  const [media, setMedia] = useState(null);
  const [directores, setDirectores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [valoresform, setValoresForm] = useState({
    serial: '', titulo: '', sinopsis: '', url: '', photo: '', yearpremier: '',
    genero: '', director: '', productora: '', tipo: ''
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [directoresRes, generosRes, productorasRes, tiposRes] = await Promise.all([
          getDirector(), getGenero(), getProductora(), getTipo()
        ]);
        setDirectores(directoresRes.data);
        setGeneros(generosRes.data);
        setProductoras(productorasRes.data);
        setTipos(tiposRes.data);
      } catch (error) {
        console.error('Error cargando listas:', error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const getMedia = async () => {
      try {
        const { data } = await getMediaForId(mediaId);
        setMedia(data);
      } catch (error) {
        console.error('Error obteniendo media:', error);
      }
    };
    if (mediaId) getMedia();
  }, [mediaId]);


  useEffect(() => {
    if (media) {
      setValoresForm({
        serial: media.serial || '', titulo: media.titulo || '', sinopsis: media.sinopsis || '',
        url: media.url || '', photo: media.photo || '', yearpremier: media.yearpremier || '',
        genero: media.genero?._id || '', director: media.director?._id || '',
        productora: media.productora?._id || '', tipo: media.tipo?._id || ''
      });
    }
  }, [media]);


  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleOnSubmit = async (e) => {
    e.preventDefault();
    

    const updatedMedia = {
      serial: valoresform.serial, titulo: valoresform.titulo, sinopsis: valoresform.sinopsis,
      url: valoresform.url, photo: valoresform.photo, yearpremier: valoresform.yearpremier,
      genero: valoresform.genero, director: valoresform.director,
      productora: valoresform.productora, tipo: valoresform.tipo
    };

    try {
      Swal.fire({ allowOutsideClick: false, text: 'Cargando...', didOpen: () => Swal.showLoading() });

      await UpdateMedia(mediaId, updatedMedia);
      
      Swal.close();
      Swal.fire('Éxito', 'Media actualizada correctamente', 'success');
    } catch (error) {
      console.error('Error actualizando media:', error);
      Swal.close();
      Swal.fire('Error', 'Hubo un problema al actualizar', 'error');
    }
  };

  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title'>Detalle Producto</h5>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-md-4'>
              {valoresform.photo ? (
                <img src={valoresform.photo} alt='Media' className='img-fluid' />
              ) : (
                <p>📷 No hay imagen disponible</p>
              )}
            </div>
            <div className='col-md-8'>
              <form onSubmit={handleOnSubmit}>
                <div className='row'>
                  {['serial', 'titulo', 'sinopsis', 'url', 'photo', 'yearpremier'].map((field) => (
                    <div className='col' key={field}>
                      <div className='mb-3'>
                        <label className='form-label'>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <input
                          type={field === 'url' ? 'url' : field === 'yearpremier' ? 'date' : 'text'}
                          name={field} value={valoresform[field]} onChange={handleOnChange}
                          required className='form-control'
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className='row'>
                  {[{ name: 'genero', options: generos }, { name: 'director', options: directores },
                    { name: 'productora', options: productoras }, { name: 'tipo', options: tipos }].map(({ name, options }) => (
                    <div className='col' key={name}>
                      <div className='mb-3'>
                        <label className='form-label'>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
                        <select className='form-select' required name={name} value={valoresform[name]} onChange={handleOnChange}>
                          <option value=''>Seleccione</option>
                          {options.map(({ _id, name }) => (
                            <option key={_id} value={_id}>{name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='row'>
                  <div className='col'>
                    <button className='btn btn-primary'>Guardar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
