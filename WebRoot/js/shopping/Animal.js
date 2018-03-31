class Animal{
	constructor(name){
		this.name = name;
	}
}

class Dog extends Animal{
	constructor(name){
		super(name);
	}
	
	showName(){
		console.log(this.name);
	}
}

let dog = new Dog("旺财");

dog.showName();
