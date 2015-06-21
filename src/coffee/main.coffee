RecordRTC = require("recordrtc")
recorder = RecordRTC(mediaStream, { type: 'audio'})
navigator.getUserMedia  = navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia


shifter = require("pitch-shift")(
  onData = (frame) ->
    console.log frame
    # Play / write out frame.  Called whenver data is ready
  ,
  onTune = (t, pitch) ->
    console.log("Got pitch ", pitch, " at time ", t)
    # This is the amount to scale the sample by
    return 1.0
  )

console.log "start"
#Feed some data to the shifter
shifter(new Float32Array([1, 1, 0, 1, 0, 0, 0 ])) # example data

console.log "end"

window.onRecordClick = ()->
  if this.recording
    this.isRecording = false
    recorder.stopRecording( (audioURL)->
      console.log recorder.bufferSize
  )

  else
    this.recording = true
    recorder.startRecording()
  console.log "click"

this.testing = 1
