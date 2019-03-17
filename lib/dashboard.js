/*
  Logic operations on the data to then be used with DOME in the
  scripts/dashboard.js file
 */

function filterCompleteRuns(runs) { //Will remove none compled runs
  return runs.filter(function(run){ //Uses filter function on the data
    return !run.injured;  //Returns the rows where they arn't injured
  });
}

function extractKey(array, key) { //Gets the value from the data set for a given key
  return array.map(function(line){ //Uses a map function
    return line[key];  //Will return the value for that key
  });
}

function runTimeByDate(runs) {
  var completeRuns = filterCompleteRuns(runs); //Remove none completed runs

  return {
    x : extractKey(completeRuns, 'date'), //Return the X as the date
    y : extractKey(completeRuns, 'time') //Return the Y as the time
  };
}

function runTimeByBMI(runs) {
  var completeRuns = filterCompleteRuns(runs); //Filter out the un completed runs

  return {
    x : extractKey(completeRuns, 'bmi'), //Return the X as bmi
    y : extractKey(completeRuns, 'time') //Return the Y as time
  };
}

function runsPerMonth(runs) {

  var getMonthIndex = function(date_string){ //Takes a data string
    return new Date(date_string).getMonth(); //Extracts the month
  };

  var data = { //New set of data containing the months of the year
  x:['January', 'February', 'March', 'April', 'May', 'June', 'July',
     'August', 'September', 'October', 'November', 'December' ] //Set as the x axis
   };

  data.y = runs.reduce(function(acc, run){ //Uses the Reduce function + sets output as the Y axis
    acc[getMonthIndex(run.date)]++; //Totals up the runs for each month
    return acc; //Returns the accumulated values
  },
  Array(data.x.length).fill(0) //Initial count for each month (0)
  );
  return  data; //Return the data with the months and the counts
}

// Gets the count for recent runs for each run
function recentRunCount (runs) {
  var runDates = runs.map(function(run){
    return new Date(run.date); //Return the arr where the dates are properly formatted
  });

  var RECENT_DAYS = 28; //Static var for the number to search for of recent days (4 weeks)

  return runDates.map(function(runDate, runidx){ //Map function on the new array
    var earliestRecentDate = new Date(runDate); //Format the date to a Date object
    earliestRecentDate.setDate(earliestRecentDate.getDate() - RECENT_DAYS); //Subtract 28 days to find the earliest date from that date
    var i = runidx - 1; //Start before the current object
    while(i >= 0 && runDates[i] >= earliestRecentDate) i--; //Find index of first one the dosn't meet the condition
    i++; //Go back to the one that did
    return runidx - i; //Difference between will find the amount of recent runs
  });
}

function calculateInjuryProbabilityFromRecentRunNumber(runs) {
  var recentRunCounts = recentRunCount(runs); //For each run calc how many recent runs they took
  var maximumRecentRuns = recentRunCounts.reduce(function(acc, runCount) { //Calculate the range of recenet runs
    return Math.max(acc, runCount); //Returns the largest of the two numbers
  }, 0 //Intial value - min no. of recent runs
);

var recentRunRange = [];
var recentRunCountAndInjFreq = [];

for(var i = 0; i <= maximumRecentRuns; i++){ //Runs ranging from 0 to max recent runs add to possible range
  recentRunRange.push(i);
  recentRunCountAndInjFreq.push({count:0, injuries:0});
};

//For each possible recent run value, calc the in jury prob
var injuryProbs = runs.reduce(function(acc, run, runidx){
  acc[recentRunCounts[runidx]].count++; //Add to the count
  if(run.injured) acc[recentRunCounts[runidx]].injuries++; //Add to the number of injuries
  return acc;
},
recentRunCountAndInjFreq //Initial value {count:0 injuries:0}
).map(function(d){
  return d.injuries/d.count;
});

return {
  x : recentRunRange, //The recent run range
  y : injuryProbs //The injury prob as Y axis
};

}
