const readlineSync = require('readline-sync');
const colors = require('colors');
const { Assassin, Berzerker, Monk, Paladin, Fighter, Character } = require('./characters.js')
const {Turn} = require('./turns.js')
class Game{
	constructor(turnLeft){
		this.turnLeft = turnLeft;
		this.allPlayer = [];
		this.alives = [];
		this.special = {};
	}
	listAll() {
		this.allPlayer.forEach(player => {
			if(player.status != "playing"){
				console.log(`${player.name} played the ${player.constructor.name} - and is dead`.red)
			}else{
				console.log(`${player.name} play the ${player.constructor.name} - ${player.hp} hp - ${player.mana}`.yellow)
			}
		})
	}
	play() {
		while (this.turnLeft != 0) this.newTurn()
		console.log("end of the game")
		this.listAll()
		console.log("c'est la fin")
	}
	newTurn() {
		
		let currentTurn = new Turn()
		currentTurn.startTurn(this.turnLeft)
		this.listAll()
		let newState = currentTurn.playTurn(this.alives)
		this.turnLeft--
		[this.alives, this.special] = newState
	}
}

//
let game = new Game(10)
//------------------------------------------------------------------//
let Grace = new Fighter('Grace')
let Ulder = new Paladin('Ulder')
let Moana = new Monk('Moana')
let Draven = new Berzerker('Draven')
let Carl = new Assassin('Carl')

let allPlayers =[
	Grace,
	Ulder,
	Moana,
	Draven,
	Carl
]
game.alives = allPlayers
game.allPlayer = allPlayers

game.play()