import './App.css';
import Grid from './components/Grid';

function App() {

  //this is a wakeup mechanism for a different RBAC website's glitch server
  setInterval(async () => {
    await fetch('https://standing-alive-airship.glitch.com/wakeup');
    console.log('Glitch server pinged!');
  }, 4 * 60 * 1000); // Every 4 minutes

  return (
    <>
      <h1>Game of Life</h1>
      <Grid/>
    </>
   
  )
}

export default App
