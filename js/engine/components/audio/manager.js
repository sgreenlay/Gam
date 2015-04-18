
namespace('sg.gam.components.engine.audio.manager', (function() {

    var manager = function() {
        if (window.AudioContext) {
            this.context = new AudioContext();
        }
        else if (window.webkitAudioContext) {
            this.context = new webkitAudioContext();
        }
        else if (window.mozAudioContext) {
            this.context = new mozAudioContext();
        }
        else if (window.msAudioContext) {
            this.context = new msAudioContext();
        }

        this.audio = new Object();
        this.audioQueue = new Array();
    };

    manager.prototype.preload = function preload(file) {
        var self = this;

        if (self.audio[file]) {
            self.unload(file);
        }

        if (self.context != null) {
            try {
                var request = new XMLHttpRequest();
                request.open('GET', file, true);
                request.responseType = 'arraybuffer';
                request.onload = function() {
                    self.context.decodeAudioData(request.response, function(buffer) {
                        self.audio[file] = buffer;
                    }, null);
                }
                request.send();
            }
            catch (e) {
                // if XMLHttpRequests aren't supported, default to non-web audio path.

                delete self.context;
                self.context = null;
            }
        }
        else {
            // can't preload in non-web audio case
        }
    };

    manager.prototype.unload = function unload(file) {
        var self = this;

        if (self.audio[file]) {
            delete self.audio[file];
        }
    };

    manager.prototype.play = function play(file, loop) {
        var self = this;

        if (!self.audio[file]) {
            self.preload(file);
        }
        self.audioQueue.push({
            file : file,
            loop : (loop != null) ? loop : false
        });
    };

    manager.prototype.update = function update() {
        var self = this;

        for (var i = 0; i < self.audioQueue.length; i++) {
            var file = self.audioQueue[i].file;
            var loop = self.audioQueue[i].loop;

            if (self.context != null) {
                if (!self.audio[file]) {
                    // file is not loaded, skip for now
                }
                else {
                    var source = self.context.createBufferSource();
                    source.buffer = self.audio[file];
                    source.loop = loop;
                    source.connect(self.context.destination);
                    if (source.start) {
                        source.start(0);
                    }
                    else if (source.noteOn) {
                        source.noteOn(0);
                    }

                    self.audioQueue.splice(i, 1);
                }
            }
            else {
                var sample = new Audio(file);

                if (loop) {
                    if (typeof sample.loop == 'boolean') {
                        self.audio[file].loop = true;
                    }
                    else {
                        sample.addEventListener('ended', function() {
                            this.currentTime = 0;
                            this.play();
                        }, false);
                    }
                }
                sample.play();

                self.audioQueue.splice(i, 1);
            }
        }
    };

    return manager;

})());

loaded('js/engine/components/audio/manager.js');
