import React, { useState, useEffect } from 'react';
import { getUsers } from '../../Services/UserServices';

export const UserView = () => {
  const [users, setUsers] = useState([]);

  const listUsers = async () => {
    try {
      const { data } = await getUsers();
      console.log(data);
      setUsers(data); // ✅ Guarda los usuarios en el estado
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  useEffect(() => {
    listUsers();
  }, []);

  /*
  return (
    <div className='container-fluid'> 
     <div ClassName="row row-cols-1 row-cols-md-3 g-4">
      {
        users.map((user) => {
          return (
              <div ClassName="col">
              <div ClassName="card">
  {/}              <img src={user.photo} ClassName="card-img-top" alt="..."/>
                <div ClassName="card-body">
                  <h5 ClassName="card-title">{`Titulo: ${media.titulo}`}</h5>
                  <p ClassName="card-text">{`Serial: ${media.serial}`}</p>
                  <p ClassName="card-text">{`Sinopsis: ${media.sinopsis}`}</p>
                  <p ClassName="card-text">{`Año : ${media.yearpremier}`}</p>
                  <p ClassName="card-text">{`Genero: ${media.genero}`}</p>
                  <p ClassName="card-text">{`Director: ${media.director}`}</p>
                  <p ClassName="card-text">{`Productor: ${media.productor}`}</p>
                  <p ClassName="card-text">{`Tipo: ${media.tipo}`}</p>
                  <p ClassName="card-text">{`URL: ${media.url}`}</p>
                </div>
            </div>
            </div>
          )
        })
      }
      </div>
    </div>
  );
};*/}
