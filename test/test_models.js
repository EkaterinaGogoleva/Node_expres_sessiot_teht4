/* models -kansiossa sijaitsevien skeemojen kevyt testaus
  Skeemat on hyvä pitää omissa tiedostoissaan. Grade
  on Studentin alidokumentti. Alidokumentin skeema liitetään requirella
  päädokumentin skeemaan.
*/
const mongoose = require('mongoose');
const expect = require('chai').expect;
const Student = require('../models/Student'); // Student schema
const s = new Student({
  studypoints: -1,
});

const GradeSchema = require('../models/Grade'); // Grade schema
const Grade = mongoose.model('Grade', GradeSchema); // Skeemasta tehdään model vasta tässä
const g = new Grade({
  grade: -1,
});

describe('Student schema test', () => {
  // Tarkistetaan että tiettyjen kentien arvot ovat pakollisia eli required
  // done on signaali mochalle että asynkronisen koodin testit on suoritettu
  it('should give error if studentcode, name, or email value is empty', (done) => {
    s.validate((err) => {
      expect(err.errors.studentcode).to.exist; // virhe on olemassa jos kenttä on required
      expect(err.errors.name).to.exist;
      expect(err.errors.email).to.exist;
      done();
    });
  });
  // Tarkistetaan että kentän arvo ei ole negatiivinen
  it('should give error if studypoints value is negative', (done) => {
    s.validate((err) => {
      expect(err.errors.studypoints).to.exist; // virhe on olemassa jos negatiivisia arvoja ei sallita
      done();
    });
  });
});

describe('Grade schema test', () => {
  it('should give error if coursecode value is empty', (done) => {
    g.validate((err) => {
      expect(err.errors.coursecode).to.exist;
      done();
    });
  });
  it('should give error if grade value is negative', (done) => {
    g.validate((err) => {
      expect(err.errors.grade).to.exist;
      done();
    });
  });
});
