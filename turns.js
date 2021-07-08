const readlineSync = require('readline-sync');

class Turn{

	playTurn(playersState,special) {
		//tmp.turn - special
		for (const property in special) {
			console.log(`${property}: ${object[property]}`);
			if(player.name = property){
				console.log("here ")
				player.tmp.attack()
				player.tmp = {}
			}
		}
		while (!this.hasAllAlivePlayed(playersState)) {
			//regarde les specials
			//apply special
			//remove les special next
			let alives = this.playersAlives(playersState)
			let hasntPlay = this.hasntPlayYet(alives)
			
			let [selected, others] = this.selectPlayerAndOthers(hasntPlay, alives)
			this.ListSelectedAndOthers(selected, others)
			let [typeOfAttack,superPower] = this.getTypeOfAttack(selected)
			
			let target = this.getTarget(others,selected, typeOfAttack)
			target = this.resolveTarget(target, others);

			this.attack(selected, typeOfAttack,superPower, target,special)
			readlineSync.question(``)
			playersState = [selected, ...others]
			//change les special tmp = current
		}
		return [playersState,special]
	}
	hasAllAlivePlayed(players) {
		let alives = this.playersAlives(players)
		let allHavePlayed = alives.every(player => player.hasPlay == true)
		return allHavePlayed
	}
	startTurn(turnIndex){
		console.log(`-------- It's turn ${turnIndex} -------`.blue)
	}
	playersAlives(players){
		return players.filter(player => player.hp > 0)
	}
	hasntPlayYet(players) {
		return players.filter(player => player.hasPlayed == false)
	}
	selectPlayerAndOthers(hasntPlay,alives){
		const rand = Math.floor(Math.random() * hasntPlay.length)
		let selectedCharacter = hasntPlay[rand];
		let others = alives.filter(player => player != selectedCharacter)
		return [selectedCharacter, others]
	}
	getTypeOfAttack(player) {
		let attackType
		let superPower
		do {
			console.log()
			superPower = Object.getOwnPropertyNames(Object.getPrototypeOf(player))[1]
			console.log(`le super de ${player.constructor.name} est ${superPower}`.yellow)
			let manaUsed = player[`${superPower}Man`]()
			console.log()
			attackType = readlineSync.question(`Press :A for normal Attack and :B for the special Attack ${superPower}\n`)
			console.log()
			if(attackType == "B" && manaUsed > player.mana){
				console.log(`you don't have enough mana for this, you need at least ${manaUsed} of mana `)
				attackType = null
			}
		}
		while (attackType != "A" && attackType != "B")
		return [attackType, superPower]
	}
	ListTargetale(list) {
		list.forEach((player, index) => {
			console.log(`${index} : ${player.name}(${player.constructor.name}), ${player.hp}hp `)
		})
	}
	getTarget(targetable, selected, typeOfAttack) {
		if (typeOfAttack = 'B' && !selected.special.hasTarget) {
			return undefined
		}
		else {
			this.ListTargetale(targetable)
			let attacked
			do {
				attacked = readlineSync.question(`\nWho do you want to attack? \ngive a number between 0 and ${targetable.length - 1} \n`)
				
			}
			while (parseInt(attacked) < 0 || parseInt(attacked) > 4)
			return attacked
		}
	}
	resolveTarget(numString, others) {
		return others[parseInt(numString)]
	}
	attack(selected, typeOfAttack,superPower, target) {
		selected.hasPlayed = true
		if (typeOfAttack == "A") {
			console.log("normal attack")
			selected.dealDamage(target)
		}
		else if (typeOfAttack == "B") {
			if (!target){
				selected[`${superPower}`]()
			}
			else {
				if(this.constructor.name == "Assassin"){
					special.assasin = true
				}
				selected[`${superPower}`](target)
			}
		}
		else {
			console.log("there was a problem with your special attack")
		}
	}
	ListSelectedAndOthers(selected, others) {
		console.log("selected",selected)
		console.log()
		console.log(`You ${selected.name} are ${selected.constructor.name}, you have ${selected.hp}hp and ${selected.mana} mana`.magenta)
		console.log()
		console.log(`the others`)
		others.forEach(other => {
			console.log(`${other.name} le ${other.constructor.name} a ${other.hp}hp et ${other.mana} mana`)
		});
	}
}

module.exports.Turn  = Turn