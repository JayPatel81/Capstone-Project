function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    let d = mm + '/' + dd + '/' + yyyy
    let t = today.getHours() + ':' + today.getMinutes()

    return [d,t]
}

module.exports = {getDate}