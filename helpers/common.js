module.exports.randomNumber = (length) => {
    return Number(Math.random()*Math.pow(10,length)).toFixed(0);
}