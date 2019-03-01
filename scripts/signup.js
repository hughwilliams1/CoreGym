function checkSame(p1, p2) {
  if(p1.value == p2.value & p1.value != "" & p2.value != "") {
    return true;
  }else {
    return false;
  }
}

function checkPass() {
  var p1 = document.getElementById('p1');
  var p2 = document.getElementById('p2');

  var matchColour = "#19DD89";
  var noMatchColour = "#FF4847";

  var regex = new RegExp(/(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}/);

  if(checkSame(p1, p2) & regex.test(p1.value)) {
    p2.style.backgroundColor = matchColour;
    p1.style.backgroundColor = matchColour;
  }else {
    p2.style.backgroundColor = noMatchColour;
    p1.style.backgroundColor = noMatchColour;
  }
}
 
