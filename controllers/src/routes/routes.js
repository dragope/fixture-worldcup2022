const router = require('express').Router();
const cors = require('cors')
const { corsOptions } = require('../config/cors');
const MatchPlayed = require('../models/MatchPlayed');

router.get('/api/get-matches-played/', cors(corsOptions), async(req, res)=>{
    const Matches = await MatchPlayed.find().lean()
    console.log(Matches)
    res.send(Matches)
})

router.post('/api/group-match/', cors(corsOptions), async (req, res)=>{
    const { group, matchid, local, visitor, countryLocal, countryVisitor, goalsLocal, goalsVisitor } = req.body;
    let result = ""
    let pointsLocal = 0
    let pointsVisitor = 0
    if(goalsLocal > goalsVisitor){
        result = "local"
        pointsLocal = 3
    } else if(goalsLocal === goalsVisitor){
        result = "tie"
        pointsLocal = 1
        pointsVisitor = 1
    } else {
        result = "visitor"
        pointsVisitor = 3
    }
    const newMatch = new MatchPlayed({ group, matchid, local, visitor, countryLocal, countryVisitor, goalsLocal, goalsVisitor, result, pointsLocal: pointsLocal, pointsVisitor: pointsVisitor })
    const prevMatch = await MatchPlayed.find({ matchid: matchid })
    if(prevMatch.length > 0){
        await MatchPlayed.findOneAndUpdate({ matchid: matchid }, { goalsLocal: goalsLocal, goalsVisitor: goalsVisitor, result: result, pointsLocal: pointsLocal, pointsVisitor: pointsVisitor })
        console.log('Modified Match')
    } else {
        await newMatch.save()
        console.log('New Match')
    }
    res.send({message: `Match ${countryLocal} vs. ${countryVisitor} added`, error: "false"})
})

router.post('/api/get-group/', cors(corsOptions), async (req, res)=>{
    const { group, countries } = req.body
    const groupMatches = await MatchPlayed.find({ group: group }).lean();
    const groupStats = []
    for (let i = 0; i < countries.length; i++){
        groupStats.push({country: countries[i], countryid: 0, played: 0, points: 0 ,won: 0, tied: 0, lost: 0, gf: 0, ga: 0})
    }
    for(let i = 0; i < groupMatches.length; i++){
        if(groupMatches[i].result === "tie"){
            let indexLocal = groupStats.findIndex(x => x.country == groupMatches[i].countryLocal)
            let indexVisitor = groupStats.findIndex(x => x.country == groupMatches[i].countryVisitor)
            //Countryid
            groupStats[indexLocal].countryid = groupMatches[i].local
            groupStats[indexVisitor].countryid = groupMatches[i].visitor
            // Jugados
            groupStats[indexLocal].played = groupStats[indexLocal].played + 1
            groupStats[indexVisitor].played = groupStats[indexVisitor].played + 1
            //Puntos
            groupStats[indexLocal].points = groupStats[indexLocal].points + 1
            groupStats[indexVisitor].points = groupStats[indexVisitor].points + 1
            //Empates
            groupStats[indexLocal].tied = groupStats[indexLocal].tied + 1
            groupStats[indexVisitor].tied = groupStats[indexVisitor].tied + 1
            //Goles a favor
            groupStats[indexLocal].gf = groupStats[indexLocal].gf + groupMatches[i].goalsLocal
            groupStats[indexVisitor].gf = groupStats[indexVisitor].gf + groupMatches[i].goalsVisitor
            //Goles en contra
            groupStats[indexLocal].ga = groupStats[indexLocal].ga + groupMatches[i].goalsVisitor
            groupStats[indexVisitor].ga = groupStats[indexVisitor].ga + groupMatches[i].goalsLocal
        } else if(groupMatches[i].result === "local"){
            let indexLocal = groupStats.findIndex(x => x.country == groupMatches[i].countryLocal)
            let indexVisitor = groupStats.findIndex(x => x.country == groupMatches[i].countryVisitor)
            //Countryid
            groupStats[indexLocal].countryid = groupMatches[i].local
            groupStats[indexVisitor].countryid = groupMatches[i].visitor
            //Jugados
            groupStats[indexLocal].played = groupStats[indexLocal].played + 1
            groupStats[indexVisitor].played = groupStats[indexVisitor].played + 1
            //Puntos
            groupStats[indexLocal].points = groupStats[indexLocal].points + 3
            //Ganados / Perdidos
            groupStats[indexLocal].won = groupStats[indexLocal].won + 1
            groupStats[indexVisitor].lost = groupStats[indexVisitor].lost + 1
            //Goles a favor
            groupStats[indexLocal].gf = groupStats[indexLocal].gf + groupMatches[i].goalsLocal
            groupStats[indexVisitor].gf = groupStats[indexVisitor].gf + groupMatches[i].goalsVisitor
            //Goles en contra
            groupStats[indexLocal].ga = groupStats[indexLocal].ga + groupMatches[i].goalsVisitor
            groupStats[indexVisitor].ga = groupStats[indexVisitor].ga + groupMatches[i].goalsLocal
        } else {
            let indexLocal = groupStats.findIndex(x => x.country == groupMatches[i].countryLocal)
            let indexVisitor = groupStats.findIndex(x => x.country == groupMatches[i].countryVisitor)
            //Countryid
            groupStats[indexLocal].countryid = groupMatches[i].local
            groupStats[indexVisitor].countryid = groupMatches[i].visitor
            // Jugados
            groupStats[indexLocal].played = groupStats[indexLocal].played + 1
            groupStats[indexVisitor].played = groupStats[indexVisitor].played + 1
            //Puntos
            groupStats[indexVisitor].points = groupStats[indexVisitor].points + 3
            //Ganados / Perdidos
            groupStats[indexLocal].lost = groupStats[indexLocal].lost + 1
            groupStats[indexVisitor].won = groupStats[indexVisitor].won + 1
            //Goles a favor
            groupStats[indexLocal].gf = groupStats[indexLocal].gf + groupMatches[i].goalsLocal
            groupStats[indexVisitor].gf = groupStats[indexVisitor].gf + groupMatches[i].goalsVisitor
            //Goles en contra
            groupStats[indexLocal].ga = groupStats[indexLocal].ga + groupMatches[i].goalsVisitor
            groupStats[indexVisitor].ga = groupStats[indexVisitor].ga + groupMatches[i].goalsLocal
        }
    }
    console.log("Get group " + group)
    res.send({groupStats})
})

module.exports = router