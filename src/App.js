import { useState } from 'react';
import Information from './components/Information';
import Board from './components/Board';
import winImage from './winRabbit.png'
import './App.css'

function App() {
  const [reset , setreset] = useState(false);
  const [winner , setwinner] = useState('');

  function restart(){
    setreset(true);
  }

  return (
    <div className='app'>
     <div className={`winner ${winner!==''? '' : 'shrink'}`}>
      <div className='winnerText>'>{winner}</div>
      <button  className='resetButton' onClick={restart}>Restart</button>
     </div>
     <Board reset={reset} setreset={setreset} winner={winner}
                setwinner={setwinner} />
     {/* <Information/> */}
     {/* <img className={`rabbit ${winner!==''? '' : 'shrink'}`} src={winImage}/> */}
     
    </div>
  );
}

export default App;
