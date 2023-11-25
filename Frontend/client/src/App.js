// Importing necessary modules from React and other components
import React, {useState, useMemo} from 'react'
import styled from "styled-components";
import bg from './img/bg.png'
import {MainLayout} from './styles/Layouts'
import Orb from './Components/Orb/Orb'
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from './Components/Dashboard/Dashboard';
import Incomes from './Components/Incomes/Incomes';
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import History from './History/History';
import Target from './Components/Target/Target';
import Bills from './Components/Bills/Bills';


function App() {

  // State management using useState hook
  const [active, setActive] = React.useState(1)


  // Accessing global context using useGlobalContext hook
  const global = useGlobalContext()
  console.log(global);

  
  // Function to determine the component to display based on 'active' state
  const displayData = () => {
    switch(active) {
      case 1:
        return <Dashboard />
      case 2:
        return <History />

      case 3:
        return <Incomes />
      case 4:
        return <Expenses />
      case 5:
        return <Target />
      case 6:
        return <Bills />  
        
      default: 
        return <Dashboard />


    }
  }


  // useMemo hook to memoize the Orb component
  const orbMemo = useMemo(() => {
    return <Orb />
  }, [])
    

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
  
      <MainLayout>
        <Navigation active = {active} setActive = {setActive} />
        <main>
          {displayData()}

          <div>
            <input type="file" />
          </div>

        </main>

      </MainLayout>
     
    </AppStyled>
  );
}


const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
    width: 0;
    }

  }
`;

export default App;
