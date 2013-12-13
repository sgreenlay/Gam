namespace('sg.game.resources.sounds', (function() {
	var sounds = function(audioman) {
		var self = this;
		
		self.sounds = new Object();
		self.sounds['unknown'] = 'wav/test.wav';
		
		Object.keys(this.sounds).forEach(function(sound) {
			audioman.preload(self.get(sound));
		});
	};

	sounds.prototype.get = function get(name) {
		if (typeof this.sounds[name] == 'undefined') {
			return this.sounds['unknown'];
		}
		return this.sounds[name];
	};

	return sounds;
})());

loaded('js/game/resources/sounds.js');