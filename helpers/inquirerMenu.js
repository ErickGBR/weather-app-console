const inquirer = require('inquirer');
require("colors");

const inquirerMenu = async () => {
    let menuOpts = [
        {
            type: 'list',
            name: 'opcion',
            message: 'Que desea hacer?',
            choices: [
                {
                    value: 1,
                    name: `${'1.'.green}  Buscar ciudad` 
                }, {
                    value: 2,
                    name: `${'2.'.green}  Historial` 
                }, {
                    value: 0,
                    name: `${'0.'.green}  Salir` 
                }
            ]
        }
    ]

    let answer = await inquirer.prompt(menuOpts)
    return answer.opcion;
}

const pausa = async ()=>{
    let question = [
        {
            type:"input",
            name:"enter",
            message :`Presione ${ 'enter'.green} para continuar`
        }
    ]
    await inquirer.prompt(question)
}

const leerInput = async(message)=>{
    let question = [
        {
            type:'input',
            name:'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return "Por favor ingrese un valor"
                }
                return true;
            }
        }
    ]
    const { desc } = await inquirer.prompt(question)
    return desc;
}

const listPlaces = async(places = []) =>{
    const choices = places.map((place, i) => {
        const idx = `${i + 1}.`.green;
        return{
            value: place.id,
            name: `${idx} ${place.name}`
        }
    })

    choices.unshift({
        value: '0',
        name:'0.'.green + 'Cancelar'
    })

    const preguntas = [
        {
            type:'list',
            name:'id',
            message:'Seleccione lugar: ',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas);
    return id;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listPlaces
}