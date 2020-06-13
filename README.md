# Advertencia:
No entiendo como integrar los estilos de tu plantilla con un componente normal que yo haya hecho, asi que para las pruebas he creado componentes simples sin ningun estilo 

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


todos los siguientes codigos ejemplifican elementos, solo sustituyelos en el `app.js` 

ejemplos de como consumir con la API (no llevan token):


## GET

```jsx
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

```jsx
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

## URL notify:
En sandbox y desde frontends administrados desde backend es posible mandar facilmente las señales de IPN para la administracion de facturas desde nuestro back, estos generalmente se basan en la creacion de input hide para el paso de parametros.
para frontend es posible manejarlo desde la pagina de paypal, con la cuenta que recibira los pagos accedemos a https://www.paypal.com/cgi-bin/customerprofileweb?cmd=_profile-ipn-notify para indicar que cada que se realice una operacion envie la señal de IPN a la URL del servidor indicada aqui
en este caso sera www.miservidorenawsdeTeamEditionOnDemand.com/paypal
Casi no hay documentacion de IPN con react o JS, https://medium.com/@danielsternlicht/handling-paypal-ipn-messages-with-nodejs-5ccd97870c4

Usare este componente como boton de React:
https://github.com/Luehang/react-paypal-button-v2#large_blue_diamond-usage-example

## Componente paypal:


instalar:
```
yarn add react-paypal-button-v2
```
y sustituir:
```jsx
import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";

export default class ExampleComponent extends React.Component  {
  render() {
    return (
      <PayPalButton
        amount="0.01"//este valor debe venir d eun formaulario anterior
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);

          // OPTIONAL: Call your server to save the transaction
          return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({
              orderID: data.orderID
            })
          });
        }}
      />
    );
  }
}
```

en las funciones es donde se indica que comportamiento debe tener, si se usara routes o algo mas(ahi si estpy bien piedra, en los ejemplos en lugar de redirigir simplemente lanza un mensaje con JS)

el codigo posterior a los eventos se maneja en ` onSucess,onError,on Approve`
para que funcione en produccion al elemento del boton se le debe de agregar el ID del vendedor:

```
import { PayPalButton } from "react-paypal-button-v2";

export default class Example Component {
  render() {
    return (
      <PayPalButton 
        ...
        onSuccess={(details, data) => {
          ...
        }}
        options={{
          clientId: "PRODUCTION_CLIENT_ID"
        }}
      />
    );
  }
}
```
este lo obtienes creando una app para paypal con los pasos que estan en la siguiente URL y copiando el ID de la app creada, para que asi cargue los datos del vendedor en automatico al iniciar la venta

https://developer.paypal.com/docs/integration/admin/manage-apps/

a este componente se le debe de pasar la informacion de la compra desde otro formulario, el cual creara la orden por medio de la API y pasara esos parametros a este boton para efectuar la venta


instalar yarn en ubuntu 20
```sh
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn
```