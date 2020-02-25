export default function createGame(){

  const state = {
    players: { },
    monsters: { },
    screen: {
      width: 10,
      height: 10
    }
  }

  function addPlayer(command){
    const playerId = command.playerId;
    const playerX = command.playerX;
    const playerY = command.playerY;

    state.players[playerId] ={
      x: playerX,
      y: playerY
    }
  }

  function removePlayer(command){
    const playerId = command.playerId;
    delete state.players[playerId];
  }

  function addMonster(command){
    const monsterId = command.monsterId;
    const monsterX = command.monsterX;
    const monsterY = command.monsterY;

    state.monsters[monsterId] ={
      x: monsterX,
      y: monsterY
    }
  }

  function removeMonster(command){
    const monsterId = command.monsterId;
    delete state.monsters[monsterId];
  }

  function movePlayer(command){
    const acceptedMoves = {
      ArrowUp(player){
        if (player.y - 1 >= 0){
          player.y -= 1;
          return
        }
      },
      ArrowDown(player){
        if (player.y + 1 < state.screen.height){
          player.y += 1;
          return
        }
      },
      ArrowLeft(player){
        if (player.x - 1 >= 0){
          player.x -= 1;
          return
        }
      },
      ArrowRight(player){
        if (player.x + 1 < state.screen.width){
          player.x += 1;
          return
        }
      }
    }

    const keyPressed = command.keyPressed;
    const playerId = command.playerId;
    const player = state.players[command.playerId];
    const moveFunction = acceptedMoves[keyPressed];
    if(player && moveFunction){
      moveFunction(player);
      checkForCollision(playerId);
    }

  }

  function checkForCollision(playerId){

    const player = state.players[playerId]


      for (const monsterId in state.monsters){
        const monster = state.monsters[monsterId];

        if (player.x === monster.x && player.y === monster.y){
          removeMonster({monsterId});
        }
      }
  }

  return{
    movePlayer,
    state,
    addPlayer,
    removePlayer,
    addMonster,
    removeMonster
  }
}