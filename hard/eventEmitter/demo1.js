'use strict';

const util = require('util');
const events = require('events');

const AudioDevice = {
  play: (track) => console.log('play', track),
  stop: () => console.log('stop'),
};

function MusicPlayer() {
  this.playing = false;
  events.EventEmitter.call(this);
}
util.inherits(MusicPlayer, events.EventEmitter);

const musicPlayer = new MusicPlayer();

const play = function(track) {
  // this.playing = true;
  // AudioDevice.play(track);
  this.emit('error', 'unable to play');
};
musicPlayer.on('play', play);
musicPlayer.on('stop', function() {
  this.playing = false;
  AudioDevice.stop();
});
// musicPlayer.removeListener('play', play);
musicPlayer.on('error', (err) => {
  console.error('Error:', err);
});

// musicPlayer.emit('play', 'The roots - The File');
setTimeout(() => {
  musicPlayer.emit('play');
}, 2000);

