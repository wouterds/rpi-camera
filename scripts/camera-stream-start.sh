#!/bin/bash

sudo -u pi -S mjpg_streamer -i 'input_uvc.so --device /dev/video0 --fps 30 --resolution VGA --quality 65' -o 'output_http.so' > /dev/null 2>&1 &
