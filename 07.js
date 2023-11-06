// Global Variables
const fs = require("fs");

/////////////////////////// HELPERS

// Print Debug Logic
const shouldPrintDebug = true;

function printDebug(debugString) {
    if (shouldPrintDebug) {
        console.log(debugString);
    }
}

// Read input data (puzzle data)
function readInputData(input) {
    return fs.readFileSync(input, "utf8").split("\r\n");
}

///////////////////// PROGRAM

const root = createDirectory('root');
let directoryStack = [root];

function getCurrentDirectory() {
    return directoryStack[directoryStack.length - 1]
}


function createDirectory(name) {
    return {
        name: name,
        directories: [],
        files: [],

        getDirectories() {
        },

        addFile(file) {
            this.files.push(file);
        },
        getDirectory(directory) {
            return this.directories.find(e => e.name === directory);
        },


        addDirectory(directory) {
            this.directories.push(directory);
        },

        returnLargeDirectory() {
            let totalSize = 0;
            this.files.forEach(file => {
                totalSize += Number(file.fileSize)
            });
            return (totalSize <= 100000) ? totalSize : 0;
        },
        
        calcTotalSize(){

            let totalSize = this.files.reduce((sum, file) => sum + Number(file.fileSize), 0)
            this.directories.forEach(directory => {
                totalSize += directory.calcTotalSize();
            })
            return totalSize;
        },

        calculateFileSizes() {
            let totalSize = 0;
            let thisDir = this.files.reduce((sum, file) => sum + Number(file.fileSize), 0);
            this.directories.forEach(directory => {
                const dirSize = directory.calculateFileSizes();
                if (dirSize <= 100000) {
                    totalSize += dirSize
                }
            });
            if (thisDir <= 100000) {
                totalSize += thisDir;
            }

            return totalSize;
        }
    }
}

function createFile(size, name) {
    return {
        fileName: name,
        fileSize: size
    }
}

function parseDirectoryData(data) {
    for (let i = 1; i < data.length; i++) {
        const entry = data[i];
        const firstChar = data[i].charAt(0);
        // Entry is an instruction
        if (firstChar === '$') {
            runCommand(entry.split(" "))
        }

        // Entry is a file
        else if (!isNaN(firstChar)) {
            const file = createFile(...entry.split(" ").slice(0, 2));
            getCurrentDirectory().addFile(file);
        }

        // Entry is a directory
        else if (firstChar === 'd') {
            const directoryName = entry.split(" ")
            const directory = createDirectory(directoryName[1]);
            getCurrentDirectory().addDirectory(directory);
        }
        else {
            printDebug("Error")
        }
    };
}

function runCommand(command) {
    switch (command[1]) {
        case 'cd':
            changeDirectory(command[2]);
            break;
        case 'ls':
            //console.log("List")
            break;

    }
}

function changeDirectory(newDir) {
    if (newDir === '..') {
        if (directoryStack.length > 1) {
            directoryStack.pop();
        }
    }
    else {
        directoryStack.push(getCurrentDirectory().getDirectory(newDir));
    }
}


function solvePuzzle() {
    const data = readInputData('07Input.txt');
    parseDirectoryData(data);
    // Part 11543140
    let sumOfSmallDirectories = 0;

    function addIfSmall(directory){
        const dirSize = directory.calcTotalSize();
        if (dirSize <= 100000){
            sumOfSmallDirectories += dirSize;
        }

        directory.directories.forEach(addIfSmall);
    }

    addIfSmall(root);
    console.log (sumOfSmallDirectories);

    function printOutDirectories(directory){
        console.log(`Directory ${directory.name} has ${directory.directories.length} directories and ${directory.files.length} files.`);
        directory.directories.forEach(printOutDirectories);
    }
    printOutDirectories(root);

}

solvePuzzle();