import React, { useState, useEffect } from 'react';
import { getDirector } from '../../Services/directorServices';
import { getGenero } from '../../Services/generoServices';
import { getProductora } from '../../Services/productoraServices';
import { getTipo } from '../../Services/tipoServices';
import { createMedia } from '../../Services/mediaServices';

export const MediaNew = ({ handleOpenModal, listMedia }) => {
    const [directores, setDirectores] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [valoresform, setValoresForm] = useState({
        serial: '',
        titulo: '',
        sinopsis: '',
        url: '',
        photo: '',
        yearpremier: '',
        genero: '',
        director: '',
        productora: '',
        tipo: ''
    });

    useEffect(() => {
        (async () => {
            try {
                const [{ data: directoresData }, { data: generosData }, { data: productorasData }, { data: tiposData }] = 
                    await Promise.all([getDirector(), getGenero(), getProductora(), getTipo()]);
                
                setDirectores(directoresData);
                setGeneros(generosData);
                setProductoras(productorasData);
                setTipos(tiposData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, []);

    const handleOnChange = ({ target: { name, value } }) => {
        setValoresForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        
        if (!valoresform.genero || !valoresform.director || !valoresform.productora || !valoresform.tipo) {
            alert("Todos los campos son obligatorios");
            return;
        }

        const inventory = {
            serial: valoresform.serial,
            titulo: valoresform.titulo,
            sinopsis: valoresform.sinopsis,
            url: valoresform.url,
            photo: valoresform.photo,
            yearpremier: valoresform.yearpremier,
            genero: { _id: valoresform.genero },
            director: { _id: valoresform.director },
            productora: { _id: valoresform.productora },
            tipo: { _id: valoresform.tipo }
        };

        console.log("Datos enviados:", JSON.stringify(inventory, null, 2));

        try {
            const response = await createMedia(inventory);
            console.log("Respuesta del servidor:", response.data);
            handleOpenModal();
            listMedia();
        } catch (error) {
            console.error("Error creando media:", error.response?.data || error.message);
        }
    };

    return (
        <div className='sidebar'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <div className='sidebar-header'>
                            <h3>Agregar Película/Serie</h3>
                            <i className='fa-solid fa-x' onClick={handleOpenModal}></i>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleOnSubmit}>
                    <div className='row'>
                        {['serial', 'titulo', 'sinopsis', 'url', 'photo', 'yearpremier'].map((field) => (
                            <div className='col' key={field}>
                                <div className='mb-3'>
                                    <label className='form-label'>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                    <input
                                        type={field === 'url' ? 'url' : field === 'yearpremier' ? 'date' : 'text'}
                                        name={field}
                                        value={valoresform[field]}
                                        onChange={handleOnChange}
                                        required
                                        className='form-control'
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='row'>
                        {[{ name: 'genero', options: generos }, { name: 'director', options: directores }, { name: 'productora', options: productoras }, { name: 'tipo', options: tipos }].map(({ name, options }) => (
                            <div className='col' key={name}>
                                <div className='mb-3'>
                                    <label className='form-label'>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
                                    <select className='form-select' required name={name} value={valoresform[name]} onChange={handleOnChange}>
                                        <option value=''>Seleccione</option>
                                        {(options || []).map(({ _id, name }) => (
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
    );
};
