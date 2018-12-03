const AWS = require("aws-sdk");
const R = require("ramda");
const moment = require("moment");

const getReservations = R.prop("Reservations");
const getInstances = R.pipe(
  R.pluck("Instances"),
  R.flatten
);
const getInstanceIds = R.pluck("InstanceId");
const filterRunning = R.filter(R.pathEq(["State", "Name"], "running"));

exports.handler = async event => {
  const ec2 = new AWS.EC2();

  const result = await ec2
    .describeInstances({})
    .promise()
    .then(getReservations)
    .then(getInstances)
    .then(filterRunning)
    .then(getInstanceIds);

  const response = {
    statusCode: 200,
    body: JSON.stringify(`Running instances: ${result}\nIt's ${time}`),
  };

  return response;
};
