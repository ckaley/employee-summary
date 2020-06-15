// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
  
    constructor(name, id, email, github) {
      super(name, id, email);
      this.role = "Engineer";
      this.github = github;
  }

  getName(){
    return this.name
  }

  getId(){
    return this.id
  }

  getEmail(){
    return this.email
  }
  
  getRole() {
    return this.role
  }

  getGithub() {
    return this.github
  }

}

module.exports = Engineer;