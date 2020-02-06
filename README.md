# Frontend para testing 
Necesito ir probando como manejar la API para que sea sencilla de manejar
en django REST Framework se usan muchas URLs con el pk interno de la bd, eso es eficiente pero dificil de manejar por los usuarios, entonces es necesario crear algo similar a los slugs para acceder a estos o en su defecto metodos de busqueda a partir de los pk
para ello es necesario manejarlo desde front end, por eso cree esta carpeta, para iniciar a consumir el REST desde React con Axios o con fetch

## Setup del ambiente
```bash
yarn add create-react-app
yarn create-react-app frontend
cd frontend/
yarn start
yarn add axios
```
si hay errores instalando, crear el watchdog de node:
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

https://blog.usejournal.com/serving-react-and-django-together-2089645046e4

ejemplos de como consumir con la API (no llevan token):


## GET

```
import React  from 'react';

import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    persons: []
  }
  componentDidMount() {
    // axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
    axios.get(`http://127.0.0.1:8000/v0/media/GET/video/`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons })
         }).catch(err=>{
      console.log(err);
      })
  }

  render() {
    return (
      <ul>
        { this.state.persons.map(
          person => 
          <li>{person.title}</li> 
          )
        }
      </ul>
    )
  }
}
```

## POST

```
import React from 'react';
import axios from 'axios';
 
export default class ListaPersonas extends React.Component {
  state = {
    name: '',
  }
 
  handleChange = event => {
    this.setState({
      // name: event.target.value,
      code: event.target.value, 
   });
  }
 
  handleSubmit = event => {
    event.preventDefault();
 
    const cod = {
      // name: this.state.name,
      code:  this.state.code,
      validity_begins: "2019-12-26" ,
      validity_expires:"2019-12-26", 
      license: 1 
    };
 
    axios.post(`http://127.0.0.1:8000/v0/user/POST/code/`,  cod )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
 
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Codigo:
            <input type="text" name="code" onChange={this.handleChange} />
          </label>
          <br/>
          <button type="submit">Agregar Codigo</button>
        </form>
      </div>
    )
  }
}
```