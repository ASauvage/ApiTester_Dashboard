require('dotenv').config();

const express = require('express');
const api_tester = require('../mongodb/models')

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const results = await api_tester.find({'test_info.version': process.env.APT_VERSION}, {'api_response': 0}).sort({'timestamp': -1, 'title': -1}).limit(30);

        res.render('session', {
            title: 'Sessions',
            results: results
        });
    } catch (error) {
        res.status(500).render('error', {
            status_code: 500,
            error: error
        })
    }
});

router.post('/', async (req, res) => {
    try {
        const results = await api_tester.find({
            'test_info.version': process.env.APT_VERSION,
            ...(req.body.session_id != '' && { 'test_info.session_id': req.body.session_id }),
            ...(req.body.service != '' && { 'test_info.service': req.body.service }),
            ...(req.body.status != '' &&{ 'status': (req.body.status === 'true') }),
            ...(req.body.env != '' && { 'test_info.env': req.body.env })
        }, {'api_response': 0}).sort({'timestamp': -1, 'title': -1});

        res.render('session', {
            title: 'Sessions',
            results: results
        });
    } catch (error) {
        res.status(500).render('error', {
            status_code: 500,
            error: error
        })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await api_tester.findById(req.params.id)

        res.render('test', {
            title: 'Test ' + result.title,
            result: result
        })
    } catch (error) {
        res.status(500).render('error', {
            status_code: 500,
            error: error
        })
    }
});


module.exports = router;
