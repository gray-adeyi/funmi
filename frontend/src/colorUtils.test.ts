import {expect, test} from 'bun:test'
import { rgbaToHexadecimal } from './colorUtils'

test("rgbaToHexadecimal", () => {
    expect(rgbaToHexadecimal("rgba(1,23,20)")).toBe("");
})