shifter = require("pitch-shift")(
  onData = (frame)
    # Play / write out frame.  Called whenver data is ready
  ,
  onTune = (t, pitch) ->
    console.log("Got pitch ", pitch, " at time ", t)
    # This is the amount to scale the sample by
    return 1.0
  )

#Feed some data to the shifter
shifter(new Float32Array([1, 1, 0, 1, 0, 0, 0  ])) # exsample data
