const router = require('express').Router();
const cors = require('cors')
const { corsOptions } = require('../config/cors');
const MatchPlayed = require('../models/MatchPlayed');
const Round16Played = require('../models/Round16Played')
const Round16 = require('../models/Round16')
const Quarterfinals = require('../models/Quarterfinals')
const QuarterfinalsPlayed = require('../models/QuarterfinalsPlayed')
const Semifinals = require('../models/Semifinals')
const SemifinalsPlayed = require('../models/SemifinalsPlayed')
const Final = require('../models/Final')
const FinalPlayed = require('../models/FinalPlayed')
const ThirdPlace = require('../models/ThirdPlace')
const ThirdPlacePlayed = require('../models/ThirdPlacePlayed');
const { default: mongoose } = require('mongoose');

//Obtener todos los partidos jugados para que se carguen cuando se inicia la página
router.get('/api/get-matches-played/', cors(corsOptions), async(req, res)=>{
    const GroupMatches = await MatchPlayed.find().lean()
    const Round16Matches = await Round16Played.find().lean()
    const QuarterfinalsMatches = await QuarterfinalsPlayed.find().lean()
    const Matches = GroupMatches.concat(Round16Matches, QuarterfinalsMatches)
    res.send(Matches)
})

//Actualizar partidos de grupo
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

//Obtener las posiciones del grupo
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

//Definir los equipos que clasifican a Octavos de acuerdo a la posición en la tabla de los grupos
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

//Actaulizar resultados de partidos de Octavos y a la vez el clasificado al correspondiente partido de Cuartos
router.post('/api/round-16/', cors(corsOptions), async (req, res)=>{
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
    const prevMatchQF = await Quarterfinals.find({ $or: [{ local: matchid }, { visitor: matchid }]}).lean()
    const prevMatchQF_P = await QuarterfinalsPlayed.find({ $or: [{ local: matchid }, { visitor: matchid }, { countryLocal: countryLocal }, { countryVisitor: countryVisitor }, { countryVisitor: countryLocal }, { countryLocal: countryVisitor } ]}).lean()
    if(prevMatchQF_P[0]){
        if(matchid === prevMatchQF[0].local){
            await QuarterfinalsPlayed.findOneAndUpdate({ _id: prevMatchQF_P[0]._id }, {
                stage: prevMatchQF_P[0].stage,
                matchid: prevMatchQF_P[0].matchid,
                local: result === 'local' ? local : visitor,
                visitor: prevMatchQF_P[0].visitor,
                countryLocal: result === 'local' ? countryLocal : countryVisitor,
                countryVisitor: prevMatchQF_P[0].countryVisitor,
                goalsLocal: 0,
                goalsVisitor: 0,
                result: "tie",
                stadium: prevMatchQF_P[0].stadium,
                date: prevMatchQF_P[0].date,
            })
        } else if(matchid == prevMatchQF[0].visitor){
            await QuarterfinalsPlayed.findOneAndUpdate({ _id: prevMatchQF_P[0]._id }, {
                stage: prevMatchQF_P[0].stage,
                matchid: prevMatchQF_P[0].matchid,
                local: prevMatchQF_P[0].local,
                visitor: result === 'local' ? local : visitor,
                countryLocal: prevMatchQF_P[0].countryLocal,
                countryVisitor: result === 'local' ? countryLocal : countryVisitor,
                goalsLocal: 0,
                goalsVisitor: 0,
                result: "tie",
                stadium: prevMatchQF_P[0].stadium,
                date: prevMatchQF_P[0].date,
            })
        }
    } else {
        if(matchid === prevMatchQF[0].local){
            const newQF = new QuarterfinalsPlayed({
                stage: prevMatchQF[0].stage,
                matchid: prevMatchQF[0].matchid,
                local: result === 'local' ? local : visitor,
                visitor: prevMatchQF[0].visitor,
                countryLocal: result === 'local' ? countryLocal : countryVisitor,
                countryVisitor: prevMatchQF[0].visitor.toString(),
                goalsLocal: 0,
                goalsVisitor: 0,
                result: "tie",
                stadium: prevMatchQF[0].stadium,
                date: prevMatchQF[0].date,
            })
            await newQF.save()
        } else if(matchid === prevMatchQF[0].visitor){
            const newQF = new QuarterfinalsPlayed({
                stage: prevMatchQF[0].stage,
                matchid: prevMatchQF[0].matchid,
                local: prevMatchQF[0].local,
                visitor: result === 'local' ? local : visitor,
                countryLocal: prevMatchQF[0].local.toString(),
                countryVisitor: result === 'local' ? countryLocal : countryVisitor,
                goalsLocal: 0,
                goalsVisitor: 0,
                result: "tie",
                stadium: prevMatchQF[0].stadium,
                date: prevMatchQF[0].date,
            })
            await newQF.save()
        }
    }
res.send({ message: `Result updated correctly: ${countryLocal} ${goalsLocal} vs ${countryVisitor} ${goalsVisitor}, in ${stage}, match ${matchid}`})
})

