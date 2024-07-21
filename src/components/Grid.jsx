import { useCallback, useState , useRef} from "react";
import classes from './Grid.module.css';
import { produce } from "immer";

const numRows = 30;
const numCols = 30;

const neighbours = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
];

const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
};



export default function Grid(){

    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid();
    });

    const [running, setRunning] = useState(false);
    const runningRef = useRef(running);
    runningRef.current = running;

    const gameOfLife = useCallback(() => {
        if (!runningRef.current) {
            return;
        }
        setGrid(prevGrid =>  {
            return produce(prevGrid, (copyGrid) => {
                for(let i = 0; i < numRows; i++){
                    for(let j = 0; j < numCols; j++){
                        let aliveNeighbours = 0;
                        neighbours.forEach(([a, b]) => {
                            const I = i + a;
                            const J = j + b;
                            if(I >= 0 && I < numRows && J >= 0 && J < numCols){
                                aliveNeighbours += prevGrid[I][J];
                            }
                        });
    
                        if(aliveNeighbours < 2 || aliveNeighbours > 3){
                            copyGrid[i][j] = 0;
                        } else if(prevGrid[i][j] === 0  && aliveNeighbours === 3){
                            copyGrid[i][j] = 1;
                        }
                    }
                }
            })
            
        })
        setTimeout(gameOfLife, 150);
    },[])
   
      
    

    function clearGrid() {
        console.log('Clearing the grid...')
        if(running){
            setRunning(false);
            runningRef.current = false;
        }
        setGrid(() => generateEmptyGrid());
    }
    

    return(
        <>
            <div className={classes.buttonControls}>
                <button
                onClick={() => {
                    if(running){
                        setRunning(false);
                        runningRef.current = false;
                    }
                    const rows = [];
                    for (let i = 0; i < numRows; i++) {
                        rows.push(
                            Array.from(Array(numCols),
                                () => (Math.random() > 0.7 ? 1 : 0))
                        );
                    }
                    setGrid(rows);
                }}
                >Random Pattern</button>
                <button 
                    onClick={() => {
                        setRunning(!running);
                        if(!running){
                            runningRef.current = true;
                            gameOfLife();
                        }
                    }}
                >
                    {running ? 'Stop' : 'Start'}
                </button>
                <button
                    onClick={clearGrid}
                >Clear</button>
            </div>
            <div className={classes.container}>
                {grid.map((rows,i) => {
                    return (
                        <div key={i}>
                            {
                            rows.map((col, j) => (
                               <div
                                    key={`${i}-${j}`}
                                    className= {grid[i][j] ? `${classes.gridCell} ${classes.gridCellActive}` : classes.gridCell}
                                    onClick={() => {
                                        const newGrid = produce(grid,(gridCopy) => {
                                            gridCopy[i][j] = grid[i][j] ? 0 : 1;
                                        });
                                        setGrid(newGrid);
                                    }}
                                    style={{
                                        width: 20,
                                        height: 20,
                                    }} />
                            ))

                            }
                        </div>
                    )

                })}
            </div>
        </>
        
    )
}