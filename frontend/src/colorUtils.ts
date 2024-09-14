const RGB_OR_RGBA_REGEX =
    /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([01]?\.?\d*)\s*)?\)/gi;

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
    { name: "aqua", hex: "#00FFFF" },
    { name: "black", hex: "#000000" },
    { name: "blue", hex: "#0000FF" },
    { name: "fuchsia", hex: "#FF00FF" },
    { name: "gray", hex: "#808080" },
    { name: "green", hex: "#008000" },
    { name: "lime", hex: "#00FF00" },
    { name: "maroon", hex: "#800000" },
    { name: "navy", hex: "#000080" },
    { name: "olive", hex: "#808000" },
    { name: "purple", hex: "#800080" },
    { name: "red", hex: "#FF0000" },
    { name: "silver", hex: "#C0C0C0" },
    { name: "teal", hex: "#008080" },
    { name: "white", hex: "#FFFFFF" },
    { name: "yellow", hex: "#FFFF00" },
    { name: "aliceblue", hex: "#F0F8FF" },
    { name: "antiquewhite", hex: "#FAEBD7" },
    { name: "aquamarine", hex: "#7FFFD4" },
    { name: "azure", hex: "#F0FFFF" },
    { name: "beige", hex: "#F5F5DC" },
    { name: "bisque", hex: "#FFE4C4" },
    { name: "blanchedalmond", hex: "#FFEBCD" },
    { name: "blueviolet", hex: "#8A2BE2" },
    { name: "brown", hex: "#A52A2A" },
    { name: "burlywood", hex: "#DEB887" },
    { name: "cadetblue", hex: "#5F9EA0" },
    { name: "chartreuse", hex: "#7FFF00" },
    { name: "chocolate", hex: "#D2691E" },
    { name: "coral", hex: "#FF7F50" },
    { name: "cornflowerblue", hex: "#6495ED" },
    { name: "cornsilk", hex: "#FFF8DC" },
    { name: "crimson", hex: "#DC143C" },
    { name: "cyan", hex: "#00FFFF" },
    { name: "darkblue", hex: "#00008B" },
    { name: "darkcyan", hex: "#008B8B" },
    { name: "darkgoldenrod", hex: "#B8860B" },
    { name: "darkgray", hex: "#A9A9A9" },
    { name: "darkgreen", hex: "#006400" },
    { name: "darkkhaki", hex: "#BDB76B" },
    { name: "darkmagenta", hex: "#8B008B" },
    { name: "darkolivegreen", hex: "#556B2F" },
    { name: "darkorange", hex: "#FF8C00" },
    { name: "darkorchid", hex: "#9932CC" },
    { name: "darkred", hex: "#8B0000" },
    { name: "darksalmon", hex: "#E9967A" },
    { name: "darkseagreen", hex: "#8FBC8F" },
    { name: "darkslateblue", hex: "#483D8B" },
    { name: "darkslategray", hex: "#2F4F4F" },
    { name: "darkturquoise", hex: "#00CED1" },
    { name: "darkviolet", hex: "#9400D3" },
    { name: "deeppink", hex: "#FF1493" },
    { name: "deepskyblue", hex: "#00BFFF" },
    { name: "dimgray", hex: "#696969" },
    { name: "dodgerblue", hex: "#1E90FF" },
    { name: "firebrick", hex: "#B22222" },
    { name: "floralwhite", hex: "#FFFAF0" },
    { name: "forestgreen", hex: "#228B22" },
    { name: "gainsboro", hex: "#DCDCDC" },
    { name: "ghostwhite", hex: "#F8F8FF" },
    { name: "gold", hex: "#FFD700" },
    { name: "goldenrod", hex: "#DAA520" },
    { name: "greenyellow", hex: "#ADFF2F" },
    { name: "honeydew", hex: "#F0FFF0" },
    { name: "hotpink", hex: "#FF69B4" },
    { name: "indianred", hex: "#CD5C5C" },
    { name: "indigo", hex: "#4B0082" },
    { name: "ivory", hex: "#FFFFF0" },
    { name: "khaki", hex: "#F0E68C" },
    { name: "lavender", hex: "#E6E6FA" },
    { name: "lavenderblush", hex: "#FFF0F5" },
    { name: "lawngreen", hex: "#7CFC00" },
    { name: "lemonchiffon", hex: "#FFFACD" },
    { name: "lightblue", hex: "#ADD8E6" },
    { name: "lightcoral", hex: "#F08080" },
    { name: "lightcyan", hex: "#E0FFFF" },
    { name: "lightgoldenrodyellow", hex: "#FAFAD2" },
    { name: "lightgray", hex: "#D3D3D3" },
    { name: "lightgreen", hex: "#90EE90" },
    { name: "lightpink", hex: "#FFB6C1" },
    { name: "lightsalmon", hex: "#FFA07A" },
    { name: "lightseagreen", hex: "#20B2AA" },
    { name: "lightskyblue", hex: "#87CEFA" },
    { name: "lightslategray", hex: "#778899" },
    { name: "lightsteelblue", hex: "#B0C4DE" },
    { name: "lightyellow", hex: "#FFFFE0" },
    { name: "limegreen", hex: "#32CD32" },
    { name: "linen", hex: "#FAF0E6" },
    { name: "magenta", hex: "#FF00FF" },
    { name: "mediumaquamarine", hex: "#66CDAA" },
    { name: "mediumblue", hex: "#0000CD" },
    { name: "mediumorchid", hex: "#BA55D3" },
    { name: "mediumpurple", hex: "#9370DB" },
    { name: "mediumseagreen", hex: "#3CB371" },
    { name: "mediumslateblue", hex: "#7B68EE" },
    { name: "mediumspringgreen", hex: "#00FA9A" },
    { name: "mediumturquoise", hex: "#48D1CC" },
    { name: "mediumvioletred", hex: "#C71585" },
    { name: "midnightblue", hex: "#191970" },
    { name: "mintcream", hex: "#F5FFFA" },
    { name: "mistyrose", hex: "#FFE4E1" },
    { name: "moccasin", hex: "#FFE4B5" },
    { name: "navajowhite", hex: "#FFDEAD" },
    { name: "oldlace", hex: "#FDF5E6" },
    { name: "olivedrab", hex: "#6B8E23" },
    { name: "orangered", hex: "#FF4500" },
    { name: "orchid", hex: "#DA70D6" },
    { name: "palegoldenrod", hex: "#EEE8AA" },
    { name: "palegreen", hex: "#98FB98" },
    { name: "paleturquoise", hex: "#AFEEEE" },
    { name: "palevioletred", hex: "#DB7093" },
    { name: "papayawhip", hex: "#FFEFD5" },
    { name: "peachpuff", hex: "#FFDAB9" },
    { name: "peru", hex: "#CD853F" },
    { name: "pink", hex: "#FFC0CB" },
    { name: "plum", hex: "#DDA0DD" },
    { name: "powderblue", hex: "#B0E0E6" },
    { name: "rosybrown", hex: "#BC8F8F" },
    { name: "royalblue", hex: "#4169E1" },
    { name: "saddlebrown", hex: "#8B4513" },
    { name: "salmon", hex: "#FA8072" },
    { name: "sandybrown", hex: "#F4A460" },
    { name: "seagreen", hex: "#2E8B57" },
    { name: "seashell", hex: "#FFF5EE" },
    { name: "sienna", hex: "#A0522D" },
    { name: "skyblue", hex: "#87CEEB" },
    { name: "slateblue", hex: "#6A5ACD" },
    { name: "slategray", hex: "#708090" },
    { name: "snow", hex: "#FFFAFA" },
    { name: "springgreen", hex: "#00FF7F" },
    { name: "steelblue", hex: "#4682B4" },
    { name: "tan", hex: "#D2B48C" },
    { name: "thistle", hex: "#D8BFD8" },
    { name: "tomato", hex: "#FF6347" },
    { name: "turquoise", hex: "#40E0D0" },
    { name: "violet", hex: "#EE82EE" },
    { name: "wheat", hex: "#F5DEB3" },
    { name: "whitesmoke", hex: "#F5F5F5" },
    { name: "yellowgreen", hex: "#9ACD32" },
];

