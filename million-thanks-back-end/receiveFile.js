let app = require('express')()
let multer = require('multer')
let cors = require('cors')
app.use(cors())

app.get('/', function(req, res) {
    res.send('<h1>hello</h1><script src="/socket.io/socket.io.js"></script><script>var socket = io() </script>')
})

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploadimage')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname)
  }
})
let upload = multer({ storage: storage }).single('file')
let sendToPython = false
app.post('/upload',function(req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        sendToPython = true
        return res.status(200).send(req.file)
    })
})

app.post('/test', function(req, res) {
    
})

app.listen(3100, function() {
    console.log('receiving file from port 3100')
})
