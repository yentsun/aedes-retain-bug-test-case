const mqtt = require('mqtt');

const client  = mqtt.connect('mqtt://localhost', {
    clean: false,
    clientId: 'CLIENT001',
    username: 'user'
});

client.on('connect', function () {
    console.log('+++ connected to broker');
    // client.subscribe('retain-topic');
});


client.on('packetreceive', function (packet) {
    console.log('>>> received packet', JSON.stringify(packet));
});



client.on('message', function (topic, message) {
    console.log('>>> received a message: topic', topic);
});