//Obtener los cruces de Cuartos de final
router.get('/api/get-quarterfinals/', cors(corsOptions), async (req, res)=> {
    const quarterfinals = await QuarterfinalsPlayed.find().lean()
    res.send(quarterfinals)
})

//Definir los resultados de cuartos y escribir los cruces de Semis
router.post('/api/set-quarterfinals/', cors(corsOptions), async(req, res)=>{
    const { matchid, stage, local, visitor, countryLocal, countryVisitor, goalsLocal, goalsVisitor, stadium, date } = req.body
    // console.log(req.body)
    let result = ""
    if(goalsLocal > goalsVisitor){
        result = "local"
    } else {
        result = "visitor"
    }
    const prevMatchSF = await Semifinals.find({ $or: [{local: matchid}, {visitor: matchid}] })
    if(prevMatchSF){
        await QuarterfinalsPlayed.findOneAndUpdate({ matchid: matchid }, {
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
    }

    const prevMatchSF_P = await SemifinalsPlayed.find({ $or: [{ local: matchid }, { visitor: matchid }, { countryLocal: countryLocal }, { countryVisitor: countryVisitor }, { countryVisitor: countryLocal }, { countryLocal: countryVisitor } ]}).lean()
    

    if(prevMatchSF_P[0]){
        if(matchid === prevMatchSF[0].local){
            await SemifinalsPlayed.findOneAndUpdate({ _id: prevMatchSF_P[0]._id }, {
                stage: prevMatchSF_P[0].stage,
                matchid: prevMatchSF_P[0].matchid,
                local: result === 'local' ? local : visitor,
                visitor: prevMatchSF_P[0].visitor,
                countryLocal: result === 'local' ? countryLocal : countryVisitor,
                countryVisitor: prevMatchSF_P[0].countryVisitor,
                goalsLocal: 0,
                goalsVisitor: 0,
                result: "tie",
                stadium: prevMatchSF_P[0].stadium,
                date: prevMatchSF_P[0].date,
            })
        } else if(matchid == prevMatchSF[0].visitor){
            await SemifinalsPlayed.findOneAndUpdate({ _id: prevMatchSF_P[0]._id }, {
                stage: prevMatchSF_P[0].stage,
                matchid: prevMatchSF_P[0].matchid,
                local: prevMatchSF_P[0].local,
                visitor: result === 'local' ? local : visitor,
                countryLocal: prevMatchSF_P[0].countryLocal,
                countryVisitor: result === 'local' ? countryLocal : countryVisitor,
                goalsLocal: 0,
                goalsVisitor: 0,
                result: "tie",
                stadium: prevMatchSF_P[0].stadium,
                date: prevMatchSF_P[0].date,
            })
        }
    } else {
        if(matchid === prevMatchSF[0].local){
            const newSF = new SemifinalsPlayed({
                stage: prevMatchSF[0].stage,
                matchid: prevMatchSF[0].matchid,
                local: result === 'local' ? local : visitor,
                visitor: prevMatchSF[0].visitor,
                countryLocal: result === 'local' ? countryLocal : countryVisitor,
                countryVisitor: prevMatchSF[0].visitor.toString(),
                goalsLocal: 0,
                goalsVisitor: 0,
                result: "tie",
                stadium: prevMatchSF[0].stadium,
                date: prevMatchSF[0].date,
            })
            await newSF.save()
        } else if(matchid === prevMatchSF[0].visitor){
            const newSF = new SemifinalsPlayed({
                stage: prevMatchSF[0].stage,
                matchid: prevMatchSF[0].matchid,
                local: prevMatchSF[0].local,
                visitor: result === 'local' ? local : visitor,
                countryLocal: prevMatchSF[0].local.toString(),
                countryVisitor: result === 'local' ? countryLocal : countryVisitor,
                goalsLocal: 0,
                goalsVisitor: 0,
                result: "tie",
                stadium: prevMatchSF[0].stadium,
                date: prevMatchSF[0].date,
            })
            await newSF.save()
        }
    }
res.send({ message: `Result updated correctly: ${countryLocal} ${goalsLocal} vs ${countryVisitor} ${goalsVisitor}, in ${stage}, match ${matchid}`})
})

//Obtener los cruces de semifinales
router.get('/api/get-semifinals/', cors(corsOptions), async (req, res)=> {
    const semifinals = await SemifinalsPlayed.find().lean()
    res.send(semifinals)
})

//Setear los resultados de semifinales y definir los cruces de Final y Tercer Puesto
router.post('/api/set-semifinals/', cors(corsOptions), async(req, res)=>{
    const { matchid, stage, local, visitor, countryLocal, countryVisitor, goalsLocal, goalsVisitor, stadium, date } = req.body
    
    let result = ""
    if(goalsLocal > goalsVisitor){
        result = "local"
    } else {
        result = "visitor"
    }

    const prevMatchF = await Final.find({ $or: [{local: matchid}, {visitor: matchid}] }).lean()
    if(prevMatchF){
        await SemifinalsPlayed.findOneAndUpdate({ matchid: matchid }, {
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
    }

    const prevMatchF_P = await FinalPlayed.find({ $or: [{ local: matchid }, { visitor: matchid }, { countryLocal: countryLocal }, { countryVisitor: countryVisitor }, { countryVisitor: countryLocal }, { countryLocal: countryVisitor } ]}).lean()

    console.log(prevMatchF[0])
    
    if(prevMatchF_P[0]){
        if(matchid === prevMatchF[0].local){
            await FinalPlayed.findOneAndUpdate({ _id: prevMatchF_P[0]._id }, {
                stage: prevMatchF_P[0].stage,
                matchid: prevMatchF_P[0].matchid,
                local: result === 'local' ? local : visitor,
                visitor: prevMatchF_P[0].visitor,
                countryLocal: result === 'local' ? countryLocal : countryVisitor,
                countryVisitor: prevMatchF_P[0].countryVisitor,
                goalsLocal: 0,
                goalsVisitor: 0,
                result: "tie",
                stadium: prevMatchF_P[0].stadium,
                date: prevMatchF_P[0].date,
            })
        } else if(matchid === prevMatchF[0].visitor){
            await FinalPlayed.findOneAndUpdate({ _id: prevMatchF_P[0]._id }, {
                stage: prevMatchF_P[0].stage,
                matchid: prevMatchF_P[0].matchid,
                local: prevMatchF_P[0].local,
                visitor: result === 'local' ? local : visitor,
                countryLocal: prevMatchF_P[0].countryLocal,
                countryVisitor: result === 'local' ? countryLocal : countryVisitor,
                goalsLocal: 0,
                goalsVisitor: 0,
                result: "tie",
                stadium: prevMatchF_P[0].stadium,
                date: prevMatchF_P[0].date,
            })
        }
    } else {
        if(matchid === prevMatchF[0].local){
            const newF = new FinalPlayed({
                stage: prevMatchF[0].stage,
                matchid: prevMatchF[0].matchid,
                local: result === 'local' ? local : visitor,
                visitor: prevMatchF[0].visitor,
                countryLocal: result === 'local' ? countryLocal : countryVisitor,
                countryVisitor: prevMatchF[0].visitor.toString(),
                goalsLocal: 0,
                goalsVisitor: 0,
                result: "tie",
                stadium: prevMatchF[0].stadium,
                date: prevMatchF[0].date,
            })
            await newF.save()
        } else if(matchid === prevMatchF[0].visitor){
            const newF = new FinalPlayed({
                stage: prevMatchF[0].stage,
                matchid: prevMatchF[0].matchid,
                local: prevMatchF[0].local,
                visitor: result === 'local' ? local : visitor,
                countryLocal: prevMatchF[0].local.toString(),
                countryVisitor: result === 'local' ? countryLocal : countryVisitor,
                goalsLocal: 0,
                goalsVisitor: 0,
                result: "tie",
                stadium: prevMatchF[0].stadium,
                date: prevMatchF[0].date,
            })
            await newF.save()
        }
    }

    const prevMatchT = await ThirdPlace.find({ $or: [{local: `loser ${matchid}`}, {visitor: `loser ${matchid}`}] }).lean()

    const prevMatchT_P = await ThirdPlacePlayed.find({ $or: [{ local: `loser ${matchid}` }, { visitor: `loser ${matchid}` }, { countryLocal: countryLocal }, { countryVisitor: countryVisitor }, { countryVisitor: countryLocal }, { countryLocal: countryVisitor } ]}).lean()

    if(prevMatchT_P[0]){
        if(`loser ${matchid}` === prevMatchT[0].local){
            await ThirdPlacePlayed.findOneAndUpdate({ _id: prevMatchT_P[0]._id }, {
                stage: prevMatchT[0].stage,
                matchid: prevMatchT[0].matchid,
                local:  result === 'local' ? visitor : local,
                visitor: prevMatchT_P[0].visitor,
                countryLocal: result === 'local' ? countryVisitor : countryLocal,
                countryVisitor: prevMatchT_P[0].countryVisitor.toString(),
                goalsLocal: 0,
                goalsVisitor: 0,
                result: "tie",
                stadium: prevMatchT[0].stadium,
                date: prevMatchT[0].date,
            })
        } else if(`loser ${matchid}` === prevMatchT[0].visitor){
            await ThirdPlacePlayed.findOneAndUpdate({ _id: prevMatchT_P[0]._id }, {
                stage: prevMatchT[0].stage,
                matchid: prevMatchT[0].matchid,
                local: prevMatchT_P[0].local, 
                visitor: result === 'visitor' ? local : visitor,
                countryLocal: prevMatchT_P[0].countryLocal.toString(),
                countryVisitor: result === 'visitor' ? countryLocal : countryVisitor,
                goalsLocal: 0,
                goalsVisitor: 0,
                result: "tie",
                stadium: prevMatchT[0].stadium,
                date: prevMatchT[0].date,
            })        
        }
    } else {
        if(`loser ${matchid}` === prevMatchT[0].local){
             const newT = new ThirdPlacePlayed({
                stage: prevMatchT[0].stage,
                matchid: prevMatchT[0].matchid,
                local:  result === 'local' ? visitor : local,
                visitor: prevMatchT[0].visitor,
                countryLocal: result === 'local' ? countryVisitor : countryLocal,
                countryVisitor: prevMatchT[0].visitor.toString(),
                goalsLocal: 0,
                goalsVisitor: 0,
                result: "tie",
                stadium: prevMatchT[0].stadium,
                date: prevMatchT[0].date,
            })
            await newT.save()           
        } else if(`loser ${matchid}` === prevMatchT[0].visitor){
             const newT = new ThirdPlacePlayed({
                stage: prevMatchT[0].stage,
                matchid: prevMatchT[0].matchid,
                local: prevMatchT[0].local,
                visitor: result === 'visitor' ? local : visitor,
                countryLocal: prevMatchT[0].local.toString(),
                countryVisitor: result === 'local' ? countryVisitor : countryLocal,
                goalsLocal: 0,
                goalsVisitor: 0,
                result: "tie",
                stadium: prevMatchT[0].stadium,
                date: prevMatchT[0].date,
            })
            await newT.save()  
        }
    }

res.send({ message: `Result updated correctly: ${countryLocal} ${goalsLocal} vs ${countryVisitor} ${goalsVisitor}, in ${stage}, match ${matchid}. ${result === "local" ? local : visitor} advanced to the final and ${result === "local" ? visitor : local} to the third place match` })
})

//Obtener cruce de Tercer Pusto
router.get('/api/get-thirdplace/', cors(corsOptions), async (req, res)=> {
    const thirdplace = await ThirdPlacePlayed.find().lean()
    res.send(thirdplace)
})

//Obtener cruce de la final
router.get('/api/get-final/', cors(corsOptions), async (req, res)=> {
    const final = await FinalPlayed.find().lean()
    res.send(final)
})

//Setear resultado del Tercer Puesto
router.post('/api/set-thirdplace', cors(corsOptions), async (req, res)=>{
    const { matchid, stage, local, visitor, countryLocal, countryVisitor, goalsLocal, goalsVisitor, stadium, date } = req.body
    
    let result = ""
    if(goalsLocal > goalsVisitor){
        result = "local"
    } else {
        result = "visitor"
    }

    let thirdPlace = await ThirdPlacePlayed.find().lean()

    await ThirdPlacePlayed.findOneAndUpdate( { _id: thirdPlace[0]._id }, {
        goalsLocal: goalsLocal,
        goalsVisitor: goalsVisitor,
        result: result
    })
})

//Setear el resultado de la Final
router.post('/api/set-final', cors(corsOptions), async (req, res)=>{
    const { matchid, stage, local, visitor, countryLocal, countryVisitor, goalsLocal, goalsVisitor, stadium, date } = req.body
    
    let result = ""
    if(goalsLocal > goalsVisitor){
        result = "local"
    } else {
        result = "visitor"
    }

    let final = await FinalPlayed.find().lean()

    await FinalPlayed.findOneAndUpdate( { _id: final[0]._id }, {
        goalsLocal: goalsLocal,
        goalsVisitor: goalsVisitor,
        result: result
    })
})

//Limpiar fase de grupos
router.delete('/api/clear-group-stage', cors(corsOptions), async (req, res)=>{
    await mongoose.connection.db.dropCollection(
                        "matchplayeds",
                        function(err, result) {
                            console.log("Collection droped");
                        })
    await mongoose.connection.db.dropCollection(
                        "round16playeds",
                        function(err, result) {
                            console.log("Collection droped");
                        })
    await mongoose.connection.db.dropCollection(
                        "quarterfinalsplayeds",
                        function(err, result) {
                            console.log("Collection droped");
                        })
    await mongoose.connection.db.dropCollection(
                        "semifinalsplayeds",
                        function(err, result) {
                            console.log("Collection droped");
                        })
    await mongoose.connection.db.dropCollection(
                        "thirdplaceplayeds",
                        function(err, result) {
                            console.log("Collection droped");
                        })
    await mongoose.connection.db.dropCollection(
                        "finalplayeds",
                        function(err, result) {
                            console.log("Collection droped");
                        })
    res.send({ message: `Data cleared` })
})

//Limpiar Octavos
router.delete('/api/clear-round16', cors(corsOptions), async(req, res)=>{

    await Round16Played.updateMany({ stage: "round of 16" }, {
        goalsLocal: 0,
        goalsVisitor: 0,
        result: "tie"
    })

    await mongoose.connection.db.dropCollection(
                        "quarterfinalsplayeds",
                        function(err, result) {
                            console.log("Collection droped");
                        })
    await mongoose.connection.db.dropCollection(
                        "semifinalsplayeds",
                        function(err, result) {
                            console.log("Collection droped");
                        })
    await mongoose.connection.db.dropCollection(
                        "thirdplaceplayeds",
                        function(err, result) {
                            console.log("Collection droped");
                        })
    await mongoose.connection.db.dropCollection(
                        "finalplayeds",
                        function(err, result) {
                            console.log("Collection droped");
                        })
    res.send({ message: `Data cleared` })
})

//Limpiar Cuartos
router.delete('/api/clear-quarterfinals', cors(corsOptions), async(req, res)=>{

    await QuarterfinalsPlayed.updateMany({ stage: "quarterfinals" }, {
        goalsLocal: 0,
        goalsVisitor: 0,
        result: "tie"
    })

    await mongoose.connection.db.dropCollection(
                        "semifinalsplayeds",
                        function(err, result) {
                            console.log("Collection droped");
                        })
    await mongoose.connection.db.dropCollection(
                        "thirdplaceplayeds",
                        function(err, result) {
                            console.log("Collection droped");
                        })
    await mongoose.connection.db.dropCollection(
                        "finalplayeds",
                        function(err, result) {
                            console.log("Collection droped");
                        })
    res.send({ message: `Data cleared` })
})

//Limpiar Semifinales
router.delete('/api/clear-semifinals', cors(corsOptions), async(req, res)=>{

    await SemifinalsPlayed.updateMany({ stage: "semifinals" }, {
        goalsLocal: 0,
        goalsVisitor: 0,
        result: "tie"
    })

    await mongoose.connection.db.dropCollection(
                        "thirdplaceplayeds",
                        function(err, result) {
                            console.log("Collection droped");
                        })
    await mongoose.connection.db.dropCollection(
                        "finalplayeds",
                        function(err, result) {
                            console.log("Collection droped");
                        })
    res.send({ message: `Data cleared` })
})

//Limpiar Tercer Puesto
router.delete('/api/clear-third-place', cors(corsOptions), async(req, res)=>{

    await ThirdPlacePlayed.updateMany({ stage: "third place" }, {
        goalsLocal: 0,
        goalsVisitor: 0,
        result: "tie"
    })

    res.send({ message: `Data cleared` })
})

// Limpiar Final
router.delete('/api/clear-final', cors(corsOptions), async(req, res)=>{

    await FinalPlayed.updateMany({ stage: "final" }, {
        goalsLocal: 0,
        goalsVisitor: 0,
        result: "tie"
    })

    res.send({ message: `Data cleared` })
})

module.exports = router