
import express from 'express';
// import mariadb from 'mariadb';
import db from './db.config.js'
import bodyParser from 'body-parser';

import usersRoutes from './routes/users.js';
//import { generateToken, verifyToken } from './auth.mjs';
import {verifyToken} from './auth.mjs';
import jwt from './auth.mjs';
import config from './auth.mjs';

const app = express();
const PORT = 8000;

app.post("/welcome", verifyToken, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });

app.use(bodyParser.json());

app.use('/', usersRoutes)

app.get('/',(req,res) => res.send('Hello from Homepage!'));



app.get('/getStudents',async(req,res) => {
    try {
        const result = await db.pool.query('select * from student;');
        res.send(result);
    } catch(e) {
        console.log(e);
        res.send(e);
    }
})

app.get('/getStudent',async(req,res) => {
    try {
        const verify = "select id from user where token = '"+req.body.token+"'";
        const verificationData = await db.pool.query(verify);
        if((JSON.stringify(verificationData.length))>0)
        {
            const query = "select * from student where student.id = '"+req.body.id+"'";
            const result = await db.pool.query(query);
            res.send(result);
        }
        else
        {
            res.send("invalid key");
        }
    } catch(e) {
        console.log(e);
        res.send(e);
    }
})

app.post('/createStudent',async(req,res) => {
    try {
        const verify = "select id from user where token = '"+req.body.token+"'";
        const verificationData = await db.pool.query(verify);
        if((JSON.stringify(verificationData.length))>0)
        {
        const query = "insert into student (id, name, email, address, contact_number) values('"+req.body.id+"','"+req.body.name+"', '"+req.body.email+"', '"+req.body.address+"','"+req.body.contact_number+"')"
        await db.pool.query(query);
        res.send('Data inserted');
        }
        else
        {
            res.send("invalid key");
        }
    } catch(e) {
        console.log(e);
        res.send(e);
    }
})

app.delete('/deleteStudent',async(req,res) => {
    try {
        const verify = "select id from user where token = '"+req.body.token+"'";
        const verificationData = await db.pool.query(verify);
        if((JSON.stringify(verificationData.length))>0)
        {
        const query = "delete from student where id = '"+req.body.id+"' ";
        await db.pool.query(query);
        res.send('Student deleted from the database');
        }
        else{
            res.send("invalid key");
        }
    } catch(e) {
        console.log(e);
        res.send(e);
    }
})

app.patch('/updateStudent',async(req,res) => {
    try {
        const verify = "select id from user where token = '"+req.body.token+"'";
        const verificationData = await db.pool.query(verify);
        if((JSON.stringify(verificationData.length))>0)
        {
        const query = "update student set email = '"+req.body.email+"', address = '"+req.body.address+"', contact_number = '"+req.body.contact_number+"'  where student.id = '"+req.body.id+"' ";
        await db.pool.query(query);
        res.send('updated');
        }
        else
        {
            res.send("invalid key");
        }
    } catch(e) {
        console.log(e);
        res.send(e);
    }
})

app.get('/getSection',async(req,res) => {
    try {
        const verify = "select id from user where token = '"+req.body.token+"'";
        const verificationData = await db.pool.query(verify);
        if((JSON.stringify(verificationData.length))>0)
        {
        const query = "select * from section where section.id = '"+req.body.id+"'";
        const result = await db.pool.query(query);
        res.send(result);
        }
        else
        {res.send("invalid key");}
    } catch(e) {
        console.log(e);
        res.send(e);
    }
})

app.post('/createSection',async(req,res) => {
    try {
        const verify = "select id from user where token = '"+req.body.token+"'";
        const verificationData = await db.pool.query(verify);
        if((JSON.stringify(verificationData.length))>0)
        {
        const query = "insert into section (class, section, id) values('"+req.body.class+"','"+req.body.section+"', '"+req.body.id+"')";
        await db.pool.query(query);
        res.send('Data inserted');
        }
        else{
            res.send("invalid key");
        }
    } catch(e) {
        console.log(e);
        res.send(e);
    }
})

app.delete('/deleteSection',async(req,res) => {
    try {
        const verify = "select id from user where token = '"+req.body.token+"'";
        const verificationData = await db.pool.query(verify);
        if((JSON.stringify(verificationData.length))>0)
        {
        const query = "delete from section where id = '"+req.body.id+"' ";
        await db.pool.query(query);
        res.send('Section deleted from the database');
        }
        else{
            res.send("invalid key");
        }
    } catch(e) {
        console.log(e);
        res.send(e);
    }
})

app.patch('/updateSection',async(req,res) => {
    try {
        const verify = "select id from user where token = '"+req.body.token+"'";
        const verificationData = await db.pool.query(verify);
        if((JSON.stringify(verificationData.length))>0)
        {
        const query = "update section set class = '"+req.body.class+"', section = '"+req.body.section+"'  where section.id = '"+req.body.id+"' ";
        await db.pool.query(query);
        res.send('updated');
        }
        else{
            res.send("invalid key");
        }
    } catch(e) {
        console.log(e);
        res.send(e);
    }
})

app.get('/getAY',async(req,res) => {
    try {
        const verify = "select id from user where token = '"+req.body.token+"'";
        const verificationData = await db.pool.query(verify);
        if((JSON.stringify(verificationData.length))>0)
        {
        const query = "select * from academic_year where academic_year.id = '"+req.body.id+"'";
        const result = await db.pool.query(query);
        res.send(result);
        }
        else{
            res.send("invalid token");
        }
    } catch(e) {
        console.log(e);
        res.send(e);
    }
})

