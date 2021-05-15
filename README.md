# Caso practico 2 

Developers: 

TODO: Add github profiles

# Deploy 

Build the .jar 
```bash
$ mvn clean package -Pproduction -DskipTests
```

Create the service: 
```bash
[Unit]
Description=Tirtec - API
After=syslog.target

[Service]
User=tirtec
ExecStart=/home/ubuntu/caso-2-grupo-2/rest-api/target/rest-api-0.0.1-SNAPSHOT.jar SuccessExitStatus=143 

[Install] 
WantedBy=multi-user.target
```

Run service: 
```bash
$ sudo systemctl start tirtec
```

For testing purpose you can use screen to run the application. 

```bash
$ sudo apt install screen

$ screen # Accept
```

Start the server with 
```bash
$ java -jar /home/ubuntu/caso-2-grupo-2/rest-api/target/rest-api-0.0.1-SNAPSHOT.jar SuccessExitStatus=143 
```

Excute the server in second plane with: 
```
$ Ctrl + A + D
```

See the actual executing services.

```
$ screen -list
```

Swith to session.

```
$ screen -r 26653
```