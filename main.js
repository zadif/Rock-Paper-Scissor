let playermove = "";
let computermove = "";
let text = "";
let game = JSON.parse(localStorage.getItem("score")) || {
  win: 0,
  loss: 0,
  draw: 0,
};

function pickmove() {
  let num = Math.floor(Math.random() * 3) + 1;

  switch (num) {
    case 1:
      return "Stone";

    case 2:
      return "Paper";

    case 3:
      return "Scissor";
  }
}
let isautoplay = false;
let intervalid;
function autoplay() {
  if (!isautoplay) {
    intervalid = setInterval(() => {
      let pm = pickmove();
      playgame(pm);
    }, 1100);
    isautoplay = true;
    document.querySelector(".autoplay-button").innerHTML = "Stop";
  } else {
    clearInterval(intervalid);
    isautoplay = false;
    document.querySelector(".autoplay-button").innerHTML = "Autoplay";
  }
}
document.querySelector(".autoplay-button").addEventListener("click", () => {
  autoplay();
});
document.body.addEventListener("keydown", (event) => {
  if (event.key === "backspace") reset();
  else if (event.key === "a" || event.key === "A") autoplay();
});
document.querySelector(".stone-button").addEventListener("click", () => {
  playgame("Stone");
});
document.querySelector(".paper-button").addEventListener("click", () => {
  playgame("Paper");
});
document.querySelector(".scissor-button").addEventListener("click", () => {
  playgame("Scissor");
});
document.body.addEventListener("keydown", (event) => {
  if (event.key === "R" || event.key === "r") playgame("Stone");
  else if (event.key === "P" || event.key === "p") playgame("Paper");
  else if (event.key === "S" || event.key === "s") playgame("Scissor");
});
function decider() {
  computermove = pickmove();
  let text2 = "";

  if (playermove === "Stone") {
    text += `<img src="stone.png" alt="Stone">      Computer:`;
    if (computermove === "Stone") {
      text2 = "Draw";
    } else if (computermove === "Paper") {
      text2 = "Loss";
    } else if (computermove === "Scissor") {
      text2 = "Win";
    }
  } else if (playermove === "Paper") {
    text += `<img src="paper.png" alt="Paper">      Computer:`;
    if (computermove === "Stone") {
      text2 = "Win";
    } else if (computermove === "Paper") {
      text2 = "Draw";
    } else if (computermove === "Scissor") {
      text2 = "Loss";
    }
  } else if (playermove === "Scissor") {
    text += `<img src="scissors.png" alt="Scissor">      Computer:  `;
    if (computermove === "Stone") {
      text2 = "Loss";
    } else if (computermove === "Paper") {
      text2 = "Win";
    } else if (computermove === "Scissor") {
      text2 = "Draw";
    }
  }

  if (computermove === "Stone") {
    text += `<img src="stone.png" alt="Stone">`;
  } else if (computermove === "Paper") {
    text += `<img src="paper.png" alt="Paper">`;
  } else if (computermove === "Scissor") {
    text += `<img src="scissors.png" alt="Scissor">`;
  }

  if (text2 === "Win") game.win++;
  else if (text2 === "Loss") game.loss++;
  else game.draw++;

  localStorage.setItem("score", JSON.stringify(game));

  // alert(text);
}

function playgame(PM) {
  playermove = PM;
  text = "You: ";

  decider();

  document.querySelector(".js-score1").innerHTML = text;
  document.querySelector(
    ".js-score2"
  ).innerHTML = ` Win:${game.win}  Loss:${game.loss}  Tie:${game.draw}`;
}
document.querySelector(".reset-button").addEventListener("click", () => {
  reset();
});
function reset() {
  let decision = prompt("Enter 'R' to restart score");
  if (decision === "R" || decision === "r") {
    game.win = 0;
    game.draw = 0;
    game.loss = 0;
    localStorage.removeItem("score");
    document.querySelector(
      ".js-score2"
    ).innerHTML = ` Win:${game.win}  Loss:${game.loss}  Tie:${game.draw}`;
  }
}
