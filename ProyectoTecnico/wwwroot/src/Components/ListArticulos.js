import { React, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function List(props, id = false){
    const uri = 'https://localhost:7062/api/Articulos';
    const [articulos, setArticulos] = useState([]);
    useEffect(() => {
        async function getArticulos() {
          const response = await fetch(uri);
          let data = await response.json();
          setArticulos(data);
    
        }
        getArticulos()
    }, [])

    const filteredData = articulos.filter((el) => {
        if (props.input === ''){
            return el;
        }
        else if (el.nombre.toLowerCase().includes(props.input) || el.descripcion.toLowerCase().includes(props.input)){
            return el.nombre.toLowerCase().includes(props.input);
        }
        else{
            return null;
        }
    })

    return (
        <ul>
            {filteredData.map((item) => (
                <li key={item.id}><NavLink to={'/view/'+item.id}>{item.nombre}</NavLink></li>
            ))}
        </ul>
    );
}

export default List