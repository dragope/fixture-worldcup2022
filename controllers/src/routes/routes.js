const router = require('express').Router();
const cors = require('cors')
const { corsOptions } = require('../config/cors');
const MatchPlayed = require('../models/MatchPlayed');
const Round16Played = require('../models/Round16Played')
const Round16 = require('../models/Round16')
const Quarterfinals = require('../models/Quarterfinals')
const QuarterfinalsPlayed = require('../models/QuarterfinalsPlayed')

router.get('/api/get-matches-played/', cors(corsOptions), async(req, res)=>{
    const Matches = await MatchPlayed.find().lean()
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
    res.send({groupStats})
})

router.post('/api/set-round16/', cors(corsOptions), async (req, res)=>{
    const { first, second } = req.body;
    const match_1 = await Round16.find({ local: first.qualified })
    const match_2 = await Round16.find({ visitor: second.qualified })
    const match_1_played = await Round16Played.find({ matchid: match_1[0].matchid })
    const match_2_played = await Round16Played.find({ matchid: match_2[0].matchid })

    if(first.countryid !== 0 && second.countryid !== 0){
        // First
        if(match_1_played[0]){
            await Round16Played.findOneAndUpdate({ matchid: match_1[0].matchid }, { local: first.countryid, countryLocal: first.country })
        } else{
            const newRound16_1 = new Round16Played({ 
                stage: "round of 16",
                matchid: match_1[0].matchid,
                local: first.countryid.toString(), 
                visitor: match_1[0].visitor,
                countryLocal: first.country,
                countryVisitor: match_1[0].visitor.toString(),
                goalsLocal: 0, 
                goalsVisitor: 0, 
                result: "tie", 
                stadium: match_1[0].stadium, 
                date: match_1[0].date
            })
            
            await newRound16_1.save()
        }
        //Second
        if(match_2_played[0]){
            await Round16Played.findOneAndUpdate({ matchid: match_2[0].matchid }, { visitor: second.countryid, countryVisitor: second.country })
        } else{
            const newRound16_2 = new Round16Played({ 
                stage: "round of 16",
                matchid: match_2[0].matchid, 
                local: match_2[0].local, 
                visitor: second.countryid.toString(),
                countryLocal: match_2[0].local.toString(),
                countryVisitor: second.country,
                goalsLocal: 0, 
                goalsVisitor: 0, 
                result: "tie", 
                stadium: match_2[0].stadium, 
                date: match_2[0].date
            })
            await newRound16_2.save()
        }
    }

    const newRound16 = await Round16Played.find().lean()

    res.send({ message: `Updated match ${match_1[0].matchid} and  ${match_2[0].matchid}`, updatedRound: newRound16 })
})

router.post('/api/final-stages/', cors(corsOptions), async (req, res)=>{
    const { matchid, stage, local, visitor, countryLocal, countryVisitor, goalsLocal, goalsVisitor, stadium, date } = req.body
    const prevMatch = await Round16Played.find({ matchid: matchid }).lean()
    let result = ""
    if(goalsLocal > goalsVisitor){
        result = "local"
    } else {
        result = "visitor"
    }
    if(prevMatch){
        await Round16Played.findOneAndUpdate({ matchid: matchid }, { goalsLocal: goalsLocal, goalsVisitor: goalsVisitor, result: result})
    } else {
        const newMatch = new Round16Played({
            stage: stage,
            matchid: matchid,
            local: local,
            visitor: visitor,
            countryLocal: countryLocal,
            countryVisitor: countryVisitor,
            goalsLocal: goalsLocal,
            goalsVisitor: goalsVisitor,
            result: result,
            stadium: stadium,
            date: date
        })
        await newMatch.save()
    }

    //Encuentra el encuentro en la BD de Quarterfinals
    const prevMatchQF= await Quarterfinals.find({ local: matchid } || { visitor: matchid}).lean()
    //ID que sirve para buscar a ver si hay ya QuarterfinalsPlayed
    console.log(prevMatchQF[0].matchid)

    //Queda, primero, hacer búsqueda en QFP a ver si ya está el partido y hay que actualizarlo. Si no hay que actualizarlo, hay que guardar uno nuevo

    



})

module.exports = router