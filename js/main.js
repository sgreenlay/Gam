
require('js/engine/main.js', function() {
require('js/game/main.js', function() {

var game_canvas = document.getElementById("game-canvas");
(new sg.gam.engine(game_canvas)).run(new sg.game.game());

loaded('js/main.js');

}); // js/game/main.js
}); // js/engine/main.js
