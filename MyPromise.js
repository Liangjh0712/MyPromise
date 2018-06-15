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
    this.status = 'fulfilled';
    this.data = data;
    this.callBackArr.forEach(arr => this.then(...arr));
    return this;
  }

  reject(err) {
    this.status = 'rejected';
    this.data = err;
    return this;
  }

  then(callBackSuccess, callBackError) {
    if (this.status === 'pending') {
      this.callBackArr.push([callBackSuccess, callBackError]);
    } else if (this.status === 'fulfilled') {
      callBackSuccess(this.data);
    } else if (this.status === 'rejected') {
      callBackError(this.data);
    }
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(4);
  }, 4);
}).then(data => {
  console.log(data);
});