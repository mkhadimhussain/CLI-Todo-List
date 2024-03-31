#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todos = [];
let condition = true;
console.log(chalk.bgGreenBright.bold(`W         W  EEEEE  L       CCCCC   OOOOO    M       M  EEEEE `));
console.log(chalk.bgMagenta.bold(` W       W   E      L      C       O     O   MM     MM  E     `));
console.log(chalk.bgGreenBright.bold(`  W  W  W    EEEEE  L     C       O       O  M M   M M  EEEEE `));
console.log(chalk.bgMagenta.bold(`   W W W     E      L      C       O     O   M  M M  M  E     `));
console.log(chalk.bgGreenBright.bold(`    W W      EEEEE  LLLLL   CCCCC   OOOOO    M   M   M  EEEEE `));
console.log(chalk.blue.bgYellow.bold("\n***********************************"));
console.log(chalk.bgRed.bold("*************Todo List*************"));
console.log(chalk.blue.bgYellow.bold("***********************************\n"));
console.log(chalk.bgMagenta.bold("************REGISTRATION************"));
// For Registration
let registrationAnswer = await inquirer.prompt([
    // For Username
    {
        name: "registrationName",
        message: chalk.blue.bold("\nEnter your Name:"),
        type: "input"
    },
    // For Password
    {
        name: "registrationPass",
        message: chalk.blue.bold("\nEnter the Password:"),
        type: "password"
    }
]);
console.log(chalk.bgGreenBright.bold("\nRegisterd Successfully!"));
// For Login
console.log(chalk.bgMagenta.bold("\n**********Login Your Account**********"));
let login = await inquirer.prompt([
    // For Username Login
    {
        name: "loginName",
        message: chalk.cyan.bold("\nEnter Your Username:"),
        type: "input"
    },
    // For Password Login
    {
        name: "loginPass",
        message: chalk.cyan.bold("\nEnter Your Password:"),
        type: "password"
    }
]);
// If username && password is correct
if (login.loginName === registrationAnswer.registrationName && login.loginPass === registrationAnswer.registrationPass) {
    console.log(chalk.bgGreenBright.bold("\nLogged In Successfully!"));
    // While loop
    while (condition) {
        let addTask = await inquirer.prompt([
            {
                name: "todo",
                message: chalk.yellowBright.bold("\nWhat you want to add in your todos?"),
                type: "input"
            },
            // asking for adding more
            {
                name: "addMore",
                message: chalk.cyan.bold("\nDo you want to add more?"),
                type: "confirm",
                default: "false"
            }
        ]);
        // push in todos array
        todos.push(addTask.todo);
        // Updating the value of condition based on the user's input stored in addTask.addMore
        condition = addTask.addMore;
        console.log(chalk.bgMagenta.underline.bold("\nYour Current Todos List is:", chalk.bgCyan(todos)));
        //console.log(todos);
    } // While Loop ends here
    // For Replacing the Todo
    let replaceTodo = await inquirer.prompt([
        {
            name: "replace",
            message: chalk.cyan.bold("\nAre you want to Replace any Todo?"),
            type: "confirm",
            default: "false"
        }
    ]);
    // If Replace is yes
    if (replaceTodo.replace) {
        let replaceTodoAns = await inquirer.prompt([
            {
                name: "replaceAns",
                message: chalk.cyan.bold("\nSelect which Todo you want to Replace:"),
                type: "list",
                choices: todos
            }
        ]);
        // For writing the Replacing
        let writeReplaceAns = await inquirer.prompt([
            {
                name: "writeReplace",
                message: chalk.cyan.bold("\nWrite the new Todo for Replacing:"),
                type: "input"
            }
        ]);
        const selectedIndex = todos.indexOf(replaceTodoAns.replaceAns);
        if (selectedIndex !== -1) { // Ensure the selected todo exists in the array
            // Replace the todo at the selected index with the new todo
            todos[selectedIndex] = writeReplaceAns.writeReplace;
        }
        console.log(chalk.bgGreenBright.bold("\nTodo were Replaced Successfully!"));
        // log the inserted Todo's list
        console.log(chalk.bgMagenta.underline.bold("\nYour Current Todos List is:", chalk.bgCyan(todos)));
        // When Replace is No
    }
    else {
        console.log(chalk.bgGreenBright.bold("\nNo Todos were Replaced!"));
    }
    // For inserting the intodos list
    let insertTodos = await inquirer.prompt([
        {
            name: "insert",
            message: chalk.cyan.bold("\nAre you want to insert the the new Todo in the end of a list?"),
            type: "confirm",
            default: "false"
        }
    ]);
    // If Insert is yes
    if (insertTodos.insert) {
        let writeTodo = await inquirer.prompt([
            {
                name: "write",
                message: chalk.cyan.bold("\nWrite the new Todo which you want to Insert:"),
                type: "input"
            }
        ]);
        // Add new todo to the end of the array
        todos.push(writeTodo.write);
        console.log(chalk.bgGreenBright.bold("\nTodo were Inserted Successfully!"));
        // log the inserted Todo's list
        console.log(chalk.bgMagenta.underline.bold("\nYour Current Todos List is:", chalk.bgCyan(todos)));
        // when Update is No
    }
    else {
        console.log(chalk.bgGreenBright.bold("\nNo Todos were Inserted!"));
    }
    ;
    // For Delete last todo
    let deleteTodos = await inquirer.prompt([
        {
            name: "delete",
            message: chalk.red.bold("\nAre you want to delete the last todo?"),
            type: "confirm",
            default: "false"
        }
    ]);
    if (deleteTodos.delete) {
        // If confirmed, delete the last todo
        todos.pop();
        console.log(chalk.bgGreenBright.bold("\nLast Todo Deleted Successfully!"));
    }
    else {
        console.log(chalk.bgGreenBright.bold("\nNo Todos were Deleted!"));
    }
    // Logging the Final Todos List
    console.log(chalk.bgMagenta.underline.bold("\nYour Final Todos List is:", chalk.bgCyan(todos)));
    // Incorrect username && password
}
else {
    console.log(chalk.bgRed.bold("\nIncorrect Username or Password!"));
}
