//Mongoose-sheema, josta tehdään model joka exportetaan
const mongoose = require('mongoose');
const GradeSchema = require('./Grade');
//создаем схему. Схема определяет форму данных в БД.
const StudentSchema = new mongoose.Schema({
  studentcode: {type: String, unique: true, required: true,
    //match дает точное определение значения: один знак- маленькая буква
    // четыре знака - цифра
    match: /^[a-z]{1}[0-9]{4}$/},
  name: {type: String, required: true, max: 80},
  email: {type: String, required: true,
    match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/},
  studypoints: {type: Number, required: false, min: 0, max: 300},
  grades: {type: [GradeSchema], required: true},

}
);

//Делаем из схемы модель, по чьем методикам выполняются операции БД
//Student - название модели (и коллекции ?)
//StudentSchema - название схемы
const Student = mongoose.model('Student', StudentSchema);

//экспортируем модель
module.exports = Student;
