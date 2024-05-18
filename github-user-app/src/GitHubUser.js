import React, { useState } from 'react';

function GitHubUser() {
    //Declaracion de variables
    const [nombreUsuario, setUsername] = useState('');//usuarioGithub
    const [datosUsuario, setUserData] = useState(null);//datos del usuarioGithub
    const [repositorio, setRepos] = useState([]);//lista

    //Funcion para obtener datos del usuario
    const buscarDatosUsuario = async () => {
        try {
            const respuesta = await fetch(`https://api.github.com/users/${nombreUsuario}`);
            const info = await respuesta.json();
            setUserData(info);

            const respuestaRepositorio = await fetch(info.repos_url);
            const infoReposi = await respuestaRepositorio.json();
            setRepos(infoReposi);
        } catch (error) {
            console.error('No se pudieron obtener datos del usuario: ' + nombreUsuario, error);
        }
    };

    return (
        //Input y boton submit
        <div>
            <div className="contenedor">
                <input
                    type="text"
                    value={nombreUsuario}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ingrese el nombre de usuario"
                />
                <button type="submit" onClick={buscarDatosUsuario}>Obtener Datos</button>
            </div>
            {datosUsuario && (
        <div>
          <h2>{datosUsuario.name}</h2>
          <img className="imagenperfil" src={datosUsuario.avatar_url} alt="fotoPerfil" />
          <p>{datosUsuario.bio}</p>
          <p>Seguidores: {datosUsuario.followers}</p>
          <p>Repositorios publicos: {datosUsuario.public_repos}</p>
          <h3>Repositorios Recientes:</h3>
        </div>
      )}

        </div>
    );


}
export default GitHubUser;