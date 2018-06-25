const promise = new Promise((resolve: Function, reject: Function) => {
  setTimeout(() => { resolve(1) }, 4);
});

promise.then((data: any) => {
  new Promise((resolve: Function, reject: Function) => {
    setTimeout(() => { resolve(2) }, 4);
  });
}).then((data: any): void => console.log(data));