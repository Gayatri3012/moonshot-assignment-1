import './App.css';
import Grid from './components/Grid';

function App() {

  //this is a wakeup mechanism for a different RBAC website's glitch server
  fetch('https://standing-alive-airship.glitch.com/wakeup')

  return (
    <>
      <h1>Game of Life</h1>
      <Grid/>
    </>
   
  )
}

export default App
