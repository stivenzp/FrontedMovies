import React from 'react';
import { Link } from 'react-router-dom';



export const MediaCards = ({ media }) => {  
  return (
    <div className="col">
      <div className="card">
        <img src={media.photo} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{`Título: ${media.titulo}`}</h5>
          <p className="card-text">{`Serial: ${media.serial}`}</p>
          <p className="card-text">{`Sinopsis: ${media.sinopsis}`}</p>
          <p className="card-text">{`Año: ${new Date(media.yearpremier).getFullYear()}`}</p>
          <p className="card-text">{`Género: ${media.genero?.name || 'No especificado'}`}</p>
          <p className="card-text">{`Director: ${media.director?.name || 'No especificado'}`}</p>
          <p className="card-text">{`Productora: ${media.productora?.name || 'No especificado'}`}</p>
          <p className="card-text">{`Tipo: ${media.tipo?.name || 'No especificado'}`}</p>
          <p className="card-text">{`URL: ${media.url}`}</p>
          <p className="card-text"><Link to = {`media/edit/${media._id}`}>Ver Más</Link></p>
        </div>
      </div>
    </div>  
  );
};

