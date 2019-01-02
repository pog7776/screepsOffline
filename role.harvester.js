var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var storage = Game.flags['Storage'].pos;

        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });

            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }   //Put creep in storage
            else if(!targets.length && creep.pos != storage){
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ff5555'}});
                creep.say('💤');
                console.log('Putting ' + creep.name + ' in storage');
            }
        }
    }
};

module.exports = roleHarvester;