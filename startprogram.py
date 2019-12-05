import subprocess
from subprocess import call
from subprocess import Popen
import os

job = os.getcwd()

print('current directory is ' + job)

location1 = job +"\million-thanks-front-end"
location2 = job +"\million-thanks-back-end"
location3 = job +"\million-thanks-database\postgresql"
location4 = job +"\million-thanks-database"



subprocess.Popen("npm start", "\million-thanks-front-end")
#subprocess.Popen("node .\receiveFile.js", cwd=location2)
#subprocess.Popen("py .\ocrserver.py", cwd=location2)
#subprocess.Popen("./rundb.sh", cwd=location3)
#subprocess.Popen("node app", cwd=location4)
