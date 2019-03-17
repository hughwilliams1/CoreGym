/* global running_data Plotly runTimeByDate */

function plotGraph(id, data, layout) {

  //Removing the space the title would be put
  if(!layout.title) {
    layout.margin = {
      l: 60,
      r: 0,
      b: 70,
      t: 20,
      pad: 4
    };
  };

  Plotly.plot(id, data, layout);

  // Resize element when window is resized
  window.addEventListener(
    'resize',
    function() {
      Plotly.Plots.resize(document.getElementById(id));
    }
  );
}

(function() { //Each graph
  var trace = runTimeByDate(running_data); //Get the manipulated data
  trace.type = 'scatter'; //The type of graph
  trace.mode = 'markers'; //The way it is shown

  var layout = { //Whats on each axis
    xaxis: { title : 'Date' },
    yaxis: { title : 'Run Time' }
  };

  plotGraph('runTimeByDate', [trace], layout); //Call the graph plot function with the data
})();

(function() {
  var trace = runTimeByBMI(running_data);
  trace.type = 'scatter';
  trace.mode = 'markers';

  var layout = {
    xaxis: { title : 'BMI'},
    yaxis: { title : 'Run Time'}
  };

  plotGraph('runTimeByBMI', [trace], layout);
})();

(function() {
  var trace = runsPerMonth(running_data);
  trace.type = 'bar';

  var layout = {
    xaxis: { title : 'Month'},
    yaxis: { title : 'Times run'}
  };

  plotGraph('runsPerMonth', [trace], layout);
})();

(function() {
  var trace = calculateInjuryProbabilityFromRecentRunNumber(running_data);
  trace.type = 'bar';

  var layout = {
    xaxis: { title : 'Amount of runs in a 4 week period'},
    yaxis: { title : 'Injury probabilty'}
  };

  plotGraph('injuryProbFromAmountRun', [trace], layout);
})();
