var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var essentialStaff = require('staff.essential');
var autoSpawn = require('staff.autoSpawn');

module.exports.loop = function () {

    //ensure basic staff is present
    essentialStaff.run();

    //run autoSpawner
    autoSpawn.run();

    //show energy
    for(var name in Game.rooms) {
        //console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
        Game.creeps['sHarvester'].say(Game.rooms[name].energyAvailable);
    }
    
    //instruct creeps
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}