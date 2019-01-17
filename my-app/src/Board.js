import React from 'react';
import Square from './Square';
class Board extends React.Component {
    renderSquare(i,isHighlighted) {
        return (<Square 
            value={this.props.squares[i]}
            onClick={()=>this.props.onClick(i)}
            isHighlighted={isHighlighted}
        />
      );
    }
    render() {
        const rows = Array(3);
        for (let i of [0, 1, 2]) {
          const items = Array(3);
          for (let j of [0, 1, 2]) {
            const index = i*3 + j;
            const highlight = this.props.winLine && this.props.winLine.includes(index);
            items[j] = this.renderSquare(index, highlight);
          }
          rows[i] = (
            <div key={i} className="board-row">
              {items}
            </div>
          );
        }
        return (
          <div>{rows}</div>
        );
      }
  
    // render() {
    //     var wrapper=[];
    //     for (var i=0;i<=2;i++){
    //         var row=[];
    //         for(var j=3*i;j<=3*i+2;j++){
    //             const index=i*3+j;
    //             row.push(this.renderSquare(j));
    //             const highlight=this.props.winLine&&this.props.winLine.includes(index);
    //             row[j]=this.renderSquare(index,highlight);
    //         }
    //         wrapper.push(<div className="board-row" key={i}>{row}</div>);
    //     }

    //     return(
    //         <div>
    //                 <div className="status">{}</div>
    //                 {wrapper}
    //         </div>
            
    //     );
    // }
  }
  export default Board;