class Character{
	constructor(name,hp, dmg, mana){
		this.name = name
		this.hp = hp;
		this.dmg = dmg
		this.mana = mana
		this.status = 'playing';
		this.special={}
		this.tmp = {};
		this.hasPlayed = false
	}
	gonnaDie(character, damage) {
		return (character.hp < damage) ? true : false
	}
	takeDamage(damage, dying = false ) {
		if (dying) {
			//console.log(`${this.name}  ${this.constructor.name} is now dead`.red)
			console.log(`${this.name}  ${this.constructor.name} is now dead`.bgRed)
			this.hp = 0
			this.status = 'loser'
		}
		else if(this.tmp.shield){
			this.hp -= damage - this.tmp.shield
			console.log(`${this.name} ${this.constructor.name} has now ${this.hp} hp`.red)
		}
		else{
			this.hp -= damage
			console.log(`${this.name} ${this.constructor.name} has now ${this.hp} hp`.red)
		}
	}
	dealDamage(victim,damage=this.dmg) {
		if(victim.tmp?.invincible){
			console.log("this player is invicible right now")
			console.log("you're attack does nothing")
			return
		}else{
			console.log("gonna die ?",this.gonnaDie(victim, damage))
		if (this.gonnaDie(victim, damage)) {
			console.log(`${this.constructor.name} give ${damage} and kill ${victim.constructor.name} `.red)
			victim.takeDamage(damage, true)
		}
		else{
			console.log(`${this.constructor.name} give ${damage} to ${victim.constructor.name}`.red)
			victim.takeDamage(damage, false)
		}
		}
	}
}

class Fighter extends Character {
	constructor(name) {
		super(name,12, 4, 40)
		this.special.hasTarget = true
	}
	darkVision(target) {
		//
		this.tmp.turn = "current";
		this.special.dmg = 5
		this.tmp.shield = 2
		this.mana -= 20
		this.dealDamage(target,this.special.dmg)
	}
	darkVisionMan(){
		return "inflige 5 dégâts.Jusqu'au prochain tour, il prendra 2 dégâts de moins par coup reçu. Elle coute 20 mana."
	}
	
}

class Paladin extends Character {
	constructor(name) {
		super(name,16, 3, 160)
		this.special.hasTarget = true
	}
	healingLighting(target) {
		this.special.dmg = 4
		this.hp += 5
		this.mana -= 40
		this.dealDamage(target,this.special.dmg)
	}
	healingLightingMan(){
		return "inflige 4 dégâts et le soignant de 5. Elle coute 40 mana."
	}
	
}

class Monk extends Character {
	constructor(name) {
		super(name,8, 2, 200)
		this.special.target = false
	}
	heal() {
		this.hp += 8;
		this.mana -= 25
		console.log("je me heal de 8".bgBlack)
	}
	healMan(){
		console.log( " heal rend 8 PV. Elle coute 25 mana.")
		return 25
	}
}

class Berzerker extends Character {
	constructor(name) {
		super(name,8, 4, 0)
		this.special.hasTarget = false
	}
	rage() {
		this.dmg++
		this.hp--
		console.log(`${this.name} ${this.constructor.name} has now dmg+1 ${this.dmg} and ${this.hp}hp`)
	}
	rageMan(){
		return "Rage donne +1 d'attaque pour tout le reste de la partie mais enleve 1 hp. Elle coûte 0 mana. Elle peut être appelée plusieurs fois "
	}
}

class Assassin extends Character {
	constructor(name) {
		super(name,6, 6, 20)
		this.special.hasTarget = true
	}
	shadowHit(target) {
		this.tmp.turn = "next"
		this.tmp.invincible = true;
		this.tmp.dmg = 7;
		this.tmp.hasKill = false;
		this.tmp.target = target;
		this.tmp.attack = this.dealSpecialDamage(target,this.tmp.dmg)
	}
	shadowHitMan(){
		return "Shadow hit porte une attaque spéciale infligeant 7 dégâts puis, si l'adversaire n'est pas mort, l'assassin perdra 7 dégâts à son tour. Cette attaque coûte 20 mana."
	}
	dealSpecialDamage(victim, damage){
		if(!this.gonnaDie(victim, damage)){
			console.log('victim not dying')
			this.dealDamage(victim,damage)
			this.hp -= 7
		}
		else{
			console.log('victim dying')
			this.dealDamage(victim,damage)
		}
	}
}



module.exports.Character = Character
module.exports.Fighter  = Fighter
module.exports.Berzerker = Berzerker
module.exports.Monk  = Monk
module.exports.Assassin  = Assassin
module.exports.Paladin  = Paladin