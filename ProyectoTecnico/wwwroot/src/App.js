import { useState, useEffect } from 'react';
import "./App.css";
import List from "./Components/ListArticulos";
import { NavLink , Routes, Route, useParams } from 'react-router-dom';
import { ReactModal, Modal } from 'react-modal';




function App() {
  const uri = 'https://localhost:7062/api/Articulos';
  
  const [inputText, setInputText] = useState("");
  
  let inputHandler = (e) => {
    if (e.key === 'Enter') {
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    }
  };
  let reset = () => {
    setInputText("");
  };

  

  

  function Home()  {
    return(
      <div className='home'>
        <h1>Lista de artículos</h1>
        <p><NavLink to='/add'>Añadir artículo</NavLink></p>
        <div className='search'>
          <input type='text' id='searchbar' onKeyDown={inputHandler} autoComplete='off'/>
          <input type='button' id='searchbutton' value="Limpiar" onClick={reset}/>
        </div>
        <List input={inputText} />
      </div>
    );
  }
    
  

  const PostArticulo = () => {
    const data = {
      id: parseInt(document.getElementById('id-add').value),
      nombre: document.getElementById('nombre-add').value.trim(),
      descripcion: document.getElementById('descripcion-add').value.trim(),
      precio: parseFloat(document.getElementById('precio-add').value),
      familia: document.getElementById('familia-add').value.trim()
    };
    
    fetch(uri, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(response => console.log('Success:', response))
    .catch(error => console.log('Error ', error));
  };


  function AddArticulo() {
    return(
    <div>
      <form onSubmit={PostArticulo}>
        <label>Id:          <input type='text' id='id-add' autoComplete='off'/></label><br />
        <label>Nombre:      <input type='text' id='nombre-add' autoComplete='off'/></label><br />
        <label>Descripcion: <input type='text' id='descripcion-add' autoComplete='off'/></label><br />
        <label>Precio:      <input type='text' id='precio-add' autoComplete='off'/></label><br />
        <label>Familia:     <input type='text' id='familia-add' autoComplete='off'/></label><br />
        <p> <input type='submit' value='Enviar' ></input></p>
      </form>
      <p><NavLink to='/'>Volver al listado</NavLink></p>
    </div>
    );
  }

  function ViewArticulo() {
    let id = useParams();
    const url = 'https://localhost:7062/api/Articulos/'.concat(id.id);
    const [modalIsOpen, setIsOpen] = useState(false);
    
    const [articulo, setArticulo] = useState([]);
    useEffect(() => {
        async function getArticulo() {
          const response = await fetch(url);
          let data = await response.json();
          setArticulo(data);
    
        }
        getArticulo()
    }, [])
    
    

    const borrarArticulo = () =>{
      fetch(url, {
        method: 'DELETE'
      }).then(res => res.json())
      .then(response => console.log('Success:', response))
      .catch(error => console.log('Error ', error));
      
    }

    
    return(
      <div>
        <h1>{articulo.nombre}</h1>
        <h2>Descripcion</h2>
        <p>{articulo.descripcion}</p>
        <h2>Precio</h2>
        <p>{articulo.precio}</p>
        <br/>
        <h3>Familia</h3>
        <p>{articulo.familia}</p>
        <h3>Codigo</h3>
        <p>{articulo.id}</p>
        <input type='button' value='Borrar' onClick={borrarArticulo}/><br/><br/>
        <NavLink to='/'>Volver</NavLink>
        
      </div>
    );
  }

  const Main = () => (
    <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/add' element={<AddArticulo/>}></Route>
      <Route exact path='/view/:id' element={<ViewArticulo/>}></Route>
    </Routes>
  );

  
 
  


  return (
    <div className='app'>
      <Main />
    </div>
    
  );
}

export default App