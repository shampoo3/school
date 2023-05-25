import express from "express";

import { getDetail, getDetails, createStudent } from "./index.js";

const app = express()

app.use(express.json())

app.get("/students/:id", async (req,res) => {
    const id = req.params.id
    const students = await getDetails()
    res.send(students)
})

app.post("/students", async(req, res) => {
    const {id, name, email, address, contact_number} = req.body
    const student = await createStudent(id, name, email, address, contact_number)
    res.status(201).send(student)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

 
app.listen(8000, () => {
    console.log('Server is running on port 8000')
})