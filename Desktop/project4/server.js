const express = require("express")
const sqlite = require("sqlite3").verbose()
const app = express()
const port = 3001
const cors = require('cors')
app.use(express.json())
app.use(cors())

const db = new sqlite.Database('data.db', (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("OK")
    }
})

app.get('/', (req, res) => {
    db.all('SELECT * FROM economy', [], (error, data) => {
        res.send(data)
    })
})

app.get('/economy/:id', (req, res) => {
    const id = req.params.id
    console.log(id);
    db.get('SELECT * FROM economy WHERE id=?', [id], (err, data) => {
        res.send(data)
    })

})
app.post('/new', (req,res) => {
    const name = req.body.name
    const img = req.body.img
    const description = req.body.description
    console.log(name)
    db.run('INSERT INTO economy (name,img,description) values (?,?,?)', [name,img,description],(err) => {
        res.send("OOKK")
    })
})

app.put("/update/:id", (req, res)=>{
    const name = req.body.name
    const id = req.params.id 
  console.log(name);
  console.log(id);
    db.run("update economy set name=?  where id=?",[name,id], (err,data)=>{
        res.send("OK")
    })
})

app.delete('/delete', (req,res) => {

    const id = req.body.id

    db.run('DELETE FROM economy WHERE id=?;)', [id],(err) => {
        res.send("OOKKK")
    })
})

 app.listen(port)

