
'use strict'

// let debug = require('debug')('ecs');
let Promise = require('bluebird');
// let chunk = require('chunk');
// let Batch = require('batch');
// let co = require('co');

module.exports = EC2;

/**
 * Create a new EC2 client.
 *
 * @param {AWS} aws - an aws client
 */

function EC2(aws, ecs){
    this.ec2 = new aws.EC2();
    // this.ecs = ecs;
}

/** Return a promise to return ec2 instances
 * @public
 *
 * */

EC2.prototype.instances = function(ec2Instances){
    console.log('here in ec2.js with ecs.containerInstances(%s)', ec2Instances);
    // return this.ecs.describeContainerInstances([cluster, containerInstances])
    //     .bind(this)
    //     .then(this.describeInstances);
    return this.describeInstances(ec2Instances)
        .bind(this);
};

/**
 * Describe instances
 *
 * @private
 * @param {Array} one or more instance IDs
 */

EC2.prototype.describeInstances = function (instances){
    if (!instances || instances.length === 0) {
        return Promise.resolve([]);
    }

    return new Promise((resolve, reject) => {
        let req = { InstanceIds: instances };
        this.ec2.describeInstances(req, (err, res) => {
            if (err) return reject(err);
            resolve(res);
        })
    });
}