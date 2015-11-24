/*
  Stop Wave animation
*/
exports.StopWave = function() {
	var myVar = setInterval(function(){
		window.WaveAmplitude = window.WaveAmplitude - 0.02;
		if (window.WaveAmplitude <= 0.001){
			window.WaveAmplitude = 0.001;
			clearInterval(myVar);
		}
	},10);
}
/*
  Start Wave animation
*/
exports.StartWave = function() {
  var myVar = setInterval(function(){
		window.WaveAmplitude = window.WaveAmplitude + 0.003;
		if (window.WaveAmplitude >= 0.5){
			window.WaveAmplitude = 0.5;
			clearInterval(myVar);
		}
	},10);
}

/*
  Start Wave animation
*/
/*
  Start Wave animation
*/
exports.CreateWave = function() {
	function SiriWave() {
		this.phase = 0;
		this.run = false;

		// UI vars
		this.ratio = 1;
		this.width = 300;
		this.width_2 = this.width / 2;
		this.width_4 = this.width / 4;

		this.height = 180;
		this.height_2 = this.height / 2;

		this.MAX = (this.height_2) - 4;

		// Constructor opt
		this.amplitude = window.WaveAmplitude;
		this.speed = 0.05;
		this.frequency = 5;
		this.color = '255,255,255';

		// Canvas

		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.container = document.getElementById('wave');
		this.container.appendChild(this.canvas);

		this.ctx = this.canvas.getContext('2d');

		// Start
		this.phase = 0;
		this.run = true;
		this._draw();
	}

	SiriWave.prototype._xpos = function(i) {
		return this.width_2 + i * this.width_4;
	};

	SiriWave.prototype._ypos = function(i, attenuation) {
		var att = (this.MAX * window.WaveAmplitude) / attenuation;
		return this.height_2 + Math.pow(4/(4+Math.pow(i,4)), 4) * att * Math.sin(this.frequency * i - this.phase);
	};

	SiriWave.prototype._drawLine = function(attenuation, color, width){
		this.ctx.moveTo(0,0);
		this.ctx.beginPath();
		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = 4;

		var i = -2;
		while ((i += 0.01) <= 2) {
			var y = this._ypos(i, attenuation);
			if (Math.abs(i) >= 1.90) y = this.height_2;
			this.ctx.lineTo(this._xpos(i), y);
		}
		this.ctx.stroke();
	};

	SiriWave.prototype._clear = function() {
		this.ctx.globalCompositeOperation = 'destination-out';
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.ctx.globalCompositeOperation = 'source-over';
	};

	SiriWave.prototype._draw = function() {
		if (this.run === false) return;
		this.phase = (this.phase + Math.PI*this.speed) % (2*Math.PI);
		this._clear();
		this._drawLine(1, 'rgba(' + this.color + ',1)', 1.5);
		if (window.requestAnimationFrame) {
			requestAnimationFrame(this._draw.bind(this));
			return;
		};
		setTimeout(this._draw.bind(this), 20);
	};
	/* API */
	window.WaveAmplitude = 0.001;
	new SiriWave();
};
