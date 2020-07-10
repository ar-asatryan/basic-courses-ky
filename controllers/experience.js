let router = new (require('express').Router)();

const upload = require('../middleware/upload')();
const verifyToken = require('../middleware');
const checkToken = require('../middleware');
const error = require('../bin/errorHandler');

const { Experience } = require('./../models');

router.post('', verifyToken, checkToken, upload.none(), (req, res, next) => {

    const experience = new Experience();

    experience.years = req.body.years ? req.body.years : 0;
    experience.students = req.body.students ? req.body.students : 0;
    experience.lessons = req.body.lessons ? req.body.lessons : 0;

    experience.save((err, doc) => {
        if (err) throw (err);

        res.status(201).json({
            status: true,
            msg: 'Created',
            data: {
                id: doc._id,
                years: doc.years,
                students: doc.students,
                lessons: doc.lessons
            }
        });

    });

});

router.get('', upload.none(), (req, res, next) => {

    if (req.body.id) {
        Experience.findById({ _id: req.body.id }, (err, doc) => {

            if (err) {
                return error(err, 500, req, res);
            }

            res.status(200).json({
                status: true,
                msg: 'Success',
                data: {
                    id: doc.id,
                    years: doc.years,
                    students: doc.students,
                    lessons: doc.lessons
                }
            });

        });
    } else {
        Experience.find({}, (err, docs) => {

            if (err) {
                return error(err, 500, req, res);
            }

            res.status(200).json({
                status: true,
                msg: 'Success',
                data: docs.map(d => ({
                    id: d.id,
                    years: d.years,
                    students: d.students,
                    lessons: d.lessons
                }))
            });

        });
    }

});

router.patch('', verifyToken, checkToken, upload.none(), (req, res, next) => {

    if (!req.body.id) {
        return error(null, 400, req, res);
    }

    const updated = { ...req.body };

    Experience.findOneAndUpdate({ _id: req.body.id }, { ...updated }, { new: true }, (err, result) => {

        if (err) return error(err, 400, req, res);

        res.status(201).json({
            status: true,
            msg: 'Updated',
            data: {
                id: result._id,
                years: result.years,
                students: result.students,
                lessons: result.lessons
            }
        });

    });

});

router.delete('', verifyToken, checkToken, upload.none(), (req, res, next) => {

    Experience.findByIdAndDelete({ _id: req.body.id }, (err, doc) => {

        if (err) return res.status(500).send(err);

        if (!doc) {
            return error(err, 400, req, res);
        } else {
            res.status(200).json({
                status: true,
                msg: 'Section deleted',
            });
        }

    });

});

module.exports = router;
