const express = require('express');

const router = express.Router();
const players =[

        {
            "name": "manish",
            "dob": "1/1/1995",
            "gender": "male",
            "city": "jalandhar",
            "sports": [
                "swimming"
            ]
        },
        {
            "name": "gopal",
            "dob": "1/09/1995",
            "gender": "male",
            "city": "delhi",
            "sports": [
                "soccer"
            ]
        },
        {
            "name": "lokesh",
            "dob": "1/1/1990",
            "gender": "male",
            "city": "mumbai",
            "sports": [
                "soccer"
            ]
        },
 
]


router.post('/test-post', function (req, res) {
const newPlayer = req.body.player;
for( i=0;i<players.length;i++){
    if(newPlayer.name!= players[i].name){
        players.push(newPlayer)
    }

}
console.log(players)
    res.send({data:players, status:true})
});



module.exports = router;
// adding this comment for no reason