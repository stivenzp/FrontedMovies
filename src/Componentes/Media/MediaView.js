import React, { useState, useEffect } from 'react';
import { getMedia } from '../../Services/mediaServices';
import { MediaCards } from '../Media/MediaCards';
import { MediaNew } from './MediaNew';

export const MediaView = () => {
  const [medias, setMedia] = useState([]); 
  const [ openModal, setOpenModal] = useState();

  const listMedia = async () => { 
    try {
      const { data } = await getMedia();
      console.log(data);
      setMedia(data); 
    } catch (error) {
      console.error("Error al obtener los medios:", error);
    }
  };

  useEffect(() => {
    listMedia(); 
  }, []);

const handleOpenModal = () => {
  setOpenModal(!openModal)
}



  return (
    <div className="container"> 
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {
          medias.map((media) => (
            <MediaCards key={media._id} media={media} />
          ))
        }
      </div>
      {
        openModal ? <MediaNew handleOpenModal = { handleOpenModal }
        listMedia = {listMedia}/> :
        <button className ='btn btn-primary newInv' onClick={ handleOpenModal }>
          <i className="fa-solid fa-plus"></i>
          </button>
      }

    </div>
  );
};
