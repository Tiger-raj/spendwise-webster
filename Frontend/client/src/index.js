//Importing necessary modules from  React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';


//Importing components and styles
import App from './App';
import { GlobalStyle } from './styles/GlobalStyle';
import { GlobalProvider } from './context/globalContext';



//Creating a root using ReactDOM.createRoot method and targeting the 'root' element in the HTML document
const root = ReactDOM.createRoot(document.getElementById('root'));


//Rendering the React elements inside the 'root' element
root.render( 

  //Wrapping the components with React.StrictMode for developmet checks and warnings
  <React.StrictMode>

    {/*Applying global styles*/}
    <GlobalStyle />

    {/*Wrapping the entire application with a GlobalProvider component */}
    <GlobalProvider>

      {/*Rendering the main App component */}
      <App />

    </GlobalProvider>
    
  </React.StrictMode>
);

