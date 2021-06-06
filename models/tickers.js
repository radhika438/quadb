const mongoose = require('mongoose');
const TickerSchema = new mongoose.Schema({
  id:{
    type: Number,
    require:true,
    unique:true
  },
  name: {
    type: String,
    required: true,
    unique:true
  },
  last: {    //float
    type: String,
    required: true
  },
  buy: {    //float
    type: String,
    required: true
  },
  sell: {    //float
    type: String,
    required: true
  },
  volume: {    //float
    type: String,
    required: true
  },
  base_unit: {    //float
    type: String,
    required: true
  }
});
// server looks for users collection in database if you write 'User'
module.exports =mongoose.model('Ticker', TickerSchema);