"use strict";

console.log("%      Starting Route Builder      %");

const buildingDate = process.argv[2] ? new Date(process.argv[2]) : new Date(new Date().toDateString());

console.log("% Build Route For: " + buildingDate.toDateString() + " %");

