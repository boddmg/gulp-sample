root = window
# RecordRTC = require("recordrtc")
session = {
    audio: true,
    video: false
}
navigator.getUserMedia  = navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia
recorder = null

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

root.recording = false
root.onRecordClick = ()->
  if recording
    recorder.stopRecording( (audioURL)->
      console.log recorder.bufferSize
      this.isRecording = false
    )
  else
    onSuccess = (mediaStream) ->
      # recorder = RecordRTC(mediaStream)
      console.log "getUserMedia"
      console.log mediaStream
    navigator.getUserMedia(session, onSuccess,  -> )
    # recording = true
    # recorder.startRecording()
  console.log "click"


this.testing = 1
