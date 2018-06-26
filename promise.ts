class MyPromise implements MyPromiseInterFace {
  private status: string;
  private callBackArr: Array<Function>[] | Object[];
  constructor(callBack: Function) {
    this.status = 'pending';
    this.callBackArr = [];
    callBack(this.resolve, this.reject);
  }

  public resolve = (data: any) => {
    (this.status === 'pending') && (this.status = 'fulfilled');
    this.execute(data);
    return this;
  }

  public reject = (err: any) => {
    (this.status === 'pending') && (this.status = 'rejected');
    this.execute(err);
    return this;
  }

  public then(callBackSuccess: Function, callBackError: Function) {
    (<Array<Function[]>>this.callBackArr).push([callBackSuccess, callBackError]);
    return this;
  }

  public catch(callBack: Function) {
    return this;
  }

  private execute(data?: any): _this {
    if (this.callBackArr.length < 1) return this;
    let callBack: any;
    if (this.status === 'fulfilled') {
      callBack = (this.callBackArr.shift() as Array<Function>)[0];
    } else if (this.status === 'rejected') {
      let callBackError = (this.callBackArr.shift() as Array<Function>)[1];
      callBack = callBackError;
      if (!callBackError) {

        throw new Error();
        return this;
      }
    }
    if (callBack as Function) {
      let result: any = callBack(data);
      if (result instanceof MyPromise) {
        (<Array<Function>>result.callBackArr).push(...(<Array<Function>>this.callBackArr));
        this.callBackArr.length = 0;
      } else {
        this.execute(result);
      }
    }
    return this;
  }

  private getCatchCallBack() { }
}

interface MyPromiseInterFace {
  resolve(data: any): Object;
  reject(err: any): Object;
  then(callBackSuccess: Function, callBackError: Function): Object;
  catch(callBack: Function): Object;
}

interface _this<T> {

}
// type MyPromiseType = MyPromise;

let test = new MyPromise((resolve: Function, reject: Function) => {
  setTimeout(() => {
    reject(4);
  });
});

test.then((data: any) => {
  console.log(data);
  return new MyPromise((resolve: Function, reject: Function) => {
    setTimeout(() => {
      console.log(5);
      resolve(5);
    });
    reject(7);
  });
}, (error: Error) => {
  console.log(error);
  return 9
}).then((data: any) => {
  console.log(data);
})