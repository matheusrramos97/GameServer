export default function renderScreen(screen, game, requestAnimationFrame, currentPlayerId){

        const context = screen.getContext("2d");
        context.clearRect(0, 0, 400, 400);

        for (const playerId in game.state.players){
          const player = game.state.players[playerId];
          context.fillStyle = "black";
          context.fillRect(player.x, player.y, 1, 1);
        }
        for (const monsterId in game.state.monsters){
          const monster = game.state.monsters[monsterId];
          context.fillStyle = "red";
          context.fillRect(monster.x, monster.y, 1, 1);
        }

        const currentPlayer = game.state.players[currentPlayerId]

        if(currentPlayer){
          context.fillStyle = "green";
          context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1);
        }

        requestAnimationFrame(() =>{
          renderScreen(screen, game, requestAnimationFrame, currentPlayerId);
        });

      }