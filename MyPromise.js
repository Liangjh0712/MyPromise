class MyPromise {
  constructor(callBack) {
    this.status = 'pending';
    this.data = null;
    this.callBackArr = [];
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    callBack(this.resolve, this.reject);
  }

  resolve(data) {
    (this.status === 'pending') && (this.status = 'fulfilled');
    this.data = data;
    this.callBackArr.forEach(arr => this.then(...arr));
    return this;
  }

  reject(err) {
    (this.status === 'pending') && (this.status = 'rejected');
    this.data = err;
    return this;
  }

  then(callBackSuccess, callBackError) {
    if (this.status === 'pending') {
      this.callBackArr.push([callBackSuccess, callBackError]);
    } else if (this.status === 'fulfilled') {
      this.data = callBackSuccess(this.data);
    } else if (this.status === 'rejected') {
      this.data = callBackError(this.data);
    }
    return this;
  }
}

// new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(4);
//   }, 4);
//   reject(new Error('aksdhbaksjd;lakdlabn'));
// }).then(data => {
//   return data;
// }, err => {
//   console.log(err.message);
// }).then(data => {
//   console.log(data);
// });

var promise = new MyPromise(function (resolve, reject) {
  setTimeout(function () {
    console.log('A');
    resolve(1);
  }, 4);
});
promise.then(function (data) {
  return new MyPromise(function (resolve, reject) {
    setTimeout(function () {
      console.log('b');
      resolve(2);
    }, 4);
  });
}).then(function (data) {
  return console.log(data);
});