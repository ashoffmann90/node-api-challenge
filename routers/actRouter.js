const express = require('express')
const Act = require('../data/helpers/actionModel')
const Proj = require('../data/helpers/projectModel')
const router = express.Router()

router.get('/:id', (req, res) => {
    const id = req.params.id
    Act.get(id)
    .then(act => {
        res.status(200).json(act)
    })
    .catch(err => {
        res.status(500).json({ error:"Could not retrieve actions"})
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Act.remove(id)
    .then(act => {
        res.status(202).json({message:"Action removed"})
    })
    .catch(err => {
        res.status(500).json({error:"Action could not be removed"})
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const upAct = req.body
    Act.update(id, upAct)
    .then(act => {
        res.status(201).json(act)
    })
    .catch(err => {
        res.status(500).json({error:"Could not update action"})
    })
})

module.exports = router