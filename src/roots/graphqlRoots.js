'use strict';

const { studentsData } = require('../data/students');
const { classesData } = require('../data/classes');

function search (obj, value, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i][obj] === value) {
      return myArray[i];
    }
  }
}

function searchStudents (id) {
  let sArr = [];
  for (var i = 0; i < studentsData.length; i++) {
    if (studentsData[i].classes && studentsData[i].classes.length && studentsData[i].classes.indexOf(id) > -1) {
      sArr.push(studentsData[i]);
    }
  }
  return sArr;
}

const root = {
  student: (args) => {
    var id = args.id;
    const students = studentsData.filter(student => {
      return student.id === id;
    })
      .map(s => {
        let t = JSON.parse(JSON.stringify(s));
        if (t.classes && t.classes.length) {
          const classes = [];
          for (let i = 0; i < t.classes.length; i++) {
            classes.push(search('id', t.classes[i], classesData));
          }
          t.classes = classes;
        }
        return t;
      });
    return students[0];
  },
  students: () => {
    return studentsData.map(s => {
      let t = JSON.parse(JSON.stringify(s));
      if (t.classes && t.classes.length) {
        const classes = [];
        for (let i = 0; i < t.classes.length; i++) {
          classes.push(search('id', t.classes[i], classesData));
        }
        t.classes = classes;
      }
      return t;
    });
  },
  createStudent: (args) => {
    const maxID = Math.max.apply(Math, studentsData.map((s) => { return s.id; }));
    studentsData.push({
      id: maxID + 1,
      name: args.name,
      dob: args.dob,
      classes: args.classes,
      status: true
    });
    return studentsData.filter(student => student.id === (maxID + 1))[0];
  },
  updateStudent: (args) => {
    studentsData.map(student => {
      if (student.id === args.id) {
        student.name = args.name;
        return student;
      }
    });
    return studentsData.filter(student => student.id === args.id)[0];
  },
  deleteStudent: (args) => {
    studentsData.map(student => {
      if (student.id === args.id) {
        student.status = false;
        return student;
      }
    });
    return studentsData.filter(student => student.id === args.id)[0];
  },
  class: (args) => {
    var id = args.id;
    const course = classesData.filter(course => {
      return course.id === id;
    })
      .map(c => {
        let t = JSON.parse(JSON.stringify(c));
        const students = searchStudents(t.id);
        t.students = students;
        return t;
      });
    return course[0];
  },
  classes: () => {
    return classesData.map(c => {
      let t = JSON.parse(JSON.stringify(c));
      const students = searchStudents(t.id);
      t.students = students;
      return t;
    });
  },
  createClass: (args) => {
    const maxID = Math.max.apply(Math, classesData.map((s) => { return s.id; }));
    console.log(args, maxID);
    classesData.push({
      id: maxID + 1,
      name: args.name,
      description: args.description,
      status: true
    });
    return classesData.filter(course => course.id === (maxID + 1))[0];
  },
  updateClass: (args) => {
    classesData.map(course => {
      if (course.id === args.id) {
        course.name = args.name;
        course.description = args.description
        return course;
      }
    });
    return classesData.filter(course => course.id === args.id)[0];
  },
  deleteClass: (args) => {
    classesData.map(course => {
      if (course.id === args.id) {
        course.status = false;
        return course;
      }
    });
    return classesData.filter(course => course.id === args.id)[0];
  }
};

module.exports = {
  root
};
