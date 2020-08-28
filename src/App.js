import React  from 'react'; 

export default class PersonList extends React.Component { 
  componentDidMount() { 
     fetch(`http://teamedition.onel.media:8000/v0/user/GET/user_code/code4/`,
    {

      method:'get',
      headers: new Headers({
        Accept:'application/json',
        'Content-Type':'application/json',
        Authorization:'Bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk4NjM2NTAzLCJqdGkiOiI4NjU0YmI5MGY3NDM0MjVkODE3Zjc4OGJjYWRjMmIwZSIsInVzZXJfaWQiOjUzfQ.A6LF8Zr_A1CTUuBA50x7VhZzcHM1JxjCmEz367IqF0Y',
      }),
    },
    ).then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
  }


  render() {
    return (
      <ul> 
      </ul>
    )
  }
}