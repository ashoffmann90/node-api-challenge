const express = require('express')
const Act = require('../data/helpers/actionModel')
const Proj = require('../data/helpers/projectModel')
const router = express.Router()

router.get('/:id', (req, res) => {
    const id = req.params.id
    Proj.get(id)
    .then(proj => {
        res.status(200).json(proj)
    })
    .catch(err => {
        res.status(500).json({error: "Project could not be retrieved"})
    })
})

router.get('/:id/acts', (req, res) => {
    const id = req.params.id
    Proj.getProjectActions(id)
    .then(acts => {
        res.status(200).json(acts)
    })
    .catch(err => {
        res.status(500).json({message:"Error retrieving"})
    })
})

router.post('/', validateProj, (req, res) => {
    Proj.insert(req.body)
    .then(proj => {
        res.status(201).json(proj)
    })
    .catch(err => 
        res.status(500).json({error:"Could not add project"}))
})

router.post('/:id/acts', (req, res) => {
    const id = req.params.id
    const body = req.body
    // const act = { description:body.description, notes:body.notes, id }
    Act.insert({...body, id})
    .then(proj => {
        res.status(201).json(proj)
    })
    .catch(err => {
        res.status(500).json({error:"Action could not be added"})
    })
})

router.delete('/:id', (req, res) => {
    Proj.remove(req.body)
    .then(proj => {
        res.status(202).json({message:"Project removed"})
    })
    .catch(err => {
        res.status(500).json({error:"Project could not be removed"})
    })
})

router.put('/:id', validateProj, (req, res) => {
    const id = req.params.id
    const upBody = req.body
    Proj.update(id, upBody)
    .then(proj => {
        res.status(201).json({message:"Project updated"})
    })
    .catch(err => {
        res.status(500).json({erorr: "Project could not update"})
    })
})

function validateProj(req, res, next){
    if(!req.body){
        res.status(400).json({error:"Missing project data"})
    } else if(!req.body.name || req.body.name === ''){
        res.status(400).json({error:"Missing project name"})
    } else {
        next()
    }
}


module.exports = router