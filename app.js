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
const employees = []; //define array for holding employee objects
let keepGoing = true; // flag used in loop, Initially set to true


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// Question to ask for Manager
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

// Quesitons to ask for Engineers
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

// Questions to ask for Interns
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

// Questions to ask if the user for their next choice
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

// Set the Mmain funciton to asynchronous so teh await command can be used
async function main() {
  console.log("Please build your team") // Initial statement to build team
  let answers = await inquirer.prompt(managerQuestions) // Ask for the manager data
  // Create Manager onject and then add it to the employee array
  let manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOfficeNumber)
  employees.push(manager) 
  
  // Start the loop for all other Engineers and Interns
  while (keepGoing == true){
    // Ask user for Engineer, Intenr or done
    let answer = await inquirer.prompt(nextQuestions)
  
    // Based upon their answer, select the right path
    switch(answer.nextChoice) {
      case "Engineer":
          // Ask Engineer Questions and then create an Engineer Object and push it onto the employees array
          let ansEngineer = await inquirer.prompt(engineerQuestions)
          let engineer = new Engineer(ansEngineer.engineerName, ansEngineer.engineerID, ansEngineer.engineerEmail, ansEngineer.engineerGitHubID)
          employees.push(engineer)
        break;
      case "Intern":
          // Ask Intern Questions and then create an Intern Object and push it onto the employees array
          let ansIntern = await inquirer.prompt(internQuestions)
          let intern = new Intern(ansIntern.internName, ansIntern.internID, ansIntern.internEmail, ansIntern.internSchool)
          employees.push(intern) 
        break;
      default:
        // This selection is when the user selects to end the team definition.  As a result, set keepGoing to false and end the Data Gathering
        console.log("End Data Gathering")
        keepGoing = false
    }
  }

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

const htmlOutput = render(employees)

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// Check to see if the output directoty exists.  If it does not, create it
if (!fs.existsSync(OUTPUT_DIR)){
  fs.mkdirSync(OUTPUT_DIR);
}

// Write the output HTML file to the output file
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

// Call main to kickoff the program
main()

