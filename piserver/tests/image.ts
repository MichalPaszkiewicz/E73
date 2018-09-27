import {Image} from "../src/helpers/image";
import { LooseColour, LooseColourArray } from "../src/helpers/colour";
import { NumberRange } from "../src/helpers/range";

var red = new LooseColour(NumberRange.downTo(150), NumberRange.upTo(50), NumberRange.upTo(50));
var green = new LooseColour(NumberRange.upTo(50), NumberRange.downTo(150), NumberRange.upTo(76));
var white = new LooseColour(NumberRange.downTo(150), NumberRange.downTo(150), NumberRange.downTo(150));

test("image-test-1", async () => {
    await new Promise(res => 
        {
            Image.getPixels("./tests/samples/test.png", (ps) => {

                expect(ps.height).toBe(3);
                expect(ps.width).toBe(4);

                var medians = Image.getColumnMedianColours(ps, new LooseColourArray([red, green, white]), true);

                expect(medians[0]).toBe(null);
                expect(medians[1]).toBe(green);
                expect(medians[2]).toBe(red);
                expect(medians[3]).toBe(red);

                res();
            });
        }
    );
});