import React from 'react';
import { Link } from 'react-router-dom';
import './MediaCards.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const MediaCards = ({ media }) => {
  return (
    <div className="media-card-wrapper">
      <div className="media-card">
        <div className="media-card__image-wrapper">
          <img src={media.photo} alt={media.titulo} className="media-card__image" />
        </div>
        <div className="media-card__content">
          <h3 className="media-card__title">{media.titulo}</h3>
          <p><strong>Serial:</strong> {media.serial}</p>
          <p><strong>Sinopsis:</strong> {media.sinopsis}</p>
          <p><strong>Año:</strong> {new Date(media.yearpremier).getFullYear()}</p>
          <p><strong>Género:</strong> {media.genero?.name || 'No especificado'}</p>
          <p><strong>Director:</strong> {media.director?.name || 'No especificado'}</p>
          <p><strong>Productora:</strong> {media.productora?.name || 'No especificado'}</p>
          <p><strong>Tipo:</strong> {media.tipo?.name || 'No especificado'}</p>

          <div className="media-card__buttons">
            <a
              href={media.url}
              target="_blank"
              rel="noopener noreferrer"
              className="media-card__btn"
            >
              Ir a la Película <i className="fas fa-film" style={{ marginLeft: '8px' }}></i>
            </a>
            <Link to={`media/edit/${media._id}`} className="media-card__btn">
              Ver Más <i className="fas fa-right-to-bracket" style={{ marginLeft: '8px' }}></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
