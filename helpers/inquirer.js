const inquirer = require('inquirer');
require('colors');
 
const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Search city`
            },
            {
                value: 2,
                name: `${'2.'.green} History`
            },
            {
                value: 0,
                name: `${'3.'.green} Exit`
            },
        ]
    }
];
 
const inquirerMenu = async () => {
    console.clear()
    console.log('======================='.green)
    console.log(' Select an option '.yellow)
    console.log('=======================\n'.green)
 
    const {option} = await inquirer.prompt(menuOpts);
 
    return option;
 
}

const inquirerPause = async () => {
    const menuInput = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'Enter'.green} to continue`
        }
    ];

    console.log('\n'); 
    await inquirer.prompt(menuInput);
 
}

const readInput = async (message) => {
    const menuRead = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if (value.length === 0) {
                    return 'Please  enter a value';
                }
                return true;
            }
        }
    ];
    
   const {desc} = await inquirer.prompt(menuRead);
   return desc;
}

const listPlaces = async (places = []) => {
    const choices = places.map( (value,index) => {
    const i = `${index + 1}`.green;
        return {
            value: value.id,
            name: `${i} ${value.name}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancel'
    });

    const menuPlaces = [
        {
            type: 'list',
            name: 'id',
            message: 'Select place:',
            choices
        }
    ];

    const {id} = await inquirer.prompt(menuPlaces);
    return id;
}

module.exports = {
    inquirerMenu,
    inquirerPause,
    readInput,
    listPlaces
}