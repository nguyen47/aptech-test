const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', e));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'ReactJs Course',
        author: 'Mosh Hamedani',
        tags: ['angular', 'frontend'],
        isPublished: false
    });

    const result = await course.save();
    console.log(result);
}

async function getCourses(){
    var courses = await Course
    .find()
    .and([
        { author: /^Mosh/ },
        { author: /Hamedani$/ },
        { isPublished: true }
    ])
    .limit(10)
    .sort({ name: 1 })
    .countDocuments();
    console.log(courses);
}

getCourses();