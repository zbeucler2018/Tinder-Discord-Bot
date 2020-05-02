

var name1;
var bio;
var lastMessage;
var currentLikeNum;

var authToken = 'Tinder_Auth_Token';

var endPoint = ['matches?count=60&is_tinder_u=false&locale=en&message=1','fast-match/count']

function getTinderInfo(authToken, type, type2, endPoint){

    const fetch = require("node-fetch");
    fetch('https://api.gotinder.com/v2/' + endPoint , {

        headers: 
        { //'Postman-Token': 'bff5cc2a-7670-49a1-9ee0-8cf7aa7ee68a',
        'cache-control': 'no-cache',
        'User-agent': 'Tinder/7.5.3 (iPhone; iOS 10.3.2; Scale/2.00)',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Auth-Token': authToken }
    })

    .then(res => res.json())

    .then(json => getSpecificInfo(json, type, type2))

    .catch(err => console.log(err))    

    function getSpecificInfo(json, type, type2){

      if (type2 == 1){
        name1 = name1 = json.data.matches[0].person.name;
        bio = json.data.matches[0].person.bio;
        lastMessage = json.data.matches[0].messages[0].message;
        console.log(name1);
        console.log(bio);
        console.log(lastMessage);
  
        if (type == 'n') return name1;
        else if (type == 'b') return bio;
        else if (type == 'm') return lastMessage;
      }
      else if (type2 == 2){
        currentLikeNum = data.count;
        console.log(currentLikeNum);
        return currentLikeNum;
      }


    }
}

getTinderInfo(authToken, null, 2, endPoint[1]);








// https://api.gotinder.com/v2/matches?count=60&is_tinder_u=false&locale=en&message=1'
// https://api.gotinder.com/v2/fast-match/count

















//942b723d-11a9-46a7-8762-154389811d92
/*
var request = require("request");

var options = { method: 'GET',
  url: 'https://api.gotinder.com/v2/matches',
  qs: { count: '60', is_tinder_u: 'false', locale: 'en', message: '1' },
  headers: 
   { //'Postman-Token': 'bff5cc2a-7670-49a1-9ee0-8cf7aa7ee68a',
     'cache-control': 'no-cache',
     'User-agent': 'Tinder/7.5.3 (iPhone; iOS 10.3.2; Scale/2.00)',
     'Content-Type': 'application/x-www-form-urlencoded',
     'X-Auth-Token': '942b723d-11a9-46a7-8762-154389811d92' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

let json = JSON.parse(body);
var name = json.data.matches[0].person.name;
var bio = json.data.matches[0].person.bio;
var lastMessage = json.data.matches[0].messages[0].message;
console.log(json.data.matches[0].person.name);

});

*/


// get last messgae
// console.log(json.data.matches[0].messages[0].message);

// get bio
// console.log(json.data.matches[0].person.bio);

// get name
// console.log(json.data.matches[0].person.name);
