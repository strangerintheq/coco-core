var globe = require('./globe');

var switchGlobe = document.querySelector("#switch-globe");
switchGlobe.onclick = function(){
    globe.switchGlobe();
    switchGlobe.innerHTML = switchGlobe.innerHTML == "2D" ? "3D" : "2D";
};


