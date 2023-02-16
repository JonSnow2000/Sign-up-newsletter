const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const Fname=req.body.fname;
    const Lname=req.body.lname;
    const email=req.body.email;
    const data={
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME:Fname,
                    LNAME:Lname,
                }
            }
        ]
    }

    var jsonData= JSON.stringify(data);
    const url="https://us11.api.mailchimp.com/3.0/lists/dd57b47673";
    const options ={
        method: "POST",
        auth: "praharsh:33d4a2e546bf7e7d894b12a5ffffebe8-us11"
    }
    const request=https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/faliure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();
});

app.post("/faliure",function(req,res){
    res.redirect("/");
})
app.listen(3000,function(){
    console.log("The server is running on port 3000");
});
// API key
// 33d4a2e546bf7e7d894b12a5ffffebe8-us11

// list id 
// dd57b47673