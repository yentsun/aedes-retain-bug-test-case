How to reproduce the issue
==========================

Install Aedes
-------------
(with memory persistence)

```
npm install
```

Install Go Paho client
----------------------

Install Go (example for Ubuntu):

```
sudo add-apt-repository ppa:gophers/go
sudo apt-get update
sudo apt-get install golang
```

Setup `GOPATH`:

```
export GOPATH=~/Go
```

Install Paho:

```
go get github.com/eclipse/paho.mqtt.golang
```




Run Aedes
---------

```
npm start
```

You'll notice Aedes publish messages to 4 retain topics:

```
>>> message published: retain-topic1 {"foo":"bar"}
>>> message published: retain-topic2 {"foo":"bar"}
>>> message published: retain-topic3 {"foo":"bar"}
>>> message published: retain-topic4 {"foo":"bar"}

```

Run Go Paho client
------------------

```
go run client.go -action sub -topic retain-topic1 -broker tcp://localhost:1883 -user user -id CLIENT001
```

Paho should subscribe normally and disconnect. Subscribe to two more retained topics:

```
go run client.go -action sub -topic retain-topic2 -broker tcp://localhost:1883 -user user -id CLIENT001
go run client.go -action sub -topic retain-topic3 -broker tcp://localhost:1883 -user user -id CLIENT001
```

In our case Paho still managed to subscribe to those normally.

Subscribe to the fourth one:

```
go run client.go -action sub -topic retain-topic4 -broker tcp://localhost:1883 -user user -id CLIENT001
```
Now Paho client will fail with `received msg that was not CONNACK` error
that can be seen in `paho.log`.

The idea is: as more retain topics appear in subscriptions, messages from some
of them are sent before CONNACK.

