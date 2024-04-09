import { useEffect, useState } from 'react'; 
import reactlogo from './assets/react.svg' ;                              
import './App.css';
import { FaRegHandPaper, FaRegHandRock, FaRegHandScissors } from 'react-icons/fa';
import styles from './App.module.css';

function App() {
  const [playerHand, setPlayerHand] = useState(0);
  const [computerHand, setComputerHand] = useState(0);
  const [timer, setTimer] = useState(3);
  const [runTimer, setRunTimer] = useState(false);
  const [results, setResults] = useState({
    winner: '',
    message: ''
  })
  const [score, setScore] = useState({
    player: 0,
    computer: 0,
  });

  useEffect(()=>{
    if(runTimer && timer > 0){
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000)
    }else if (runTimer && timer < 1){
      setRunTimer(false)
      setTimer(3);
      play();
    }

  }, [runTimer, timer]);

  const options = [
    { name: 'rock', icon: <FaRegHandRock size={60} /> },
    { name: 'paper', icon: <FaRegHandPaper size={60} /> },
    { name: 'scissors', icon: <FaRegHandScissors size={60} /> },
  ]

  const selectOption = (handIndex)=>{
    setResults({winner: '', message: ''})
    setPlayerHand(handIndex)
    
  } ;

  const generateComputerHand = () => {
    const randomNumber = Math.floor(Math.random() * 3)
    setComputerHand(randomNumber);
  }

  const start = () => {
    setResults({winner: '', message: ''})
    setRunTimer(true);
    generateComputerHand();
  };

  const play= () =>{
    if(options[playerHand].name === 'rock' && options[computerHand].name === 'rock') {
      setResults({winner: 'no one', message: 'we have a draw'}); 
    }else if (options[playerHand].name === 'paper' && options[computerHand].name === 'paper') {
      setResults({winner: 'no one', message: 'we have a draw'});
  }else if (options[playerHand].name === 'scissors' && options[computerHand].name === 'scissors') {
    setResults({winner: 'no one', message: 'we have a draw'});
  }else if (options[playerHand].name === 'rock' && options[computerHand].name === 'paper') {
    setResults({winner: 'Computer', message: 'paper beats rock'});
    setScore({...score, computer: score.computer + 1 });
  }else if (options[playerHand].name === 'rock' && options[computerHand].name === 'scissors') {
    setResults({winner: 'player', message: 'rock beats scissors'});
    setScore({...score,player: score.player + 1});
  }else if (options[playerHand].name === 'paper' && options[computerHand].name === 'rock') {
    setResults({winner: 'player', message: 'paper beats rock'});
    setScore({...score,player: score.player + 1});
  }else if (options[playerHand].name === 'paper' && options[computerHand].name === 'scissors') {
    setResults({winner: 'Computer', message: 'scissors beats paper'});
    setScore({...score, computer: score.computer + 1});
  }else if (options[playerHand].name === 'scissors' && options[computerHand].name === 'rock') {
    setResults({winner: 'Computer', message: 'rock beats scissors'});
    setScore({...score,computer: score.computer + 1 });
  }else if (options[playerHand].name === 'scissors' && options[computerHand].name === 'paper'){
    setResults({winner: 'player', message: 'scissors beats paper'});
    setScore({...score,player: score.player + 1});
  }
};


  console.log("playerHand is:", playerHand);
  console.log("computerHand is:", computerHand);

  return (
    
      <div className={styles.container}>
        <div className={styles.titleCtn}>
          <h1>STONE, PAPER, SCISSORS</h1>
          <p>React game!</p>
        </div>
        <div className={styles.scoreCtn}>
          <div className={styles.score}>
            <h3>player</h3>
            <p>Score: {score.player}</p>
          </div>
          <div className={styles.score}>
            <h3>Computer</h3>
            <p>Score: {score.computer}</p>
          </div>
          </div>
      <div className={styles.results}>
        <div className={styles.playerHand}>
          {runTimer && <div className={styles.playerShake}>{options[0].icon}</div>}
          {results?.winner &&(
            <>
            {options[playerHand].icon}
          <p>{options[playerHand].name}</p>
          </>
          )}
       </div>


        <div className={styles.midCol}>
          { runTimer && <p className={styles.timer}>{timer}</p>}
         {results?.winner && (
          <>
          <p className={styles.resultsWinner}>Winner: {results.winner}</p>
          <p className={styles.resultsMessage}>{results.message}</p>
          </>
         )}
        </div>


        <div className={styles.computerHand}>
        {runTimer && <div className={styles.computerShake}>{options[0].icon}</div>}
        {results?.winner &&(
          <>
          {options[computerHand].icon}
          <p>{options[computerHand].name}</p>
          </>
          )}
        </div>
      </div>
      <div className={styles.choiceBtnCtn}>
        <button className={`${styles.choiceBtn} ${styles.bounce} ${playerHand === 0 ? styles.activeChoice:''}`} onClick={() => selectOption(0)}>
          <FaRegHandRock size={60}/>
          Rock
          </button>
        <button className={`${styles.choiceBtn} ${styles.bounce} ${playerHand === 1 ? styles.activeChoice:''}`} onClick={() => selectOption(1)}>
          <FaRegHandPaper size={60} />
          Paper
        </button>
        <button className={`${styles.choiceBtn} ${styles.bounce} ${playerHand === 2 ? styles.activeChoice:''}`} onClick={() => selectOption(2)}>
          <FaRegHandScissors size={60} />
          Scissors
        </button>
        </div>
        <button className={styles.playBtn} onClick={start}>
          play</button>
      </div>
      
     
    
  )
}

export default App
