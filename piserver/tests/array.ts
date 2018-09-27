import { ArrayHelper } from "../src/helpers/array";

test("get-median-works", () => {

    var m = ArrayHelper.getMedian([0,1,1,1,2,3,4,5,5,5,5], (x) => x);

    expect(m).toBe(5);

    var x = {one:1};
    var y = {two:2};

    var m2 = ArrayHelper.getMedian([x,y,x,y,y,y], (z) => z);

    expect(m2).toBe(y);
});