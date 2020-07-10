const cluster = require('cluster');
const CPUCount = 1;
// Geting CPU count
// Child process create need many resourses, so in conjunction with 8 cores and nodemon it gives lags while saving
// Recomended during active development set CPU count to 1, or you will have lags
const Logger = require('../logger');
const logger = new Logger(); //  Загрузить логгер!
cluster.on('disconnect', (worker, code, signal) => {
    logger.log(`Worker ${worker.id} died`);
    cluster.fork();
});

cluster.on('online', (worker) => {
    logger.log(`Worker ${worker.id} running`);
});

for (let i = 0; i < CPUCount; ++i) {
    cluster.fork();
}
