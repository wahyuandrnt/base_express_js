var express = require('express');
var router = express.Router();


// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '5068424748:AAFyKtAPg48n08bgirZZeCHkg-bN9GJpl7o';
const bot = new TelegramBot(token, {polling: true});


let global_msg_id;
// Main Menu Bot
bot.onText(/\/start/, (msg) => {
    global_msg_id = msg.chat.id;
    bot.sendMessage(
        global_msg_id,
        `Hi ${msg.chat.first_name}, welcome to the club...\n
        click /show_url`
    );
});

bot.onText(/\/show_url/, (msg) => {
    global_msg_id = msg.chat.id;
    bot.sendMessage(
        global_msg_id,
        `
            https://esp-telebot.herokuapp.com/api/sensor/123/65/78 \n
            https://esp-telebot.herokuapp.com/api/test/cobacoba
        `
    );
});

/* mencetak tulisan saja */
bot.on('message', (msg) => {
  console.log(msg);
});


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json({
    "status": 202,
    "messgae": "Success"
  });
});

// https://esp-telebot.herokuapp.com/api/sensor/123/65/78
router.get('/sensor/:sensor1/:sensor2/:sensor3/:sensor4', (req, res, next) => {
  try {
      bot.sendMessage(
            global_msg_id, //msg.id
            `Nilai sensor:: ${req.params.sensor1}, ${req.params.sensor2}, ${req.params.sensor3},${req.params.sensor4}`
     );
      res.json({
        "status": 202,
        "messgae": "Success",
        "data": {
          "sensor_dry_end_DS": req.params.sensor1,
          "sensor_dry_end_OS": req.params.sensor2,
          "sensor_wet_end_DS": req.params.sensor3,
          "sensor_wet_end_OS": req.params.sensor4,
        }
      });
  } catch (err) {
      next(err);
  }
});

// https://esp-telebot.herokuapp.com/api/test/cobacoba
router.get('/test/:key', function(req, res, next){
    bot.sendMessage(
            global_msg_id, //msg.id
            `${req.params.key}`
    );
    res.json(req.params.key);
});


module.exports = router;
