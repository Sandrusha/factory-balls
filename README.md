1.	Create 2 classes for balls and groups
2.	Ball class has an index in an array of strings and a number of balls of the same color
3.	Group class has 2 indexes because into one group are allowed maximum of 2 distinct colors
4.	Sort the array for knowing which is min number of balls of the same color and which is the max number  this is helpful for knowing how to group the balls accordingly with the requests. Will always take maximum n balls from the group where we have the min, and if we need balls for filling up the group, will take them from the group where we have the max. After that, will sort again the array
5.	Create solution() function  to populate the final groups
6.	Create an array for the colors
7.	Random generation of balls
8.	Display the solution into the console
