const RGB_OR_RGBA_REGEX =
    /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([01]?\.?\d*)\s*)?\)/i;
const HEXADECIMAL_REGEX = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;
const HSLA_REGEX =
    /hsla\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d.]+)\s*\)/i;

const hWB_REGEX =
    /hwb\(\s*(\d+\.?\d*)\s*(\d+\.?\d*)%\s*(\d+\.?\d*)%\s*(?:\/\s*([\d.]+))?\s*\)/i;

const LAB_REGEX =
    /lab\(\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*(?:,\s*([\d.]+)\s*)?\)/i;

const SRGB_REGEX =
    /color\(srgb\s*(\d+\.?\d*)\s*(\d+\.?\d*)\s*(\d+\.?\d*)(?:\s*(\d+\.?\d*))?\)/i;

export enum CSSColorFormat {
    HEXADECIMAL,
    RGBA,
    HSLA,
    HWB,
    LAB,
    OK_LAB,
    COLOR_NAME_KEYWORDS,
    GRAY,
    COLOR_FUNCTION,
}

export const CSS_COLOR_NAMES = [
    { name: "aqua", hex: "#00FFFFFF" },
    { name: "black", hex: "#000000FF" },
    { name: "blue", hex: "#0000FFFF" },
    { name: "fuchsia", hex: "#FF00FFFF" },
    { name: "gray", hex: "#808080FF" },
    { name: "green", hex: "#008000FF" },
    { name: "lime", hex: "#00FF00FF" },
    { name: "maroon", hex: "#800000FF" },
    { name: "navy", hex: "#000080FF" },
    { name: "olive", hex: "#808000FF" },
    { name: "purple", hex: "#800080FF" },
    { name: "red", hex: "#FF0000FF" },
    { name: "silver", hex: "#C0C0C0FF" },
    { name: "teal", hex: "#008080FF" },
    { name: "white", hex: "#FFFFFFFF" },
    { name: "yellow", hex: "#FFFF00FF" },
    { name: "aliceblue", hex: "#F0F8FFFF" },
    { name: "antiquewhite", hex: "#FAEBD7FF" },
    { name: "aquamarine", hex: "#7FFFD4FF" },
    { name: "azure", hex: "#F0FFFFFF" },
    { name: "beige", hex: "#F5F5DCFF" },
    { name: "bisque", hex: "#FFE4C4FF" },
    { name: "blanchedalmond", hex: "#FFEBCDFF" },
    { name: "blueviolet", hex: "#8A2BE2FF" },
    { name: "brown", hex: "#A52A2AFF" },
    { name: "burlywood", hex: "#DEB887FF" },
    { name: "cadetblue", hex: "#5F9EA0FF" },
    { name: "chartreuse", hex: "#7FFF00FF" },
    { name: "chocolate", hex: "#D2691EFF" },
    { name: "coral", hex: "#FF7F50FF" },
    { name: "cornflowerblue", hex: "#6495EDFF" },
    { name: "cornsilk", hex: "#FFF8DCFF" },
    { name: "crimson", hex: "#DC143CFF" },
    { name: "cyan", hex: "#00FFFFFF" },
    { name: "darkblue", hex: "#00008BFF" },
    { name: "darkcyan", hex: "#008B8BFF" },
    { name: "darkgoldenrod", hex: "#B8860BFF" },
    { name: "darkgray", hex: "#A9A9A9FF" },
    { name: "darkgreen", hex: "#006400FF" },
    { name: "darkkhaki", hex: "#BDB76BFF" },
    { name: "darkmagenta", hex: "#8B008BFF" },
    { name: "darkolivegreen", hex: "#556B2FFF" },
    { name: "darkorange", hex: "#FF8C00FF" },
    { name: "darkorchid", hex: "#9932CCFF" },
    { name: "darkred", hex: "#8B0000FF" },
    { name: "darksalmon", hex: "#E9967AFF" },
    { name: "darkseagreen", hex: "#8FBC8FFF" },
    { name: "darkslateblue", hex: "#483D8BFF" },
    { name: "darkslategray", hex: "#2F4F4FFF" },
    { name: "darkturquoise", hex: "#00CED1FF" },
    { name: "darkviolet", hex: "#9400D3FF" },
    { name: "deeppink", hex: "#FF1493FF" },
    { name: "deepskyblue", hex: "#00BFFFFF" },
    { name: "dimgray", hex: "#696969FF" },
    { name: "dodgerblue", hex: "#1E90FFFF" },
    { name: "firebrick", hex: "#B22222FF" },
    { name: "floralwhite", hex: "#FFFAF0FF" },
    { name: "forestgreen", hex: "#228B22FF" },
    { name: "gainsboro", hex: "#DCDCDCFF" },
    { name: "ghostwhite", hex: "#F8F8FFFF" },
    { name: "gold", hex: "#FFD700FF" },
    { name: "goldenrod", hex: "#DAA520FF" },
    { name: "greenyellow", hex: "#ADFF2FFF" },
    { name: "honeydew", hex: "#F0FFF0FF" },
    { name: "hotpink", hex: "#FF69B4FF" },
    { name: "indianred", hex: "#CD5C5CFF" },
    { name: "indigo", hex: "#4B0082FF" },
    { name: "ivory", hex: "#FFFFF0FF" },
    { name: "khaki", hex: "#F0E68CFF" },
    { name: "lavender", hex: "#E6E6FAFF" },
    { name: "lavenderblush", hex: "#FFF0F5FF" },
    { name: "lawngreen", hex: "#7CFC00FF" },
    { name: "lemonchiffon", hex: "#FFFACDFF" },
    { name: "lightblue", hex: "#ADD8E6FF" },
    { name: "lightcoral", hex: "#F08080FF" },
    { name: "lightcyan", hex: "#E0FFFFFF" },
    { name: "lightgoldenrodyellow", hex: "#FAFAD2FF" },
    { name: "lightgray", hex: "#D3D3D3FF" },
    { name: "lightgreen", hex: "#90EE90FF" },
    { name: "lightpink", hex: "#FFB6C1FF" },
    { name: "lightsalmon", hex: "#FFA07AFF" },
    { name: "lightseagreen", hex: "#20B2AAFF" },
    { name: "lightskyblue", hex: "#87CEFAFF" },
    { name: "lightslategray", hex: "#778899FF" },
    { name: "lightsteelblue", hex: "#B0C4DEFF" },
    { name: "lightyellow", hex: "#FFFFE0FF" },
    { name: "limegreen", hex: "#32CD32FF" },
    { name: "linen", hex: "#FAF0E6FF" },
    { name: "magenta", hex: "#FF00FFFF" },
    { name: "mediumaquamarine", hex: "#66CDAAFF" },
    { name: "mediumblue", hex: "#0000CDFF" },
    { name: "mediumorchid", hex: "#BA55D3FF" },
    { name: "mediumpurple", hex: "#9370DBFF" },
    { name: "mediumseagreen", hex: "#3CB371FF" },
    { name: "mediumslateblue", hex: "#7B68EEFF" },
    { name: "mediumspringgreen", hex: "#00FA9AFF" },
    { name: "mediumturquoise", hex: "#48D1CCFF" },
    { name: "mediumvioletred", hex: "#C71585FF" },
    { name: "midnightblue", hex: "#191970FF" },
    { name: "mintcream", hex: "#F5FFFAFF" },
    { name: "mistyrose", hex: "#FFE4E1FF" },
    { name: "moccasin", hex: "#FFE4B5FF" },
    { name: "navajowhite", hex: "#FFDEADFF" },
    { name: "oldlace", hex: "#FDF5E6FF" },
    { name: "olivedrab", hex: "#6B8E23FF" },
    { name: "orangered", hex: "#FF4500FF" },
    { name: "orchid", hex: "#DA70D6FF" },
    { name: "palegoldenrod", hex: "#EEE8AAFF" },
    { name: "palegreen", hex: "#98FB98FF" },
    { name: "paleturquoise", hex: "#AFEEEEFF" },
    { name: "palevioletred", hex: "#DB7093FF" },
    { name: "papayawhip", hex: "#FFEFD5FF" },
    { name: "peachpuff", hex: "#FFDAB9FF" },
    { name: "peru", hex: "#CD853FFF" },
    { name: "pink", hex: "#FFC0CBFF" },
    { name: "plum", hex: "#DDA0DDFF" },
    { name: "powderblue", hex: "#B0E0E6FF" },
    { name: "rosybrown", hex: "#BC8F8FFF" },
    { name: "royalblue", hex: "#4169E1FF" },
    { name: "saddlebrown", hex: "#8B4513FF" },
    { name: "salmon", hex: "#FA8072FF" },
    { name: "sandybrown", hex: "#F4A460FF" },
    { name: "seagreen", hex: "#2E8B57FF" },
    { name: "seashell", hex: "#FFF5EEFF" },
    { name: "sienna", hex: "#A0522DFF" },
    { name: "skyblue", hex: "#87CEEBFF" },
    { name: "slateblue", hex: "#6A5ACDFF" },
    { name: "slategray", hex: "#708090FF" },
    { name: "snow", hex: "#FFFAFAFF" },
    { name: "springgreen", hex: "#00FF7FFF" },
    { name: "steelblue", hex: "#4682B4FF" },
    { name: "tan", hex: "#D2B48CFF" },
    { name: "thistle", hex: "#D8BFD8FF" },
    { name: "tomato", hex: "#FF6347FF" },
    { name: "turquoise", hex: "#40E0D0FF" },
    { name: "violet", hex: "#EE82EEFF" },
    { name: "wheat", hex: "#F5DEB3FF" },
    { name: "whitesmoke", hex: "#F5F5F5FF" },
    { name: "yellowgreen", hex: "#9ACD32FF" },
];

