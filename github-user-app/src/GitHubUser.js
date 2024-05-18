import React, { useState } from 'react';

function GitHubUser() {
    //Declaracion de variables
    const [nombreUsuario, setUsername] = useState('');//usuarioGithub
    const [datosUsuario, setUserData] = useState(null);//datos del usuarioGithub
    const [repositoriosRecientes, setRepos] = useState([]);//lista

    //Funcion para obtener datos del usuario
    const buscarDatosUsuario = async () => {
        try {
            const respuesta = await fetch(`https://api.github.com/users/${nombreUsuario}`);
            const info = await respuesta.json();
            setUserData(info);

            const respuestaRepositorio = await fetch(info.repos_url);
            let infoReposi = await respuestaRepositorio.json();
            infoReposi = infoReposi.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
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
          <h2><strong id='textoInicial'>Repositorio de: </strong>{datosUsuario.name}</h2>
          <img className="imagenperfil" src={datosUsuario.avatar_url} alt="fotoPerfil" />
          <p>{datosUsuario.bio}</p>
          <p><strong id='textoInicial'>Seguidores: </strong>{datosUsuario.followers}</p>
          <p><strong id='textoInicial'>Repositorios publicos:</strong> {datosUsuario.public_repos}</p>
          <h3>Repositorios Recientes:</h3>
          <ul className='listaRepositorio'>
            {repositoriosRecientes.slice(0,5).map((repositorio) => (
              <li key={repositorio.id}>
                <strong id='textoInicial'>{repositorio.name}</strong>: {repositorio.description}
              </li>
            ))}
          </ul>
        </div>
      )}

        </div>
    );


}
export default GitHubUser;