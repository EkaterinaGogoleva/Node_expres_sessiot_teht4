//alidokumentin skeema. Tästä ei tehdä modelia
const mongoose = require('mongoose');

//создаем схему. Схема определяет форму данных в БД.
const GradeSchema = new mongoose.Schema({
  coursecode: {type: String, required: true, max: 10},
  grade: {type: Number, required: false, min: 0, max: 5},
}
);
module.exports = GradeSchema;