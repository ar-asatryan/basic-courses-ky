const mongoose = require('mongoose');

// Creating new schema!

const course = {
    title: {
        en: { type: String },
        am: { type: String }
    },

    desc: {
        en: { type: String },
        am: { type: String }
    },

    text: {
        en: { type: String },
        am: { type: String }
    },

    slug: { type: String, unique: true }, // Url of courses

    href: { type: String },

    dif: { type: Number }, // Difficulty of the courses

    infoBlocks: [
        {
            img: { type: String },
            title: {
                en: { type: String },
                am: { type: String }
            },
            desc: {
                en: { type: String },
                am: { type: String }
            },
        }
    ],

    discountBlocks: [
        {
            percent: { type: Number },
            title: {
                en: { type: String },
                am: { type: String }
            }
        }
    ],

    instructors: [
        {
            linkedin: { type: String } // ID of linkedin user profile, check linkedin API, - GET https://api.linkedin.com/v2/people/(id:{person ID})
        }
    ],

    whoCanAttend: {
        title: {
            en: { type: String },
            am: { type: String }
        },
        checkboxes: [
            {
                en: { type: String },
                am: { type: String }
            }
        ]
    },

    administrative: {
        duration: { type: String }, // Duration of the courses
        price: { type: Number }, // Courses price
        startDate: { type: String } // Courses start date
    },

    opportunities: [
        {
            img: { type: String },
            title: {
                en: { type: String },
                am: { type: String }
            },
        }
    ],

    status: { type: Number }, // Corses status - 0/1

    syllabus: [
        {
            en: { type: String },
            am: { type: String }
        }
    ],

    lang: {
        en: { type: String },
        am: { type: String }
    }, // Language of the courses

    image: { type: String },

};

let coursesSchema = new mongoose.Schema([
    course,
]);

module.exports = mongoose.model('Courses', coursesSchema);
