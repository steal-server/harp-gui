/*
  Stop wave animation
*/
exports.stopWave = function(waves) {
  var time = setInterval(function() {
    waves.waves[0].amplitude = waves.waves[0].amplitude - 1
    if (waves.waves[0].amplitude <= 0) {
      waves.waves[0].amplitude = 0
      clearInterval(time)
    }
  }, 10)
}

/*
  Start wave animation
*/
exports.startWave = function(waves) {
  var time = setInterval(function() {
    waves.waves[0].amplitude = waves.waves[0].amplitude + 1
    if (waves.waves[0].amplitude >= waves.waves[0].topAmplitude) {
      waves.waves[0].amplitude = waves.waves[0].topAmplitude
      clearInterval(time)
    }
  }, 10)
}

/*
  Create the wave
*/
exports.createWave = function() {
  var waves = new SineWaves({
    el: document.getElementById('waves'),
    speed: 30,
    width: 600,
    height: 180,
    wavesWidth: '100%',
    ease: 'SineInOut',
    waves: [{
      timeModifier: 1,
      lineWidth: 4,
      topAmplitude: 25,
      amplitude: 0,
      wavelength: 12
    }],
    initialize: function() {},
    resizeEvent: function() {
      var index = -1
      var length = this.waves.length
      while (++index < length) {
        this.waves[index].strokeStyle = "#ffffff"
      }
      // Clean Up
      index = void 0
      length = void 0
    }
  })
  return waves
}
