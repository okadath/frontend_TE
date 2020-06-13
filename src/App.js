// import React from 'react';
// import { PayPalButton } from "react-paypal-button-v2";

// export default class ExampleComponent extends React.Component  {
//   render() {
//     return (
//       <PayPalButton
//         amount="0.01"
//         // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
//         onSuccess={(details, data) => {
//           alert("Transaction completed by " + details.payer.name.given_name);

//           // OPTIONAL: Call your server to save the transaction
//           return fetch("/paypal-transaction-complete", {
//             method: "post",
//             body: JSON.stringify({
//               orderID: data.orderID
//             })
//           });
//         }}
//       />
//     );
//   }
// }

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import Navigation from './components/Navigation';
import Get_demo from './components/Get_demo';
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
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
}
 
export default App;