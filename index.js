(function() {
  var onData, onTune, shifter;

  shifter = require("pitch-shift")(onData = frame, onTune = function(t, pitch) {
    console.log("Got pitch ", pitch, " at time ", t);
    return 1.0;
  });

  shifter(new Float32Array([1, 1, 0, 1, 0, 0, 0]));

}).call(this);
