import express from "express"
import mysql from"mysql"
import cors from "cors"

const app =express() 

const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "Thivaharan.100",
    database: "book_store"
}
)

app.use(express.json())
app.use(cors())

app.listen(8800, ()=>{
    console.log("Connected to backend !!")
})

app.get("/",(req,res)=>{
    res.json("Hello from backend")
})

app.get("/books", (req,res)=>{
    const q= "SELECT * FROM BOOKS"
    db.query(q,(err,data)=>{
    if (err) {return res.json(err)}
    return res.json(data) })
}
)

app.post("/books",(req,res)=>{
   const q = "INSERT INTO books (`title`, `description`, `cover`) VALUES (?)"
   const values =[req.body.title, req.body.description, req.body.cover]

   db.query(q, [values],(err,data)=>{
    if (err) {return res.json(err)}
    return res.json(data)
   })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `description`= ?, `cover`= ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.description,
      req.body.cover,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) {
        console.log(err);
        return err.res.data}
      return res.json("Sucessully updated");
    });
  });


  app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM books WHERE id = ? ";
  
    db.query(q, [bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });