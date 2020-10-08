# CS179 Care Package Crew - A Million Thanks

How to start our project: (Each command needs its own terminal)

From the million-thanks-front-end folder, run `npm start`

From million-thanks-back-end folder, run `python ocrserver.py`

From million-thanks-back-end folder, run `node receivefile.js`

From million-thanks-database/postgresql folder, run `./rundb.sh`

From million-thanks-database folder, run `app.js`


Upload a single .jps or multiple .jpgs using the "Upload File" button.

Check the million-thanks-back-end/uploadimage folder to confirm that your file(s) have been uploaded.

Click "Get Address" to start the OCR process.

Good confidence, valid addresses will automatically be uploaded to the database. 

Any pictures that had low confidence or an invalid address will show up on the upload page. You can change any of the fields and press 
confirm to send the rows to the database.

### OCR

This is the main page for Google Cloud Vision OCR which we used for this project.

https://cloud.google.com/vision/docs/handwriting

You need to create a Google Cloud Platform account and update the the credentials in million-thanks-back-end/ocr/license.json.

If not previously installed, run `pip install --upgrade google-cloud-vision`.

### SETUP SERVER

We use Python for OCR, so we use Python Flask package to build server. run `pip install flask` to install flask for your computer.

We use JavaScript Axios package for send image from front-end to back-end. Also, We use JavaScript Express for our upload image server and database server. You need to install Axios and Express for this upload image feature.

Go to million-thanks-back-end folder. Run `npm install express` to install express.

Go to million-thanks-front-end folder. Run `npm install axios` to install axios.

### FRONT-END

We use ReactJS for our front-end, so you need to install Node.js on your computer to start the front-end.

If you use Mac. run `brew install node` to install nodeJS or you can download node.js from https://nodejs.org/en/download/

We use react-map-gl to display map for analytic map. run `npm install react-map-gl` for react-map-gl map package.

## DATABASE

<<<<<<< HEAD
thomas: receivefile.js line28 after sendtopython=true
=======
We use postgresql for our database. To install postgresql on mac, run `brew install postgresql` or download from https://www.postgresql.org/download/ on other operating system.
>>>>>>> fcea8efbbb2c5ffd47cc62704b6186ac50f9154f
