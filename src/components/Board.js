import { useEffect, useRef, useState } from "react";
import './BoardStyle.css'
import clickSound from './clickSound.wav';
import winSound from './winSound.wav';
import tieSound from './tieSound.wav';
const Board = ({ reset, setreset, winner, setwinner })=>{
    const [turn , setturn]= useState(0);
    const [data , setdata] = useState(['' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'']);

    const boardref = useRef(null);

    const draw=(event , index)=>{
        const audio = new Audio(clickSound);

        audio.play();
        if(data[index-1]==='' && winner===''){
            const current = turn===0 ? 'X' :'O';
            data[index-1]=current;
            event.target.innerText = current;
            setturn(turn===0?1:0);
        }
    }

    useEffect(()=>{
        setdata(['' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'']);

        const cells=boardref.current.children;

        for(let i=0;i<9;i++){
            cells[i].innerText ='';
        }
        setturn(0);
        setwinner('');
        setreset(false);

    } , [reset, setreset, setwinner])



    useEffect(() => {
 
        // Checks for the win condition in rows
        const checkRow = () => {
            let ans = false;
            for (let i = 0; i < 9; i += 3) {
                ans |= (data[i] === data[i + 1] &&
                    data[i] === data[i + 2] &&
                    data[i] !== '')
            }
            return ans;
        }
 
        // Checks for the win condition in cols
        const checkCol = () => {
            let ans = false;
            for (let i = 0; i < 3; i++) {
                ans |= (data[i] === data[i + 3] &&
                    data[i] === data[i + 6] &&
                    data[i] !== '')
            }
            return ans;
        }
 
        // Checks for the win condition in diagonals
        const checkDiagonal = () => {
            return ((data[0] === data[4] &&
                data[0] === data[8] && data[0] !== '') ||
                (data[2] === data[4] && data[2] === data[6] &&
                    data[2] !== ''));
        }
 
        // Checks if at all a win condition is present
        const checkWin = () => {
            return (checkRow() || checkCol() || checkDiagonal());
        }
 
        // Checks for a tie
        const checkTie = () => {
            let count = 0;
            data.forEach((cell) => {
                if (cell !== '') {
                    count++;
                }
            })
            return count === 9;
        }
 
        // Setting the winner in case of a win
        if (checkWin()) {
            const audio = new Audio(winSound);
            audio.play();
            setwinner(turn === 0 ? "Player O Wins!" :
                "Player X Wins!");
        } else if (checkTie()) {
            const audio = new Audio(tieSound);
            audio.play();
            // Setting the winner to tie in case of a tie
            setwinner("It's a Tie!");
        }
 
    })
    
 
    return(
        
        <div ref={boardref} className="board">
            <div className="input input-1" onClick={(e)=> draw(e , 1)}>1</div>
        
            <div className="input input-2" onClick={(e)=> draw(e , 2)}>2</div>
        
            <div className="input input-3" onClick={(e)=> draw(e , 3)}>3</div>
        
            <div className="input input-4" onClick={(e)=> draw(e , 4)}>4</div>
        
            <div className="input input-5" onClick={(e)=> draw(e , 5)}>5</div>
        
            <div className="input input-6" onClick={(e)=> draw(e , 6)}>6</div>
        
            <div className="input input-7" onClick={(e)=> draw(e , 7)}>7</div>
        
            <div className="input input-8" onClick={(e)=> draw(e , 8)}>8</div>
        
            <div className="input input-9" onClick={(e)=> draw(e , 9)}>9</div>
        </div>
    )
}
export default Board;