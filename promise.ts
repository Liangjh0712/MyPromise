class MyPromise {
  private status: string;
  private data: any;
  private callBackArr: any[];
  constructor(callBack: Function) {
    this.status = 'pending';
    this.data = null;
    this.callBackArr = [];
    callBack(this.resolve, this.reject);
  }

  public resolve(data: any): Object {
    (this.status === 'pending') && (this.status = 'fulfilled');
    this.data = data;
    this.callBackArr.forEach((arr: Array<Function>) => this.then(...arr));
    return this;
  }

  public reject(err): Object {
    (this.status === 'pending') && (this.status = 'rejected');
    this.data = err;
    return this;
  }

  public then(callBackSuccess?: Function, callBackError?: Function): Object {
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

