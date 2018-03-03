# RPI Camera

Web controllable camera using a Raspberry Pi and a cheap USB cam from eBay.

https://wouterdeschuyter.be/blog/how-to-create-a-15-dollar-web-controllable-camera-with-a-raspberry-pi-zero

## Dependencies

### NodeJS

```shell
wget https://nodejs.org/dist/v9.7.1/node-v9.7.1-linux-armv6l.tar.gz
tar xf node-v9.7.1-linux-armv6l.tar.gz
rm -f node-v9.7.1-linux-armv6l/*
pushd node-v9.7.1-linux-armv6l/
sudo cp -R * /usr/local/
popd
rm -rf node-v9.7.1-linux-armv6l
rm node-v9.7.1-linux-armv6l.tar.gz
```

#### PiGPIO

```shell
sudo apt-get update
sudo apt-get install pigpio -y
```

### MJPG Streamer

```shell
sudo apt-get install libjpeg8-dev imagemagick libv4l-dev uvcdynctrl git cmake -y
git clone https://github.com/jacksonliam/mjpg-streamer.git
cd mjpg-streamer/mjpg-streamer-experimental
make USE_LIBV4L2=true clean all
sudo make install
sudo usermod -aG video pi
sudo modprobe bcm2835-v4l2
cd ../../
rm -rf mjpg-streamer
```
