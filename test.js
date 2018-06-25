var promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        console.log('A');
        resolve(1);
    }, 4);
});
promise.then(function (data) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('b');
            resolve(2);
        }, 4);
    });
}).then(function (data) {
    return console.log(data);
});