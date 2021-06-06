const express = require('express');
const fetch = require("node-fetch");
const expressLayouts = require('express-ejs-layouts');
const app = express();
var mongoose=require('mongoose');
let tickerModel=require('./models/tickers');
mongoose
  .connect(
    'mongodb://localhost/quadb',
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
app.get('/fetch',(req,res)=>{
     fetch('https://api.wazirx.com/api/v2/tickers')
      .then((res) => res.json())
      .then((data) => {
          var count =0;
          
          for(var prop in data)
          {
            count++;
            console.log(prop);
            console.log(data[prop].name,data[prop].last,data[prop].buy);
            let record=new tickerModel({
               id: count,
               name:data[prop].name,
               last:data[prop].last,
               buy:data[prop].buy,
               sell:data[prop].sell,
               volume:data[prop].volume,
               base_unit:data[prop].base_unit
            });

            record.save()
            .then(doc=>{
                
                console.log(doc);
            })
            .then(err=>
            {
                console.log(err);
            });
            if(count==10)
            break;
          }
          res.redirect('/');
      });
})

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
 
  tickerModel.find({}).sort('id').exec(function(err, details) { if(err)
    console.log("hello");
    else
      res.render('dashboard',{
        details:details
      }) 
    });
    
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));