export function rgbaToHexadecimal(rgbaValue: string): string | null {
    const validRgba = RGB_OR_RGBA_REGEX.exec(rgbaValue);
    if (!validRgba) return null;
    const red = parseInt(validRgba[1], 10);
    const green = parseInt(validRgba[2], 10);
    const blue = parseInt(validRgba[3], 10);
    const alpha = validRgba[4] !== undefined ? parseFloat(validRgba[4]) : 1;

    const toHex = (n: number) => n.toString(16).padStart(2, "0");
    return `#${toHex(red)}${toHex(green)}${toHex(blue)}${
        toHex(Math.round(alpha * 255))
    }`;
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

export function rgbaToRgba(rgbaValue: string): string | null {
const validRgba = RGB_OR_RGBA_REGEX.exec(rgbaValue);
    if (!validRgba) return null;
    return rgbaValue
}

export function rgbaToHwb(rgbaValue: string): string | null {
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
    return `hwb(${hue.toFixed(1)} ${whiteness.toFixed(2)}% ${blackness.toFixed(2)}% / ${alpha})`;
}

export function rgbaToLab(rgbaValue: string): string | null {
    return null
}

export function rgbaToOkLab(rgbaValue: string): string | null {
    return null
}

export function rgbaToColorName(rgbaValue: string): string | null {
    return null
}

export function rgbaToGray(rgbaValue: string): string | null {
    return null
}

export function rgbaToColorFunction(rgbaValue: string): string | null {
    return null
}