export function rgbaToHexadecimal(rgbaValue: string): string | null {
    const validRgba = RGB_OR_RGBA_REGEX.exec(rgbaValue);
    if (!validRgba) return null;
    const red = parseInt(validRgba[1], 10);
    const green = parseInt(validRgba[2], 10);
    const blue = parseInt(validRgba[3], 10);
    let alpha = validRgba[4] !== undefined ? parseFloat(validRgba[4]) : 1;
    if (isNaN(alpha)) {
        alpha = 1;
    }

    const toHex = (n: number) => n.toString(16).padStart(2, "0");
    return `#${toHex(red)}${toHex(green)}${toHex(blue)}${
        toHex(Math.round(alpha * 255))
    }`;
}

export function hexadecimalToRgba(hexValue: string): string | null {
    const isValidHex = HEXADECIMAL_REGEX.test(hexValue);
    if (!isValidHex) return null;
    // Remove the leading # if present
    const hex = hexValue.replace(/^#/, "");
    const red = parseInt(hex.slice(0, 2), 16);
    const green = parseInt(hex.slice(2, 4), 16);
    const blue = parseInt(hex.slice(4, 6), 16);
    // Check if it's a 6-character or 8-character hex code
    switch (hex.length) {
        case 6:
            // If no alpha is provided, assume full opacity
            return `rgba(${red}, ${green}, ${blue}, 1)`; // No alpha, default to 1
        case 8: {
            // If 8-character hex code (includes alpha)
            const alpha = parseInt(hex.slice(6, 8), 16) / 255; // Normalize alpha to 0-1
            return `rgba(${red}, ${green}, ${blue}, ${alpha.toFixed(2)})`; // Include alpha
        }
        default:
            return null;
    }
}

export function rgbaToHsla(rgbaValue: string): string | null {
    const validRgba = RGB_OR_RGBA_REGEX.exec(rgbaValue);
    if (!validRgba) return null;
    const red = parseInt(validRgba[1], 10) / 255;
    const green = parseInt(validRgba[2], 10) / 255;
    const blue = parseInt(validRgba[3], 10) / 255;
    // Default alpha to 1 if not present for rgb
    const alpha = validRgba[4] !== undefined ? parseFloat(validRgba[4]) : 1;

    // Find min and max values of RGB to determine lightness
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;

    // Calculate lightness
    let hue: number;
    let saturation: number;
    const lightness = (max + min) / 2;

    if (delta === 0) {
        // If delta is 0, it means there is no saturation, so it's a shade of gray
        hue = 0;
        saturation = 0;
    } else {
        // calculate the saturation
        saturation = lightness > 0.5
            ? delta / (2 - max - min)
            : delta / (max + min);

        // calculate hue
        switch (max) {
            case red:
                hue = ((green - blue) / delta + (green < blue ? 6 : 0)) * 60;
                break;
            case green:
                hue = ((blue - red) / delta + 2) * 60;
                break;
            case blue:
                hue = ((red - green) / delta + 4) * 60;
                break;
            default:
                hue = 0;
        }
    }

    return `hsla(${hue.toFixed(1)}, ${(saturation * 100).toFixed(2)}%, ${
        (lightness * 100).toFixed(2)
    }%, ${alpha})`;
}

export function hslaToRgba(hslaValue: string): string | null {
    // Extract color values using the regex
    const validHsla = HSLA_REGEX.exec(hslaValue);

    if (!validHsla) return null;

    // Parse hue, saturation, lightness, and alpha values
    let hue = parseInt(validHsla[1], 10) / 360; // Normalize hue to 0-1
    let saturation = parseInt(validHsla[2], 10) / 100; // Normalize saturation to 0-1
    let lightness = parseInt(validHsla[3], 10) / 100; // Normalize lightness to 0-1
    let alpha = parseFloat(validHsla[4]); // Alpha value (0-1)

    // Convert HSL to RGB
    let red: number;
    let green: number;
    let blue: number;

    if (saturation === 0) {
        // Achromatic (gray)
        red = green = blue = lightness;
    } else {
        const hueToRgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = lightness < 0.5
            ? lightness * (1 + saturation)
            : lightness + saturation - lightness * saturation;
        const p = 2 * lightness - q;

        red = hueToRgb(p, q, hue + 1 / 3);
        green = hueToRgb(p, q, hue);
        blue = hueToRgb(p, q, hue - 1 / 3);
    }

    // Convert RGB values to 0-255 range
    red = Math.round(red * 255);
    green = Math.round(green * 255);
    blue = Math.round(blue * 255);

    // Return RGBA in CSS-compatible string format
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function rgbaToRgba(rgbaValue: string): string | null {
    const validRgba = RGB_OR_RGBA_REGEX.exec(rgbaValue);
    if (!validRgba) return null;
    return rgbaValue;
}

export function rgbaToHwb(rgbaValue: string): string | null {
    console.log("rgbaToHwb is ", rgbaValue);
    const validRgba = RGB_OR_RGBA_REGEX.exec(rgbaValue);
    if (!validRgba) return null;
    const red = parseInt(validRgba[1], 10) / 255;
    const green = parseInt(validRgba[2], 10) / 255;
    const blue = parseInt(validRgba[3], 10) / 255;
    // Default alpha to 1 if not present for rgb
    const alpha = validRgba[4] !== undefined ? parseFloat(validRgba[4]) : 1;

    // Find min and max values of RGB to determine lightness
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;

    //  Calculate hue
    let hue = 0;
    if (delta === 0) {
        hue = 0;
    } else {
        switch (max) {
            case red:
                hue = (60 * ((green - blue) / delta) + 360) % 360;
                break;
            case green:
                hue = (60 * ((blue - red) / delta) + 120) % 360;
            default:
                hue = (60 * ((red - green) / delta) + 240) % 360;
        }
    }

    // calculate whiteness and blackness
    const w = min;
    const v = max;
    const bValue = 1 - v;

    // calculate whiteness and blackness to percentages
    const whiteness = w * 100;
    const blackness = bValue * 100;
    return `hwb(${hue.toFixed(1)} ${whiteness.toFixed(2)}% ${
        blackness.toFixed(2)
    }% / ${alpha})`;
}

export function hwbToRgba(hwbValue: string): string | null {
    return null;
}

export function rgbaToLab(rgbaValue: string): string | null {
    const validRgba = RGB_OR_RGBA_REGEX.exec(rgbaValue);
    if (!validRgba) return null;

    let red = parseInt(validRgba[1], 10) / 255;
    let green = parseInt(validRgba[2], 10) / 255;
    let blue = parseInt(validRgba[3], 10) / 255;

    // Apply gamma correction to convert to linear RGB
    const gammaCorrect = (v: number) =>
        v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    red = gammaCorrect(red);
    green = gammaCorrect(green);
    blue = gammaCorrect(blue);

    // Convert linear RGB to XYZ
    const x = red * 0.4124564 + green * 0.3575761 + blue * 0.1804375;
    const y = red * 0.2126729 + green * 0.7151522 + blue * 0.0721750;
    const z = red * 0.0193339 + green * 0.1191920 + blue * 0.9503041;

    // Normalize for the D65 illuminant
    const xn = x / 0.95047;
    const yn = y / 1.00000;
    const zn = z / 1.08883;

    // Convert XYZ to Lab
    const f = (v: number) =>
        v > 0.008856 ? Math.pow(v, 1 / 3) : (7.787 * v) + (16 / 116);

    const l = (116 * f(yn)) - 16;
    const a = 500 * (f(xn) - f(yn));
    const bLab = 200 * (f(yn) - f(zn));

    // Return CSS-compatible Lab format
    return `lab(${l.toFixed(2)}% ${a.toFixed(2)} ${bLab.toFixed(2)})`;
}

export function labToRgba(labValue: string): string | null {
    return null;
}

export function rgbaToOkLab(rgbaValue: string): string | null {
    return null;
}

export function okLabToRgba(okLabValue: string): string | null {
    // Regular expression to match oklab color strings
    const OKLAB_REGEX =
        /oklab\(\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*(?:,\s*([\d.]+)\s*)?\)/i;

    // Extract color values using the regex
    const validOkLab = OKLAB_REGEX.exec(okLabValue);

    if (!validOkLab) return null;

    // Parse L, a, b, and alpha values
    const L = parseFloat(validOkLab[1]);
    const a = parseFloat(validOkLab[2]);
    const b = parseFloat(validOkLab[3]);
    const alpha = validOkLab[4] !== undefined ? parseFloat(validOkLab[4]) : 1;

    // Convert OKLAB to Linear RGB
    const l = (L + 0.3963377774 * a + 0.2158037570 * b) / 1.0;
    const m = (L - 0.1055613458 * a - 0.0638541728 * b) / 1.0;
    const s = (L - 0.0894841775 * a - 1.2914855480 * b) / 1.0;

    let red = (l * 4.0767416621 - m * 3.3077115913 + s * 0.2309699292) * 255;
    let green = (-l * 1.2681431962 + m * 2.6094379028 - s * 0.3413141373) * 255;
    let blue = (l * 0.0678825633 - m * 0.2606145230 + s * 1.2624273556) * 255;

    // Clamp RGB values to [0, 255] range
    red = Math.round(Math.max(0, Math.min(255, red)));
    green = Math.round(Math.max(0, Math.min(255, green)));
    blue = Math.round(Math.max(0, Math.min(255, blue)));

    // Return RGBA in CSS-compatible string format
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function rgbaToColorName(rgbaValue: string): string | null {
    console.log("in rgba color name");
    console.log("received ->", rgbaValue);
    const hex = rgbaToHexadecimal(rgbaValue);
    console.log("hex is", hex);
    if (!hex) return null;
    const match = CSS_COLOR_NAMES.find((c) => c.hex === hex.toUpperCase());
    console.log("match is", match);
    if (!match) return null;
    return match.name;
}

export function colorNameToRgba(colorName: string): string | null {
    const match = CSS_COLOR_NAMES.find((c) =>
        c.name === colorName.toLowerCase()
    );
    if (!match) return null;
    return hexadecimalToRgba(match.hex);
}

export function rgbaToGray(rgbaValue: string): string | null {
    return null;
}

export function grayToRgba(grayValue: string): string | null {
    return null;
}

export function rgbaToColorFunction(rgbaValue: string): string | null {
    const validRgba = RGB_OR_RGBA_REGEX.exec(rgbaValue);
    if (!validRgba) return null;
    const red = parseInt(validRgba[1], 10) / 255;
    const green = parseInt(validRgba[2], 10) / 255;
    const blue = parseInt(validRgba[3], 10) / 255;
    // Default alpha to 1 if not present for rgb
    const alpha = validRgba[4] !== undefined ? parseFloat(validRgba[4]) : 1;

    // Return color(srgb) format
    return alpha < 1
        ? `color(srgb ${red.toFixed(4)} ${green.toFixed(4)} ${
            blue.toFixed(4)
        } / ${alpha})`
        : `color(srgb ${red.toFixed(4)} ${green.toFixed(4)} ${
            blue.toFixed(4)
        })`;
}

export function colorFunctionToRgba(colorFunctionValue: string): string | null {
    // Regular expression to match the color(srgb ...) format

    // Check for srgb() format
    let validSrgb = SRGB_REGEX.exec(colorFunctionValue);
    if (!validSrgb) return null;
    const red = clamp(parseFloat(validSrgb[1]) * 255, 0, 255);
    const green = clamp(parseFloat(validSrgb[2]) * 255, 0, 255);
    const blue = clamp(parseFloat(validSrgb[3]) * 255, 0, 255);
    const alpha = validSrgb[4] !== undefined ? parseFloat(validSrgb[4]) : 1;
    return `rgba(${Math.round(red)}, ${Math.round(green)}, ${
        Math.round(blue)
    }, ${alpha})`;
}

function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
}
