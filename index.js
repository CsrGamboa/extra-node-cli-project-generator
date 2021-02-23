#!/usr/bin/env node

// los imports
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const shell = require('shelljs');
const chalk = require('chalk');

// obtener las opciones de los templates, entre parentesis la direccion de nuestra
// carpeta contenera de los templates
 const TEMPLATE_OPTIONS =  fs.readdirSync(path.join(__dirname, 'templates'))
//con esta linea muestra las carpetas que hay dentro de carpeta templates
//cuando ejecutamos: node index.js
 //console.log(TEMPLATE_OPTIONS);

 // definir preguntar que se haran al definir proyecto
const QUESTIONS = [
    {
        name: 'template',
        type: 'list',
        message: '¿Qué tipo de proyecto quieres generar?',
        choices: TEMPLATE_OPTIONS
    },
    {
        name: 'proyecto',
        type: 'input',
        message: '¿Cuál es el nombre del proyecto?',
        validate: function(input) {
            if(/^([a-z@]{1}[a-z\-\.\\/0-9]{0,213})+$/.test(input)){
                return true;
            }
            return 'El nombre del proyecto solo puede tener 214 caracteres y empezar con minuscula o @'
        }
        
        
    },

];

// hacemos prueba que esta cogiendo todo bien, ejecutamos: node index.js
// deberia mostrar como resultado todo el contenido de const QUESTIONS
//console.log(QUESTIONS); 

// Mostrar prompt en la consola, con console.log veremos las respuestas
// que da usuario por el teclado o seleccionando de la lista
//inquirer.prompt(QUESTIONS).then(respuestas => console.log(respuestas));


const DIR_ACTUAL = process.cwd();
inquirer.prompt(QUESTIONS).then(respuestas => {
    // este ['template'] es el nombre de la propiedad name de QUESTIONS
    const template = respuestas['template'];
    const proyecto = respuestas['proyecto'];

    // obtener el path del template que se haya seleccionado
    //aqui (__dirname, 'nombreCarpetadeTemplates', nombreDelTemplate)
    const templatePath = path.join(__dirname, 'templates', template);
    //definir directorio del proyecto
    const pathTarget = path.join(DIR_ACTUAL, proyecto);

    createProject(pathTarget);

    createDirectoriesFilesContent(templatePath, proyecto);
});

function createProject(projectPath){
    // comprobar que no existe el directorio
    if (fs.existsSync(projectPath)){
        console.log(chalk.red('No puedes crear el proyecto porque ya existe, itenta con otro'));
        return false;
    }
    fs.mkdirSync(projectPath);
    return true;
}

function createDirectoriesFilesContent(templatePath, proyecto){
    // obtener la lista de direcotorios y ficheros del tempate seleccionado
    const listFileDirectories = fs.readdirSync(templatePath);
    // recorrer la lista, item será un directorio o un fichero
    listFileDirectories.forEach(item => {
        const originalPath = path.join(templatePath, item);

        //propiedad del fichero o directorio y segun sea hara difeentes acciones
        const stats = rs.statSync(originalPath);
        // path de escritura
        const writePath = path.join(DIR_ACTUAL, proyecto, item);
        // comprobar si es fichero o directorio
        if (stats.isFile()){

        } else if ( stats.isDirectory() ){
            
        }

    })
}