const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { inherits } = require("util");
const employees = [];
let keepGoing = true;


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const managerQuestions = [{
    type: "input",
    message: "What is your Manager's name?",
    name: "managerName"
  },
  {
    type: "input",
    message: "What is your Manager's ID?",
    name: "managerID"
  },
  {
    type: "input",
    message: "What is your Manager's email?",
    name: "managerEmail"
  },
  {
    type: "input",
    message: "What is you Manager's office number?",
    name: "managerOfficeNumber"
  }
  ];

  const engineerQuestions = [{
    type: "input",
    message: "What is your Engineer's name?",
    name: "engineerName"
  },
  {
    type: "input",
    message: "What is your Engineer's ID?",
    name: "engineerID"
  },
  {
    type: "input",
    message: "What is your Engineer's email?",
    name: "engineerEmail"
  },
  {
    type: "input",
    message: "What is your Engineer's GitHub ID?",
    name: "engineerGitHubID"
  }
  ];

  const internQuestions = [{
    type: "input",
    message: "What is your Intern's name?",
    name: "internName"
  },
  {
    type: "input",
    message: "What is your Intern's ID?",
    name: "internID"
  },
  {
    type: "input",
    message: "What is your Intern's email?",
    name: "internEmail"
  },
  {
    type: "input",
    message: "What is your Intern's school?",
    name: "internSchool"
  }
  ];

  const nextQuestions = [{
    type: "list",
    message: "Which type of team member would you like to add?",
    name: "nextChoice",
    choices: [
      "Engineer",
      "Intern",
      "I don't want to add any more team members",
    ]
  }
  ];

async function main() {
  console.log("Please build your team")
  let answers = await inquirer.prompt(managerQuestions)
  let manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOfficeNumber)
  employees.push(manager) 
  
  if(answers.nextChoice === "I don't want to add any more team members"){
    keepGoing = false;
  }

  while (keepGoing == true){
    let answer = await inquirer.prompt(nextQuestions)
  
    switch(answer.nextChoice) {
      case "Engineer":
          let ansEngineer = await inquirer.prompt(engineerQuestions)
          let engineer = new Engineer(ansEngineer.engineerName, ansEngineer.engineerID, ansEngineer.engineerEmail, ansEngineer.engineerGitHubID)
          employees.push(engineer) 
        keepGoing = true
        break;
      case "Intern":
          let ansIntern = await inquirer.prompt(internQuestions)
          let intern = new Intern(ansIntern.internName, ansIntern.internID, ansIntern.internEmail, ansIntern.internSchool)
          employees.push(intern) 
        keepGoing = true
        break;
      default:
        console.log("End")
        keepGoing = false
    }
  }

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
console.log(employees)

const htmlOutput = render(employees)

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

  if (!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR);
  }

  try {
    if (fs.existsSync(OUTPUT_DIR)) {
      fs.writeFile(outputPath, htmlOutput, function (err){
        if (err) throw err
      })
    }
  } catch(err) {
    console.error(err)
  }

}

main()

