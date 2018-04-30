import { LineMeasureArrayMemory } from "../src/aggregateroots/entities/linemeasurearraymemory";

test("line measure array memory removes new split line", () => {

    var lineMeasureMemoryArray = new LineMeasureArrayMemory(5, 2);

    lineMeasureMemoryArray.setValue(4, true);
    lineMeasureMemoryArray.setValue(1, true);

    var vals = lineMeasureMemoryArray.getValues();

    expect(vals[0]).toBe(false);
    expect(vals[1]).toBe(false);
    expect(vals[2]).toBe(false);
    expect(vals[3]).toBe(false);
    expect(vals[4]).toBe(true);
});

test("line measure array memory keeps exanding line", () => {

    var lineMeasureMemoryArray = new LineMeasureArrayMemory(5, 2);

    lineMeasureMemoryArray.setValue(4, true);
    lineMeasureMemoryArray.setValue(3, true);

    var vals = lineMeasureMemoryArray.getValues();

    expect(vals[0]).toBe(false);
    expect(vals[1]).toBe(false);
    expect(vals[2]).toBe(false);
    expect(vals[3]).toBe(true);
    expect(vals[4]).toBe(true);
});

test("line measure array memory keeps exanding line  with second dummy in between", () => {

    var lineMeasureMemoryArray = new LineMeasureArrayMemory(5, 2);

    lineMeasureMemoryArray.setValue(4, true);
    lineMeasureMemoryArray.setValue(1, true);   
    lineMeasureMemoryArray.setValue(3, true);

    var vals = lineMeasureMemoryArray.getValues();

    expect(vals[0]).toBe(false);
    expect(vals[1]).toBe(false);
    expect(vals[2]).toBe(false);
    expect(vals[3]).toBe(true);
    expect(vals[4]).toBe(true);
});

test("line measure array memory understands current line value after merge of two lines", () => {

    var lineMeasureMemoryArray = new LineMeasureArrayMemory(5, 2);

    lineMeasureMemoryArray.setValue(4, true);
    lineMeasureMemoryArray.setValue(2, true);   
    lineMeasureMemoryArray.setValue(3, true);

    var vals = lineMeasureMemoryArray.getValues();

    expect(vals[0]).toBe(false);
    expect(vals[1]).toBe(false);
    expect(vals[2]).toBe(true);
    expect(vals[3]).toBe(true);
    expect(vals[4]).toBe(true);
});

test("sudden change returns emptys", () => {

    var lineMeasureMemoryArray = new LineMeasureArrayMemory(5, 3);

    lineMeasureMemoryArray.setValue(0, true);
    lineMeasureMemoryArray.setValue(0, false);    
    lineMeasureMemoryArray.setValue(4, true);

    var vals = lineMeasureMemoryArray.getValues();

    expect(vals[0]).toBe(false);
    expect(vals[1]).toBe(false);
    expect(vals[2]).toBe(false);
    expect(vals[3]).toBe(false);
    expect(vals[4]).toBe(false);
});

test("sudden loss returns empty on distraction line", () => {

    var lineMeasureMemoryArray = new LineMeasureArrayMemory(5, 3);

    lineMeasureMemoryArray.setValue(0, true);
    lineMeasureMemoryArray.setValue(4, true);    
    lineMeasureMemoryArray.setValue(0, false);    

    var vals = lineMeasureMemoryArray.getValues();

    expect(vals[0]).toBe(false);
    expect(vals[1]).toBe(false);
    expect(vals[2]).toBe(false);
    expect(vals[3]).toBe(false);
    expect(vals[4]).toBe(false);

});