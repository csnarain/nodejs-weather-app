const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
    { id: 1, name: 'Product Management'},
    { id: 2, name: 'TOGAF 9.1'},
    { id: 3, name: 'Archimate 3.0'},
    { id: 4, name: 'Blockchain'},
    { id: 5, name: 'Kubernetes'}
]

//Intercept json using Joi
router.use(express.json());

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course with the given course ID not found');
    res.send(course);
});

router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    // if course doesn't exist return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('Course with given course ID was not found');
        return;
    }
    //Validate the course
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //Update course
    course.name = req.body.name;
    res.send(course);
});

router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course with given course ID was not found');
    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);    
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

module.exports = router;