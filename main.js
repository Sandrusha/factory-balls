'use strict';

//Global variable
const colors = ["red", "green", "blue", "yellow", "pink", "purple", "orange", "turquoise", "black", "gray"];
//https://flatuicolors.com/
const colorsHex = ["#c0392b", "#27ae60", "#3498db", "#f1c40f", "#FDA7DF", "#8e44ad", "#e67e22", "#1abc9c", "#000", "#7f8c8d"]; 

document.getElementById("solve").disabled = true;

let n = 2 + Math.floor(Math.random() * 9);

//Build tables - param1: div name; param2: table index - used in creating the cells ids
buildTable("main-table", 1);
buildTable("sorted-table", 2);
buildTable("final-groups", 3);

let balls = [];
let groups = [];
let k = 0; //current line, initialized to 0
let timer = null;

//clr - index in an array of strings
//nr - number of the balls of the same color
class Ball {
    constructor(clr, nr) {
        this.clr = clr;
        this.nr = nr;
    }
}

//clr1 & clr2 because we are allowed to have maximum of 2 distinct colors into a group
//if clr2 == -1 && nr2 == 0, then we have only one color into group
class Group {
    constructor(clr1, nr1, clr2, nr2) {
        this.clr1 = clr1;
        this.nr1 = nr1;
        this.clr2 = clr2;
        this.nr2 = nr2;
    }
}

//sort the array using the compare function - http://www.mattmorgante.com/technology/javascript-sort-compare
function compare(b1, b2) {
    if (b1.nr < b2.nr) {
        return -1;
    } else if (b1.nr > b2.nr) {
        return 1;
    } else {
        return 0;
    }
}

function buildTable(divName, ix) { //ix - index
    let table = document.createElement("table");
    let tbody = document.createElement("tbody");
    for (let rowIndex = 0; rowIndex < n; rowIndex++) {
        let row = document.createElement("tr");
        for (let colIndex = 0; colIndex < n; colIndex++) {
            let tableCell = document.createElement("td");
            tableCell.style.backgroundColor = "#bdc3c7";
            tableCell.setAttribute("id", "cell" + ix + "_" + rowIndex + "_" + colIndex); //ix is used to generate unique ids for cells: cell1_0_0
            row.appendChild(tableCell);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    let div = document.getElementById(divName);
    div.appendChild(table);
}

function generateBalls() {
    document.getElementById("generate").disabled = true;
    for (let j = 0; j < n; j++) {
        let cellId = "cell1_0_" + j; //on the first line we have one cell of each generated color
        let tableCell = document.getElementById(cellId);
        tableCell.style.backgroundColor = colorsHex[j];
    }
    
    // we ensure that we have at least 1 ball for each color
    for (let i = 0; i < n; i++) {
        balls[i] = new Ball(i, 1); // initial value; the balls are not yet generated
    }

    //Random balls generation
    for (let i = 1; i < n; i++) { //i = 0 was solved on first line (above) so we start with i = 1
        for (let j = 0; j < n; j++) {
            let clr = Math.floor(Math.random() * n);
            balls[clr].nr++; //going random to one color and increase the balls number with i for that color
            let cellId = "cell1_" + i + "_" + j;
            let tableCell = document.getElementById(cellId);
            tableCell.style.backgroundColor = colorsHex[clr];
        }
    }
    console.log("n is " + n);
    console.log("Total number of balls: " + n * n);
    console.log("=========================")
    for (let i = 0; i < n; i++) {
        console.log(colors[balls[i].clr] + ": " + balls[i].nr);
    }

    //Initial sorting
    //setTimeout(sortBalls, 2000); // this function should sort all the balls into the second table and displayed them after 2 seconds
}

function solution(k) {
    //the condition for completion
    if (k == n - 1) {
        //last group is populated with the remaining balls
        groups[n - 1] = new Group(balls[n - 1].clr, balls[n - 1].nr, -1, 0);
        return;
    }

    //equilibrium condition
    if (balls[k].nr == n) {
        for (let i = k; i < n; i++) {
            groups[i] = new Group(balls[i].clr, n, -1, 0);
        }
        return;
    } else {
        groups[k] = new Group(balls[k].clr, balls[k].nr, balls[n - 1].clr, n - balls[k].nr);
        balls[n - 1].nr -= n - balls[k].nr;
        balls[k].nr = 0;
        balls.sort(compare);
        solution(k + 1);
    }
}

for (let i = 0; i < n; i++) {
    balls[i] = new Ball(i, 0); // initial value; the balls are not yet generated
}

solution(0); //want to remove the first color
for (let i = 0; i < n; i++) {
    let line = colors[groups[i].clr1] + " " + groups[i].nr1;
    if (groups[i].clr2 >= 0) {
        line += " " + colors[groups[i].clr2] + " " + groups[i].nr2;
    }
};

function sortBalls() {
    //sort the balls and display into the second table
  }

function sortBallsTable() {
    //this function is called everytime the sort is needed (into the solution)
}