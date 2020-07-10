const fs = require('fs');
const path = require('path');
let router = new (require('express').Router)();

const upload = require('../middleware/upload')('companies/');
const verifyToken = require('../middleware');
const checkToken = require('../middleware');
const error = require('../bin/errorHandler');

const { Companies } = require('./../models');

router.post('', verifyToken, checkToken, upload.single('image'), (req, res, next) => {

    const companies = new Companies();

    companies.image = req.file.path;

    if (!req.file) {
        return error(err, 400, req, res);
    }

    companies.save((err, doc) => {
        if (err) throw (err);

        res.status(201).json({
            status: true,
            msg: 'Created',
            data: {
                id: doc._id,
                image: doc.image,
            }
        });

    });

});

router.get('', upload.none(), (req, res, next) => {

    Companies.find({}, (err, docs) => {

        if (err) {
            return error(err, 500, req, res);
        }

        res.status(200).json({
            status: true,
            msg: 'Success',
            data: docs.map(d => ({
                id: d.id,
                image: d.image,
            }))
        });

    });

});


router.delete('', verifyToken, checkToken, upload.none(), (req, res, next) => {

    if (!req.body.id) {
        return error(null, 401, req, res);
    }

    Companies.findByIdAndDelete({ _id: req.body.id }, (err, doc) => {

        if (err) return res.status(500).send(err);

        if (!doc) {
            return error(err, 400, req, res);
        } else {
            fs.unlink(path.resolve('./', doc.image), (err, data) => {
                if (err) {
                    throw err
                }
            });

            res.status(200).json({
                status: true,
                msg: 'Section deleted',
            });

        }

    });

});


module.exports = router;
