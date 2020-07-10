const stackTrace = require('stack-trace');  // For parent module name
const util = require('util'); //util.inspect()
const path = require('path'); //path.relative() path.sep
const projectname = require('../package').name; //package.json -> project name

module.exports = class Logger {
    constructor() {
        function generateLogFunction(level) {
            return function (message, meta) {
                //let d = Date.now();
                let mes = this.module + " -- ";
                mes += level + " -- ";
                mes += message; // Message
                if (meta) mes += "  " + util.inspect(meta) + " "; // Write additional info (Object||Error)
                mes += '\n'; // Line end

                this.write(mes);
                // Write our message to all streams
            }
        };

        this.trace = stackTrace.get()[1]; // Get the call stack
        this.filename = this.trace.getFileName(); // Get the name of the file that called the constructor
        this.module = projectname + path.sep + path.relative(__dirname + "/..", this.filename); // Write the module's name
        this.streams = [process.stdout]; // Threads that we will write logs to
        this.log = generateLogFunction('Log'); // Behavior log
        this.info = generateLogFunction('Info'); // Info log
        this.error = generateLogFunction('Error'); // Error log
        this.warn = generateLogFunction('Warning'); // Warning log
    }
    write(d) {
        this.streams.forEach((stream) => {
            stream.write(d);
        });
    }
}
