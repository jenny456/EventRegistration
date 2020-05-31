const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Candidates= require('../models/candidates');
const cors = require('./cors');
var authenticate = require('../authenticate');
const candidateRouter = express.Router();

candidateRouter.use(bodyParser.json());


candidateRouter.route('/')
.options(cors.corsWithOptions,authenticate.verifyUser, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    Candidates.find({})
    .then((candidates) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(candidates);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,(req, res, next) => {
    Candidates.create(req.body)
    .then((candidate) => {
        console.log('Candidate Created ', candidate);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(candidate);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete(cors.corsWithOptions,(req, res, next) => {
    Candidates.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

module.exports=candidateRouter;