#!/bin/bash
xterm -title "react" -e "cd millionthanksfrontend; npm start" &
xterm -title "ocrserver" -e "cd millionthanksbackend; python ocrserver.py" &
xterm -title "receivefile" -e "cd millionthanksbackend; node receivefile.js" &
xterm -title "db" -e "cd millionthanksdatabase; cd postgresql; ./rundb.sh" &
xterm -title "dbapp" -e "cd millionthanksdatabase; node app.js"