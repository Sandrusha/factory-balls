'use strict';

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

let balls = [];
let groups = [];
let n = Math.floor(Math.random() * 10);

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

const colors = ["white", "black", "gray", "red", "green", "blue", "yellow", "pink", "magenta", "orange"];

for (let i = 0; i < n; i++) {
    balls[i] = new Ball(i, 0); // initial value; the balls are not yet generated
}

//random generation
for (let i = 0; i < n * n; i++) {
    balls[Math.floor(Math.random() * n)].nr++; //going random to one color and increase the balls number with 1 for that color
}

console.log("n: " + n);
console.log("==========");
console.log("BALLS: ");
for (let i = 0; i < n; i++) {
    console.log(colors[balls[i].clr] + ": " + balls[i].nr);
}

balls.sort(compare);
solution(0); //want to remove the first color
console.log("==========");
console.log("SOLUTION: ");
for (let i = 0; i < n; i++) {
    let line = colors[groups[i].clr1] + " " + groups[i].nr1;
    if (groups[i].clr2 >= 0) {
        line += " " + colors[groups[i].clr2] + " " + groups[i].nr2;
    }
    console.log(line);
};