var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.height = window.innerHeight * 0.9;
canvas.width = canvas.height;
if (canvas.width > window.innerWidth) {
	canvas.width = window.innerWidth * 0.9;
	canvas.height = canvas.width;
}
var w = canvas.width;
var h = canvas.height;
var xSpace = w / 18;
var squares = [];
var z = 0;
var player = "X";
var squareSize = w / 3;
var win = undefined;
var tie = 0;
init();
function init() {
	generateSquares();
	drawTable();
}
function generateSquares() {
	for (var i = 1; i <= 3; i++) {
		for (var j = 1; j <= 3; j++) {
			squares.push({
				x1: (w * (i - 1)) / 3,
				y1: (h * (j - 1)) / 3,
				x2: (w * i) / 3,
				y2: (h * j) / 3,
				player: null
			});
		}
	}
}

function drawTable() {
	ctx.lineWidth = 2.5;
	ctx.strokeStyle = "#000000";
	// 	ctx.save();

	// 	ctx.moveTo(w / 3, 0);
	// 	ctx.lineTo(w / 3, h);
	// 	ctx.stroke();

	// 	ctx.moveTo(w / 1.5, 0);
	// 	ctx.lineTo(w / 1.5, h);
	// 	ctx.stroke();

	// 	ctx.moveTo(0, h / 3);
	// 	ctx.lineTo(w, h / 3);
	// 	ctx.stroke();

	// 	ctx.moveTo(0, h / 1.5);
	// 	ctx.lineTo(w, h / 1.5);
	// 	ctx.stroke();

	// 	ctx.restore();

	for (z = 0; z <= 8; z++) {
		ctx.save();
		ctx.beginPath();
		ctx.rect(squares[z].x1, squares[z].y1, squareSize, squareSize);
		ctx.stroke();
		ctx.restore();
	}
}
function drawX(currentSquareX, currentSquareY) {
	ctx.save();
	ctx.beginPath();
	ctx.lineWidth = 2.5;
	ctx.strokeStyle = "#000000";
	ctx.moveTo(currentSquareX + xSpace, currentSquareY + xSpace);
	ctx.lineTo(currentSquareX + squareSize - xSpace, currentSquareY + squareSize - xSpace);
	ctx.stroke();
	ctx.moveTo(currentSquareX + squareSize - xSpace, currentSquareY + xSpace);
	ctx.lineTo(currentSquareX + xSpace, currentSquareY + squareSize - xSpace);
	ctx.stroke();

	ctx.restore();
}
function drawO(currentSquareX, currentSquareY) {
	ctx.save();
	ctx.lineWidth = 2.5;
	ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.arc(
		currentSquareX + squareSize / 2,
		currentSquareY + squareSize / 2,
		squareSize / 3,
		0,
		2 * Math.PI
	);

	ctx.stroke();
	ctx.restore;
}

function setSquarePlayer(currentSquareX, currentSquareY, i) {
	if (player == "X" && squares[i].player == null) {
		squares[i].player = "X";
		drawX(currentSquareX, currentSquareY);
		player = "O";
	} else if (player == "O" && squares[i].player == null) {
		squares[i].player = "O";
		drawO(currentSquareX, currentSquareY);
		player = "X";
	}
}

function pointInSquare(x, y, x1, y1, x2, y2) {
	return x >= x1 && x <= x2 && y >= y1 && y <= y2;
}

