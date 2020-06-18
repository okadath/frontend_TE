# Advertencia:
No entiendo como integrar los estilos de tu plantilla con un componente normal que yo haya hecho, asi que para las pruebas he creado componentes simples sin ningun estilo 
# Native y web

el web se corre de modo distinto que el native a pesar de que ambos ejecutan el mismo codigo, hay que seguir los pasos de la pagina nativebase

### para app
es mejor crear una carpeta e instalar ahi expo y luego crear un proyecto adentro, asi se mantiene limpia la version principal de la computadora, podrian hacer problemas de dependencias asi que mejor mantener la carpeta interna
hay que instalar android studio y ubicarlo en al carpeta del suario en ubuntu, instalar el ndk, el sdk y la libreria del modelo de celular a testear por medio del settings de android studio
despues de eso permitira compilar la app y usar expo

basta con instalar los sig paquetes(quiza distinta version) con yarn:
```sh
    "expo": "~37.0.3",
    "expo-font": "^8.1.1",
    "native-base": "^2.13.12",
    "react": "^16.13.1",
    "react-dom": "~16.9.0",
    "react-native": "https://github.com/expo/react-native/archive/sdk-37.0.1.tar.gz",
    "react-native-web": "~0.11.7",
    "react-router": "^5.2.0",
    "react-router-dom": "^5.2.0"
```

y ejecutar el proyecto, ubicarse dentro de la carpeta /native/frontend_TE/ y ejecutar `yarn  expo start`

### para web

hay que instalar las dependencias y la configuracion de la apgina de native base

despues simplemente ejecutar con `yarn start`

no lo usaremos desde el mismo proyecto por que en web requiere reenlazar las librerias de react y eso produce problemas apra ejecutarlo en app apra celulares, entonces mejor mantener dos proyectos con el mismo codigo :v



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

```sh
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

Native Base:

libreria de componentes para react web, y react native

seguir la instalacion de :
https://docs.nativebase.io/docs/GetStarted.html

```sh
yarn add native-base expo
# y linkear
yarn react-native link
# podrian faltar las fuentes 
```

para instalar en web

```sh
npm install -g create-react-app
npx create-react-app nativebase-app
cd nativebase-app

npm i native-base react-art react-native-web --save
npm i react-app-rewired customize-cra @babel/plugin-proposal-class-properties --dev --save

```
o hacerlo con yarn
```sh
yarn native-base react-art react-native-web react-app-rewired customize-cra @babel/plugin-proposal-class-properties 

```
reescribir el `package.json`
```js
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
}
```
crear en la carpeta principal un archivo `config-overrides.js`:

```js
const path = require('path');
const {
  override,
  addWebpackAlias,
  babelInclude,
  addBabelPlugins
} = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    "react-native/Libraries/Renderer/shims/ReactNativePropRegistry": "react-native-web/dist/modules/ReactNativePropRegistry",
    "react-native": "react-native-web"
  }),
  babelInclude([
    path.resolve('src'),
    path.resolve('node_modules/native-base-shoutem-theme'),
    path.resolve('node_modules/react-navigation'),
    path.resolve('node_modules/react-native-easy-grid'),
    path.resolve('node_modules/react-native-drawer'),
    path.resolve('node_modules/react-native-safe-area-view'),
    path.resolve('node_modules/react-native-vector-icons'),
    path.resolve('node_modules/react-native-keyboard-aware-scroll-view'),
    path.resolve('node_modules/react-native-web'),
    path.resolve('node_modules/react-native-tab-view'),
    path.resolve('node_modules/static-container'),
  ]),
  addBabelPlugins(
    "@babel/plugin-proposal-class-properties"
  ),
);

```
agregar al `App.css`:
```css

@font-face {
  font-family: "Entypo";
  src: url("~react-native-vector-icons/Fonts/Entypo.ttf") format("truetype");
}

@font-face {
  font-family: "EvilIcons";
  src: url("~react-native-vector-icons/Fonts/EvilIcons.ttf") format("truetype");
}

@font-face {
  font-family: "FontAwesome";
  src: url("~react-native-vector-icons/Fonts/FontAwesome.ttf")
    format("truetype");
}

@font-face {
  font-family: "fontcustom";
  src: url("~react-native-vector-icons/Fonts/Foundation.ttf") format("truetype");
}

@font-face {
  font-family: "Ionicons";
  src: url("~react-native-vector-icons/Fonts/Ionicons.ttf") format("truetype");
}

@font-face {
  /*font-family: 'MaterialCommunityIcons';*/
  font-family: "Material Design Icons";
  src: url("~react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf")
    format("truetype");
}

@font-face {
  font-family: "MaterialIcons";
  src: url("~react-native-vector-icons/Fonts/MaterialIcons.ttf")
    format("truetype");
}

@font-face {
  font-family: "Octicons";
  src: url("~react-native-vector-icons/Fonts/Octicons.ttf") format("truetype");
}

@font-face {
  font-family: "simple-line-icons";
  src: url("~react-native-vector-icons/Fonts/SimpleLineIcons.ttf")
    format("truetype");
}

@font-face {
  font-family: "Zocial";
  src: url("~react-native-vector-icons/Fonts/Zocial.ttf") format("truetype");
}
```
para agregar fuentes personalizadas hay que agregar al app.js:

```js
import * as Font from 'expo-font';
...
class App extends Component {
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      // ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }
  ...
}
```


hay que linkear las dependencias
```sh
yarn react-native link
```

iconos:
hay un error ya que al instalar el paquete de native abse una dependencia es `react-native-vector-icons` entonces si lo instalas explicitamente hay errores, no hay que instalarlo y para importar los iconos hay que agregarlo al `App.js`:
```js
async componentDidMount() {
    await Font.loadAsync({
      ...
      Ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }
```



Menu swith links:
```jsx
  render() {
    return (  
                  <BrowserRouter>
        <div className="App">
                   <Header />
          <Navigation />
            <Switch>

             <Route path="/" component={Home} exact/>
             <Route path="/about" component={About}/>
             <Route path="/contact" component={Contact}/>
             <Route path="/get_videos" component={Get_demo}/>
            <Route component={Error}/>
           </Switch>

        </div> 
      </BrowserRouter>
       );
  }
```
