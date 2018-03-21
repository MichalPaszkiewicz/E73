import {ControlPermutation} from "../src/objects/controlpermutation";

test("toString method returns correct format for forward", () => {

    var controlPermutation = new ControlPermutation(true, false, false, false, 1, 1);

    expect(controlPermutation.toString()).toMatchSnapshot();
});

test("toString method returns correct format for backward", () => {

    var controlPermutation = new ControlPermutation(false, true, false, false, 1, 1);

    expect(controlPermutation.toString()).toMatchSnapshot();
});

test("toString method returns correct format for left", () => {

    var controlPermutation = new ControlPermutation(false, false, true, false, 1, 1);

    expect(controlPermutation.toString()).toMatchSnapshot();
});

test("toString method returns correct format for right", () => {

    var controlPermutation = new ControlPermutation(false, false, false, true, 1, 1);

    expect(controlPermutation.toString()).toMatchSnapshot();
});

test("toString method returns correct format for forward left", () => {

    var controlPermutation = new ControlPermutation(true, false, true, false, 1, 1);

    expect(controlPermutation.toString()).toMatchSnapshot();
});

test("toString method returns correct format for forward right", () => {

    var controlPermutation = new ControlPermutation(true, false, false, true, 1, 1);

    expect(controlPermutation.toString()).toMatchSnapshot();
});

test("toString method returns correct format for backward left", () => {

    var controlPermutation = new ControlPermutation(false, true, true, false, 1, 1);

    expect(controlPermutation.toString()).toMatchSnapshot();
});

test("toString method returns correct format for backward right", () => {

    var controlPermutation = new ControlPermutation(false, true, false, true, 1, 1);

    expect(controlPermutation.toString()).toMatchSnapshot();
});

test("is equal tests a control permutations is equal to directional values", () => {

    var controlPermutation = new ControlPermutation(true, true, false, true, 1, 1);

    expect(controlPermutation.isEqual(true, true, false, true)).toBe(true);
});

test("is equal tests a control permutation is not equal to bad directional values", () => {

    var controlPermutation = new ControlPermutation(false, true, false, false, 1, 1);

    expect(controlPermutation.isEqual(true, false, false, false)).toBe(false);
});