function checkSquare(x, y) {
	for (var i = 0; i <= 8; i++) {
		if (pointInSquare(x, y, squares[i].x1, squares[i].y1, squares[i].x2, squares[i].y2)) {
			return [squares[i].x1, squares[i].y1, i];
		}
	}
}
function checkWin() {
	for (var j = 0; j <= 2; j++) {
		var currentPlayer = [];
		for (var i = 0; i <= 2; i++) {
			currentPlayer[i] = squares[j + i * 3].player;
		}
		if (
			currentPlayer[1] == currentPlayer[2] &&
			currentPlayer[1] == currentPlayer[0] &&
			currentPlayer[2] == currentPlayer[0] &&
			currentPlayer[0] != null
		) {
			type = "row";
			start = squares[j + (i - 1) * 3].y1;
			return ["row", start];
		}
		for (var i = 0; i <= 2; i++) {
			currentPlayer[i] = squares[j * 3 + i].player;
		}
		if (
			currentPlayer[1] == currentPlayer[2] &&
			currentPlayer[1] == currentPlayer[0] &&
			currentPlayer[2] == currentPlayer[0] &&
			currentPlayer[0] != null
		) {
			type = "column";
			start = squares[j * 3 + i - 1].x1;
			return [type, start];
		}
		for (var i = 0; i <= 2; i++) {
			currentPlayer[i] = squares[i * 4].player;
		}
		if (
			currentPlayer[1] == currentPlayer[2] &&
			currentPlayer[1] == currentPlayer[0] &&
			currentPlayer[2] == currentPlayer[0] &&
			currentPlayer[0] != null
		) {
			type = "diagonalLeft";
			start = squares[(i - 1) * 4].x1;
			return [type, start];
		}
		for (var i = 0; i <= 2; i++) {
			currentPlayer[i] = squares[i * 2 + 2].player;
		}
		if (
			currentPlayer[1] == currentPlayer[2] &&
			currentPlayer[1] == currentPlayer[0] &&
			currentPlayer[2] == currentPlayer[0] &&
			currentPlayer[0] != null
		) {
			type = "diagonalRight";
			start = squares[(i - 1) * 2 + 2].x1;
			return [type, start];
		}
	}
}
function drawWin(win) {
	switch (win[0]) {
		case "row":
			ctx.save();
			ctx.lineWidth = 10;
			ctx.strokeStyle = "#000000";
			ctx.beginPath();
			ctx.moveTo(squareSize / 9, win[1] + squareSize / 2);
			ctx.lineTo(w - squareSize / 9, win[1] + squareSize / 2);
			ctx.stroke();
			ctx.restore();
			break;
		case "column":
			ctx.save();
			ctx.lineWidth = 10;
			ctx.strokeStyle = "#000000";
			ctx.beginPath();
			ctx.moveTo(win[1] + squareSize / 2, squareSize / 9);
			ctx.lineTo(win[1] + squareSize / 2, h - squareSize / 9);
			ctx.stroke();
			ctx.restore();
			break;
		case "diagonalLeft":
			ctx.save();
			ctx.lineWidth = 10;
			ctx.strokeStyle = "#000000";
			ctx.beginPath();
			ctx.moveTo(squareSize / 9, squareSize / 9);
			ctx.lineTo(w - squareSize / 9, h - squareSize / 9);
			ctx.stroke();
			ctx.restore();
			break;
		case "diagonalRight":
			ctx.save();
			ctx.lineWidth = 10;
			ctx.strokeStyle = "#000000";
			ctx.beginPath();
			ctx.moveTo(w - squareSize / 9, squareSize / 9);
			ctx.lineTo(squareSize / 9, h - squareSize / 9);
			ctx.stroke();
			ctx.restore();
			break;
	}
	document.getElementById("reset").style.display = "block";
}

function clearBoard() {
	ctx.beginPath();
	ctx.rect(0, 0, w, h);
	ctx.fillStyle = "white";
	ctx.fill();
}

function checkTie() {
	tie = 1;
	squares.forEach((square) => {
		if (square.player == null) {
			tie = 0;
		}
	});
	return tie;
}

canvas.addEventListener("click", function(e) {
	var rect = canvas.getBoundingClientRect();
	var x = e.clientX - rect.left;
	var y = e.clientY - rect.top;
	var square = checkSquare(x, y);

	if (win == undefined) {
		setSquarePlayer(square[0], square[1], square[2]);
	}
	win = checkWin();
	if (win != undefined) {
		drawWin(win);
	} else if (checkTie() == 1) {
		document.getElementById("reset").style.display = "block";
	}
});

document.getElementById("reset").addEventListener("click", function() {
	squares = [];
	win = undefined;
	player = "X";
	tie = 0;
	clearBoard();
	init();
	document.getElementById("reset").style.display = "none";
});
