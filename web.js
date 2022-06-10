const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Let the battle begin! v3");
});

app.post("/", function (req, res) {
  console.log(req.body);
  const data = req.body;
  const moves = ["F", "T", "L", "R"];
  //const moves = ["F", "L", "R"];
  if (checkHavePeopleToShot(data)) {
    res.send(moves[1]);
  } else {
    res.send(moves[Math.floor(Math.random() * moves.length)]);
  }
});

app.listen(process.env.PORT || 8080);

function getMyLink(data) {
  return data._links.self.href;
}
function getMyState(data) {
  const link = getMyLink(data);
  const state = link;
  console.log(state);

  return state;
}
function checkHavePeopleToShot(data) {
  const state = getMyState(data);
  const friends = data.arena.state;
  const myX = state.x;
  const myY = state.y;
  switch (state.direction) {
    case "N":
      friends.forEach(function (friend) {
        console.log(friend);
        if (myX === friend.x) {
          if (myY - friend.y >= 0 && myY - friend.y <= 3) {
            return true;
          }
        }
      });
      break;
    case "W":
      friends.forEach(function (friend) {
        console.log(friend);
        if (myY === friend.y) {
          if (myX - friend.x >= 0 && myX - friend.x <= 3) {
            return true;
          }
        }
      });
      break;
    case "S":
      friends.forEach(function (friend) {
        console.log(friend);
        if (myY === friend.y) {
          if (myX - friend.x <= 0 && myX - friend.x >= -3) {
            return true;
          }
        }
      });
      break;
    case "E":
      friends.forEach(function (friend) {
        console.log(friend);
        if (myX === friend.x) {
          if (myY - friend.y <= 0 && myX - friend.x >= -3) {
            return true;
          }
        }
      });
      break;
    default:
      return false;
  }
}
