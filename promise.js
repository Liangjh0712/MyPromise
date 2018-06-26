"use strict";
var MyPromise = /** @class */ (function () {
    function MyPromise(callBack) {
        var _this_1 = this;
        this.resolve = function (data) {
            (_this_1.status === 'pending') && (_this_1.status = 'fulfilled');
            _this_1.execute(data);
            return _this_1;
        };
        this.reject = function (err) {
            (_this_1.status === 'pending') && (_this_1.status = 'rejected');
            _this_1.execute(err);
            return _this_1;
        };
        this.status = 'pending';
        this.callBackArr = [];
        callBack(this.resolve, this.reject);
    }
    MyPromise.prototype.then = function (callBackSuccess, callBackError) {
        this.callBackArr.push([callBackSuccess, callBackError]);
        return this;
    };
    MyPromise.prototype.catch = function (callBack) {
        return this;
    };
    MyPromise.prototype.execute = function (data) {
        var _a;
        if (this.callBackArr.length < 1)
            return this;
        var callBack;
        if (this.status === 'fulfilled') {
            callBack = this.callBackArr.shift()[0];
        }
        else if (this.status === 'rejected') {
            var callBackError = this.callBackArr.shift()[1];
            callBack = callBackError;
            if (!callBackError) {
                throw new Error();
                return this;
            }
        }
        if (callBack) {
            var result = callBack(data);
            if (result instanceof MyPromise) {
                (_a = result.callBackArr).push.apply(_a, this.callBackArr);
                this.callBackArr.length = 0;
            }
            else {
                this.execute(result);
            }
        }
        return this;
    };
    MyPromise.prototype.getCatchCallBack = function () { };
    return MyPromise;
}());
// type MyPromiseType = MyPromise;
var test = new MyPromise(function (resolve, reject) {
    setTimeout(function () {
        reject(4);
    });
});
test.then(function (data) {
    console.log(data);
    return new MyPromise(function (resolve, reject) {
        setTimeout(function () {
            console.log(5);
            resolve(5);
        });
        reject(7);
    });
}, function (error) {
    console.log(error);
    return 9;
}).then(function (data) {
    console.log(data);
});
