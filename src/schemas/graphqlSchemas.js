'use strict';

const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    student(id: Int!): Students
    students: [Students]
    class(id: Int!): Classes
    classes: [Classes]
  },
  type Students {
    id: Int
    name: String
    dob: String
    classes: [Classes]
    status: Boolean
  }
  type Classes {
    id: Int
    name: String
    description: String
    students: [Students]
    status: Boolean
  }
  type Mutation {
    createStudent(
      name: String
      dob: String
      classes: [Int]
    ): Students,
    updateStudent(id: Int!, name: String!): Students,
    deleteStudent(id: Int!): Students,
    createClass(
      name: String
      description: String
    ): Classes,
    updateClass(id: Int!, name: String!, description: String!): Classes,
    deleteClass(id: Int!): Classes
  }
`);

module.exports = {
  schema
};
