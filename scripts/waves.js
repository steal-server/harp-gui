/*
  Checks to see whether the wave is currently animating.
*/
isAnimating = function(waves) {
  if (waves.waves[0].amplitude == 0 ||
    waves.waves[0].amplitude == waves.waves[0].topAmplitude)
    return false
  return true
}

/*
  Stop wave animation
*/
exports.stopWave = function(waves) {
  if (!isAnimating(waves)) {
    var time = setInterval(function() {
      waves.waves[0].amplitude = waves.waves[0].amplitude - 1
      if (waves.waves[0].amplitude <= 0) {
        waves.waves[0].amplitude = 0
        clearInterval(time)
      }
    }, 5)
  }
}

/*
  Start wave animation
*/
exports.startWave = function(waves) {
  if (!isAnimating(waves)) {
    var time = setInterval(function() {
      waves.waves[0].amplitude = waves.waves[0].amplitude + 1
      if (waves.waves[0].amplitude >= waves.waves[0].topAmplitude) {
        waves.waves[0].amplitude = waves.waves[0].topAmplitude
        clearInterval(time)
      }
    }, 5)
  }
}

/*
  Create the wave
*/
exports.createWave = function() {
  var waves = new SineWaves({
    el: document.getElementById('waves'),
    speed: 30,
    wavesWidth: '100%',
    ease: 'SineIn',
    waves: [{
      timeModifier: 1,
      lineWidth: 4,
      segmentLength: 1,
      topAmplitude: 60,
      amplitude: 0,
      wavelength: 8
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
