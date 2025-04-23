const express = require("express")
const { Client } = require("pg")
const cors = require("cors")
const app = express()
const twilio = require('twilio')
app.use(express.json())
app.use(cors())
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
require('dotenv').config()


const accoundSid = process.env.ACCOUNTSID
const authToken = process.env.AUTHTOKEN
const client = new twilio(accoundSid, authToken)

const twilioNumber = "+19404778897"

let link = "https://spinz-full-stack.vercel.app/tracking"

const con = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: process.env.DATAPASS,
  database: process.env.DATABASE,
  // connectionString: process.env.DATABASE_URL,
  // ssl: { rejectUnauthorized: false } // required for Railway

})

con.connect().then(() => {
  console.log("Connected to Database")
}).catch(() => {
  console.log("Not connected to Database")
})

app.post("/user", (req, res) => {
  let name = req.body.user
  let mobile = req.body.mobile
  let upiid = req.body.upiId
  let image = req.body.image
  let referenceid = req.body.spin
  let city = req.body.city
  let region = req.body.region

  // const insert_querry = "INSERT INTO users(name,mobile,referenceid,upiid,city,region image) VALUES($1, $2, $3, $4,$5,$6,$7)";
  const insert_querry = "INSERT INTO users(name, mobile, referenceid, upiid, city, region, image) VALUES($1, $2, $3, $4, $5, $6, $7)";
  con.query(insert_querry, [name, mobile, referenceid, upiid, city, region, image], (err, result) => {
    if (err) {
      console.log("Error:", err);
      res.send("Error in Sending Data")
    } else {
      console.log("Data sent to Database Successfully");
      res.send("Data sent to Database successfully", result);
    }
  });
})

app.get("/fetchData", (req, res) => {
  const fetchQuery = "SELECT * from users where status = 'Pending' ";
  con.query(fetchQuery, (err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Failed to fetch data" });
    } else {
      res.json(result.rows); // ✅ IF using PostgreSQL
      // res.json(result);     // ✅ IF using MySQL
    }
  });
});


app.get("/payment",(req,res)=>{
  const payment = "SELECT * from users where status = 'Approved'";
  con.query(payment,(err,result)=>{
    if(err)
    {
      console.log("Error in Fecting Data")
      res.send("There is an Error")
    }
    else
    {
      res.send(result.rows)
    }
  })
})

app.get("/total", (req, res) => {
  const number = "SELECT COUNT(*)  FROM users";

  con.query(number, (err, result) => {
    if (err) {
      res.status(500).send("Error");
    } else {
      res.json(result.rows[0].count); // ✅ FIXED
    }
  });
});




app.get("/bord", (req, res) => {
  const dash = "select * from users"
  con.query(dash, (err, result) => {
    if (err) {
      res.send("Error")
    }
    else {
      res.send(result.rows)

    }
  })
})

app.get("/fetchapprove", (req, res) => {
  const fetchQuery = "SELECT * FROM users where status !='Pending'"
  con.query(fetchQuery, (err, result) => {
    if (err) {
      res.send("Error in Sending data")
    }
    res.send(result.rows)
  })
})


app.get("/pending", (req, res) => {
  const pendingreq = "SELECT count(*) FROM users WHERE status != 'Approved'"
  con.query(pendingreq, (err, snt) => {
    if (err) {
      res.send("Error")
    }
    else {
      res.send(snt.rows[0].count)
    }
  })
})



app.put("/approveRequest", (req, res) => {
  const id = req.body.id;

  const query = `
    UPDATE "users"
    SET status = 'Approved'
    WHERE id = $1
  `;

  con.query(query, [id], (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ error: "Update failed" });
    }

    res.json({ message: "User approved successfully" });
  });
});

app.put("/decline",(req,res)=>{
  const id = req.body.id;
  console.log(id)

  const query = `
  UPDATE "users"
  SET status ='Declined'
  WHERE id=$1`;

  con.query(query, [id], (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ error: "Update failed" });
    }

    res.json({ message: "User approved successfully" });
  });
})

app.get("/approved", (req, res) => {
  const approve = "SELECT count(*)from users WHERE status !='Pending'"

  con.query(approve, (err, response) => {
    if (err) {
      res.send("Error")
    }
    else {
      res.send(response.rows[0].count)
    }
  })
})

app.post("/con", async (req, res) => {
  const refid = req.body.spin
  const phone = req.body.mobile
  try {
    const message = await client.messages.create({
      body: `Your Request has been Submitted to Spinz.co Admin. This is Your Reference id ${refid}. For any further quereis or status tracking click the link given below ${link} `,
      from: "+19404778897",
      to: `+91${phone}`
    })
    res.send("Confirmation Message Sent Successfully")
  }
  catch (error) {
    console.log("Error")
    res.send("Error in sending message", error)
  }


})


app.post("/download", async (req, res) => {
  try {
    // Fetching ALL data from users table
    const query = `select * from users`;
    const result = await con.query(query);

    const data = result.rows;

    if (data.length === 0) {
      return res.status(404).send("No data found");
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "All Users");

    const filePath = path.join(__dirname, "all_users.xlsx");
    XLSX.writeFile(workbook, filePath);

    res.download(filePath, "all_users.xlsx", (err) => {
      if (err) {
        console.error("Download Error:", err);
        return res.status(500).send("Download failed");
      }

      fs.unlinkSync(filePath); // Delete file after download
    });
  } catch (err) {
    console.error("Error generating Excel:", err);
    res.status(500).send("Internal Server Error");
  }
});




















app.post("/otp", async (req, res) => {
  const phone = req.body.mobile;
  console.log(phone)

  if (!phone) {
    console.log("No phone number received");
    return res.status(400).json({ error: "Phone number is required" });
  }

  console.log("Received Number:", phone);
  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    const message = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: "+19404778897",
      to: `+91${phone}`
    });

    console.log("OTP sent successfully. SID:", message.sid);
    res.status(200).json({ otp: otp, sid: message.sid, message: "OTP sent successfully" });

  } catch (err) {
    console.log("Error sending OTP:", err.message);
    res.status(500).json({ error: "Failed to send OTP", details: err.message });
  }
});

app.listen(5000, function () {
  console.log("Server Started....")
})