const Aedes = require('aedes');
const aedesPersistence = require('aedes-persistence');
const net = require('net');


// CONFIGURE AEDES

const broker = new Aedes({persistence: aedesPersistence()});
const server = net.createServer(broker.handle);


broker.on('client', function (client) {
    console.log('+++ client connected:', client.id);
});

broker.on('connackSent', function (client) {
    console.log('>>> CONNACK sent to client:', client.id);
});

broker.on('subscribe', function (subscriptions, client)  {
    subscriptions.map(function (sub) {
        console.log('+++ client', client.id, 'subscribed to topic', sub.topic, 'with qos', sub.qos);
    });
});

broker.on('publish', function (packet) {
    console.log('>>> message published:', packet.topic, packet.payload);
});

broker.authorizeForward = function (clientId, packet) {
    console.log('client is set to receive', JSON.stringify(packet));
    return packet
};


// START BROKER

server.listen(1883, function () {
    console.log('*** broker started');

    broker.publish({
        topic: 'retain-topic1',
        payload: JSON.stringify({foo: 'bar'}),
        qos: 1,
        retain: true
    });
    broker.publish({
        topic: 'retain-topic2',
        payload: JSON.stringify({foo: 'bar'}),
        qos: 1,
        retain: true
    });
    broker.publish({
        topic: 'retain-topic3',
        payload: JSON.stringify({foo: 'bar'}),
        qos: 1,
        retain: true
    });
    broker.publish({
        topic: 'retain-topic4',
        payload: JSON.stringify({foo: 'bar'}),
        qos: 1,
        retain: true
    });
});