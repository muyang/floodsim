myModel = function () {
  var u = ABM.Util; // useful alias for utilities
  ABM.Model.prototype.startup = function () {
	console.log("startup");
  };
  ABM.Model.prototype.setup = function () {
	console.log("setup");
	this.refreshPatches = this.refreshLinks = false;
	this.agents.setUseSprites();
	this.population = 100;
	this.speed = .5;
	this.wiggle = u.degToRad(30);
	for (var i=0; i < this.patches.length; i++) {
	  this.patches[i].color = u.randomGray();
	  this.patches[i].hidden = true;
	}
	this.agents.create(this.population);
	for (var i=0; i < this.agents.length; i++) {
	  var pt = this.patches.randomPt();
	  this.agents[i].setXY(pt[0],pt[1]);
	}
	console.log("patches: " + this.patches.length + " agents: " + this.agents.length);
  };
  ABM.Model.prototype.step = function () {
	for (var i=0; i < this.agents.length; i++) {
	  var a = this.agents[i];
	  a.rotate(u.randomCentered(this.wiggle));
	  a.forward(this.speed);
	}
	if (this.anim.ticks % 100 === 0) {
	  console.log(this.anim.toString());
	}
  };
  // div, patchSize, minX, maxX, minY, maxY, isTorus, hasNeighbors
  var model = new ABM.Model("layers", 5, -25, 25, -20, 20, true)
	.debug()  
	.start(); 
  return USGSOverlay;
}