app.post('/createAY',async(req,res) => {
    try {
        const verify = "select id from user where token = '"+req.body.token+"'";
        const verificationData = await db.pool.query(verify);
        if((JSON.stringify(verificationData.length))>0)
        {
        const query = "insert into academic_year (session, id, class) values('"+req.body.session+"','"+req.body.id+"', '"+req.body.class+"')";
        await db.pool.query(query);
        res.send('Data inserted');
        }
        else{
            res.send("invalid key");
        }
    } catch(e) {
        console.log(e);
        res.send(e);
    }
})

app.delete('/deleteAY',async(req,res) => {
    try {
        const verify = "select id from user where token = '"+req.body.token+"'";
        const verificationData = await db.pool.query(verify);
        if((JSON.stringify(verificationData.length))>0)
        {
        const query = "delete from academic_year where academic_year.id = '"+req.body.id+"' ";
        await db.pool.query(query);
        res.send('deleted from the database');
        }
        else{
            res.send("invalid input");
        }
    } catch(e) {
        console.log(e);
        res.send(e);
    }
})

app.patch('/updateAY',async(req,res) => {
    try {
        const verify = "select id from user where token = '"+req.body.token+"'";
        const verificationData = await db.pool.query(verify);
        if((JSON.stringify(verificationData.length))>0)
        {
        const query = "update academic_year set session = '"+req.body.session+"', class = '"+req.body.class+"'  where academic_year.id = '"+req.body.id+"' ";
        await db.pool.query(query);
        res.send('updated');
        }
        else
        {
            res.send("invalid input");
        }
    } catch(e) {
        console.log(e);
        res.send(e);
    }
})

app.post('/createdata',async(req,res) => {
    try {
        const verify = "select id from user where token = '"+req.body.token+"'";
        const verificationData = await db.pool.query(verify);
        if((JSON.stringify(verificationData.length))>0)
        {
        const query = "insert into data (id, name, class, section) select student.id, name, class, section from student, section where student.id = section.id";
        await db.pool.query(query);
        res.send('Data inserted');
        }
        else
        {
            res.send("invalid input");
        }
    } catch(e) {
        console.log(e);
        res.send(e);
    }
})

app.get('/getdata',async(req,res) => {
    try {
        const verify = "select id from user where token = '"+req.body.token+"'";
        const verificationData = await db.pool.query(verify);
        if((JSON.stringify(verificationData.length))>0)
        {
        const result = await db.pool.query('select * from data;');
        res.send(result);
        }
        else{
            res.send("invalid input");
        }
    } catch(e) {
        console.log(e);
        res.send(e);
    }
})

app.post('/createcombined',async(req,res) => {
    try {
        const verify = "select id from user where token = '"+req.body.token+"'";
        const verificationData = await db.pool.query(verify);
        if((JSON.stringify(verificationData.length))>0)
        {
        const query = "insert into combined (id, name, class, section, session) select data.id, name, data.class, section, session from data, academic_year where data.id = academic_year.id";
        await db.pool.query(query);
        res.send('Data inserted');
        }
        else
        {
            res.send("invalid key");
        }
    } catch(e) {
        console.log(e);
        res.send(e);
    }
})

app.get('/getcombined',async(req,res) => {
    try {
        const verify = "select id from user where token = '"+req.body.token+"'";
        const verificationData = await db.pool.query(verify);
        if((JSON.stringify(verificationData.length))>0)
        {
        const query = "select * from combined where id = '"+req.body.id+"' and class = '"+req.body.class+"'";
        const result = await db.pool.query(query);
        res.send(result);
        }
        else{
            res.send("invalid input");
        }
    } catch(e) {
        console.log(e);
        res.send(e);
    }
})

/*app.post('/login', (req, res) => {
    // Authenticate user and generate a token
    const user = {
      id: 'user123',
      username: 'exampleuser',
      // Include any additional user data
    };
    const token = generateToken(user);
  res.json({ token });
});

app.get('/protected', verifyToken, (req, res) => {
    // Access the authenticated user's ID through req.userId
    res.json({ message: 'Protected route accessed successfully', userId: req.userId });
  });
  */
  import 'dotenv/config';

  app.post("/register", async (req, res) => {

    try 
    {
        console.log('========',process.env.TOKEN_KEY);

        // Create token
        
        const token = jwt.sign(
            { password : req.body.password },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h",
            }
            );
            console.log(token);
            // save user token
            // user.token = token;
            const query = ` INSERT INTO user (id, name, email, password, token) values ('${req.body.id}','${req.body.name}', '${req.body.email}','${req.body.password}','${token}'); `
        await db.pool.query(query); 
        res.send('Data inserted');
    
    
    //   if (user) 
    //   {
    //     return res.status(409).send("User Already Exist. Please Login");
    //   }
  
      //Encrypt user password
    //   encryptedPassword = await bcrypt.hash(password, 10);
  
    //   // Create user in our database
    //   const student = await student.create
    //   (
    //     {
    //     name,
    //     email: email.toLowerCase(), // sanitize: convert email to lowercase
    //     password: encryptedPassword,
    //   });
  
    //   // return new user
    //   res.status(201).json(user);
    }
     catch (err) 
    {
      console.log(err);
    }
    // Our register logic ends here
  });
app.get("/getUser",async(req,res) => {
    try {
        const query = "select * from user where user.id = '"+req.body.id+"'";
        const result = await db.pool.query(query);
        res.send(result);
    } catch(e) {
        console.log(e);
        res.send(e);
    }
})
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
