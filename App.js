import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Rectangle from './Rectangle';

export default class Caro extends Component {
  row = new Array(20).fill(null);
  column = new Array(15).fill(null);
  constructor(props) {
    super(props);
    this.state = {
      boardChess: Array.from(Array(20), x => Array(15).fill(null)),
      piece: 'X',
    };
  }

  toHit = (posX, posY) => {
    const {piece, boardChess} = this.state;
    boardChess[posX][posY] = piece;
    let win = this.CheckWin(posX, posY, boardChess);
    if (win) {
      alert(`Player ${this.state.piece} win`);
      this.setState({
        piece: 'X',
        boardChess: Array.from(Array(20), x => Array(15).fill(null)),
      });
    } else {
      this.setState({boardChess, piece: this.state.piece === 'X' ? 'O' : 'X'});
    }
  };

  CheckWin = (posX, posY, boardChess) => {
    let value = boardChess[posX][posY];
    console.log;
    // check ngang
    let tempX = posX;
    let tempY = posY;
    let dem = 0;
    while (tempY >= 0) {
      // dem qua trai
      if (boardChess[posX][tempY] !== value) {
        break;
      } else {
        dem++;
      }
      tempY--;
    }
    tempY = posY;
    while (tempY <= 15) {
      // check qua phai
      if (boardChess[posX][tempY] !== value) {
        break;
      } else {
        dem++;
      }
      tempY++;
    }
    tempY = posY;
    if (dem >= 6) {
      // bonus 1 for duplicate position at [posX][posY]
      return true;
    } else {
      tempY = posY;
      dem = 0;
    }
    // check doc
    while (tempX >= 0) {
      // check len tren
      if (boardChess[tempX][posY] !== value) {
        break;
      } else {
        dem++;
      }
      tempX--;
    }
    tempX = posX;
    while (tempX <= 20) {
      // check xuong duoi
      if (boardChess[tempX][posY] !== value) {
        break;
      } else {
        dem++;
      }
      tempX++;
    }
    tempX = posX;
    if (dem >= 6) {
      return true;
    } else {
      tempX = posX;
      dem = 0;
    }
    // check cheo 1
    while (tempX >= 0 && tempY >= 0) {
      //check cheo len ben trai
      if (boardChess[tempX][posY] !== value) {
        break;
      } else {
        dem++;
      }
      tempX--;
      tempY--;
    }
    tempX = posX;
    tempY = posY;
    while (tempX <= 20 && tempY <= 15) {
      //check cheo xuong ben phai
      if (boardChess[tempX][tempY] !== value) {
        break;
      } else {
        dem++;
      }
      tempX++;
      tempY++;
    }
    tempX = posX;
    tempY = posY;
    if (dem >= 6) {
      return true;
    } else {
      dem = 0;
    }
    //check cheo 2
    while (tempX >= 0 && tempY <= 15) {
      // cheo len ben phai
      if (boardChess[tempX][tempY] !== value) {
        break;
      } else {
        dem++;
      }
      tempX--;
      tempY++;
    }
    tempX = posX;
    tempY = posY;
    while (tempX <= 20 && tempY >= 0) {
      // cheo xuong ben trai
      if (boardChess[tempX][tempY] !== value) {
        break;
      } else {
        dem++;
      }
      tempX++;
      tempY--;
    }
    if (dem >= 6) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const {boardChess, myTurn} = this.state;
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
        <View>
          {this.row.map((r, row_idx) => {
            return (
              <View key={`${row_idx}`} style={{flexDirection: 'row'}}>
                {this.column.map((c, column_idx) => {
                  return (
                    <TouchableOpacity
                      key={`${column_idx}`}
                      onPress={() => this.toHit(row_idx, column_idx)}>
                      <Rectangle
                        numberOfRows={this.row.length}
                        numberOfColumns={this.column.length}
                        value={boardChess[row_idx][column_idx]}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
