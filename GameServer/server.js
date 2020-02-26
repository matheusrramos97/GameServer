import express from "express";
import http from "http";
import createGame from "./GameClient/game.js";
import socketio from "socket.io";

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

app.use(express.static("GameClient"))

const game = createGame();
game.addMonster({monsterId: "Monster 1", monsterX: 1, monsterY: 1});

game.subscribe((command) => {
  console.log(`> Emitting ${command.type}`)
  sockets.emit(command.type, command);
})

sockets.on("connection", (socket) => {
  const playerId = socket.id;
  console.log(`> Player connected: ${playerId}`);

  game.addPlayer({ playerId: playerId });
  //console.log(game.state);
  
  socket.emit("setup", game.state)

  socket.on("disconnect", () =>{
    game.removePlayer({playerId});
    console.log(`> Player disconneted: ${playerId}`);
  })

  socket.on("move-player", (command) =>{
    command.playerId = playerId;
    command.type = "move-player";
    game.movePlayer(command);
  })

})

server.listen(3000, () => {
  console.log("> Server listening on port: 3000");
})