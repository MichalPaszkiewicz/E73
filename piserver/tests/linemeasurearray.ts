import { LineMeasureArray } from "../src/aggregateroots/entities/linemeasurearray";

test("line measure array gives no grouping for no line measures", () =>{

    var lineMeasureArray = new LineMeasureArray(3);

    var groupings = lineMeasureArray.getGroupings();

    expect(groupings.length).toBe(0);

});

test("line measure array gives correct single line grouping", () =>{

    var lineMeasureArray = new LineMeasureArray(3);
    lineMeasureArray.setValue(0, true);
    lineMeasureArray.setValue(1, true);

    var groupings = lineMeasureArray.getGroupings();

    expect(groupings.length).toBe(1);

});

test("line measure gives correct 2 groupings for 2 lines with break", () => {

    var lineMeasureArray = new LineMeasureArray(5);
    lineMeasureArray.setValue(0, true);
    lineMeasureArray.setValue(2, true);
    lineMeasureArray.setValue(3, true);

    var groupings = lineMeasureArray.getGroupings();

    expect(groupings.length).toBe(2);

    expect(groupings[0][0]).toBe(0);
    expect(groupings[1][0]).toBe(2);
    expect(groupings[1][1]).toBe(3);
});

test("line measure gives correct position for 10000", () => {

    var lineMeasureArray = new LineMeasureArray(5);
    lineMeasureArray.setValue(0, true);

    expect(lineMeasureArray.getLinePosition()).toBe(-1);

});

test("line measure gives correct position for 11000", () => {

    var lineMeasureArray = new LineMeasureArray(5);
    lineMeasureArray.setValue(0, true);
    lineMeasureArray.setValue(1, true);

    expect(lineMeasureArray.getLinePosition()).toBe(-1/3);

});

test("line measure gives correct position for 11100", () => {

    var lineMeasureArray = new LineMeasureArray(5);
    lineMeasureArray.setValue(0, true);
    lineMeasureArray.setValue(1, true);
    lineMeasureArray.setValue(2, true);

    expect(lineMeasureArray.getLinePosition()).toBe(1/3);

});

test("line measure gives correct position for 00111", () => {
    var lineMeasureArray = new LineMeasureArray(5);
    lineMeasureArray.setValue(2, true);
    lineMeasureArray.setValue(3, true);
    lineMeasureArray.setValue(4, true);

    expect(lineMeasureArray.getLinePosition()).toBe(-1/3);
});
