window.onload = function () {
  // set variables for dom elements
  var board = document.getElementById("board");
  var newGameBtn = document.getElementById("newGameBtn");
  var currentPlayerBox = document.getElementById("currentPlayerBox");
  var boxes = document.getElementsByClassName("box");
  var winnerBox = document.getElementById("winnerBox");

  // set variables for game state
  var boardState = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  var winner = null;
  var currentPlayer = {
    name: "Player 1",
    value: 1,
  };

  // set listeners
  newGameBtn.onclick = newGame;

  function initBoxes() {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].onclick = function () {
        const position = this.dataset.position.split(",");
        placeMarker(currentPlayer.value, position);
      };
    }
  }

  function init() {
    initBoxes();
    render();
  }

  function render() {
    renderBoard();
    renderCurrentWinner();
    renderCurrentPlayer();
  }

  function renderCurrentPlayer() {
    currentPlayerBox.innerHTML = currentPlayer.name;
  }

  function renderCurrentWinner() {
    winnerBox.innerHTML = winner ? "Player " + winner : "No winner yet";
    winner
      ? winnerBox.classList.add("text-success")
      : winnerBox.classList.remove("text-success");
  }

  function renderBoard() {
    board.innerHTML = boardState
      .map(function (row, i) {
        return row
          .map(
            (col, n) =>
              '<div class="box" data-position="' +
              [i, n] +
              '">' +
              boardState[i][n] +
              "</div>"
          )
          .join("");
      })
      .join("");
    initBoxes();
  }

  function setWinner(value) {
    winner = value;
    render();
  }

  function checkValsForWin(vals) {
    if (vals.every((val) => val === "X")) {
      setWinner(1);
    } else if (vals.every((val) => val === "O")) {
      setWinner(2);
    }
  }

  function checkForWinner() {
    let column1 = boardState.map((row) => row[0]);
    let column2 = boardState.map((row) => row[1]);
    let column3 = boardState.map((row) => row[2]);

    let columns = [column1, column2, column3];
    columns.map((col) => checkValsForWin(col));

    let rows = boardState.map((row) => row);
    rows.map((row) => checkValsForWin(row));

    let count = 0;
    let diagonal1 = boardState.map((row, i) => {
      if (i > 0) count++;
      return row[count];
    });

    let d2Count = 2;
    let diagonal2 = boardState.map((row, i) => {
      if (i > 0) count--;
      return row[count];
    });

    let diagonals = [diagonal1, diagonal2];
    diagonals.map((diagonal) => checkValsForWin(diagonal));

    render();
  }

  function newGame() {
    resetBoard();
    clearWinner();
    init();
  }

  function clearWinner() {
    setWinner(null);
    render();
  }

  function resetBoard() {
    const newBoard = boardState.map((row, i) =>
      row.map((col, n) => (boardState[i][n] = ""))
    );
  }

  function getMarker(player) {
    return {
      1: "X",
      2: "O",
    }[player];
  }

  function updateBoard(row, col, value) {
    if (!boardState[row][col]) {
      boardState[row][col] = value;
      togglePlayer();
      render();
    }
  }

  function placeMarker(player, position) {
    if (!winner) {
      const marker = getMarker(player);
      updateBoard(position[0], position[1], marker);
      checkForWinner();
    }
  }

  function togglePlayer() {
    currentPlayer =
      currentPlayer.value === 1
        ? { name: "Player 2", value: 2 }
        : { name: "Player 1", value: 1 };
    render();
  }

  function newGame() {
    resetBoard();
    render();
  }

  init();
};
