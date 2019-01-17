
import React from 'react'
import Board from'./Board';

class Game extends React.Component {
      
    constructor(props){
        super(props);
        this.state={
            history:[{
                squares:Array(9).fill(null),
                col:0,
                row:0,
                player: 'x'
            }],
            stepNumber:0,
            xIsNext:true,
            movesIsasc:true,
        }
    }
    handleClick(i){
        const history=this.state.history.slice(0,this.state.stepNumber+1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
      if(calculateWinner(squares).winner||squares[i]){
          return;
      }
      squares[i]=this.state.xIsNext?'X':'O';
      this.setState({
          history:history.concat([{
              squares:squares,
              col:Math.trunc(i/3)+1,
              row:i%3+1,
              player : squares[i]
          }]),
          stepNumber:history.length,
          xIsNext:!this.state.xIsNext,         
      });
  }
  jumpTo(step){
      this.setState({
          stepNumber:step,
          xIsNext:(step%2)===0,
      })
  }

  sortMovesReverse(){
      this.setState({
          movesIsasc:!this.state.movesIsasc,
      });
  }

  render() {
      const history=this.state.history;
      const current = history[this.state.stepNumber];
      const Winner=calculateWinner(current.squares);
      
      const moves=history.map((step,move)=>{
          const desc = move?
          'go to move #'+move+'  Note:  '+(step.player)+'    location is'+'('+step.col+','+step.row+')':
          'go to game start';

          const Nowclick=move===this.state.stepNumber?'button-h':'button-l';
          return(
              <li key={move}>
                  <button className={`${Nowclick}`} onClick={()=>this.jumpTo(move)}>{desc}</button>
              </li>
          );
      }
      );
      let status;
      if(Winner.winner&&Winner.winner!=='DRAW'){
          status='Winner'+Winner.winner;
      }else if(Winner.winner==='DRAW'){
          status=" DRAW.......";
      }else{
          status='Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
    return (
      <div className="game">
        <div className="game-board">
          <Board
              squares={current.squares}
              onClick={(i)=>this.handleClick(i)}
              winLine={Winner.line}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div><button className="button-x" onClick={()=>this.sortMovesReverse()}>
          {this.state.movesIsasc ? 'Sort descending' : 'Sort ascending'}
        </button></div>
        {this.state.movesIsasc ? <ol>{moves}</ol> : <ol reverse>{moves.reverse()}</ol>}
      </div>
      </div>
    );
  }
}


function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for(let i=0;i<lines.length;i++){
        const[a,b,c]=lines[i];
        if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]){
           return{
               winner:squares[a],
               line:lines[i],
           }
        }
    }
    if(squares.every(s=>s)){
        return{
            winner:'DEAW',
            line:null,
        }
    }
    return {
      winner:null,
      line:null,
      };
}

export default Game;