import React, { useState } from 'react';

function GitHubUser() {
  //Declaracion de variables
  const [nombreUsuario, setUsername] = useState('');//usuarioGithub
  const [datosUsuario, setUserData] = useState(null);//datos del usuarioGithub
  const [repositorio, setRepos] = useState([]);//lista

  const buscarDatosUsuario = async () => {
    try {
      const respuesta = await fetch(`url`);
      const info = await respuesta.json();
      setUserData(info);

      const respuestaRepositorio = await fetch(info.repos_url);
      const infoReposi = await respuestaRepositorio.json();
      setRepos(infoReposi);
    } catch (error) {
      console.error('No se pudieron obtener datos del usuario: ' + nombreUsuario , error);
    }
  };
}
  export default GitHubUser;