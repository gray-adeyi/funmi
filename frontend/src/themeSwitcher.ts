const THEME_CSS_PROPERTIES = [
    { name: "--md-sys-color-background", light: "#fff8f6", dark: "#1a110f" },
    { name: "--md-sys-color-error", light: "#ba1a1a", dark: "#ffb4ab" },
    {
        name: "--md-sys-color-error-container",
        light: "#ffdad6",
        dark: "#93000a",
    },
    {
        name: "--md-sys-color-inverse-on-surface",
        light: "#ffede8",
        dark: "#392e2b",
    },
    {
        name: "--md-sys-color-inverse-primary",
        light: "#ffb5a0",
        dark: "#8f4c38",
    },
    {
        name: "--md-sys-color-inverse-surface",
        light: "#392e2b",
        dark: "#f1dfda",
    },
    { name: "--md-sys-color-on-background", light: "#231917", dark: "#f1dfda" },
    { name: "--md-sys-color-on-error", light: "#ffffff", dark: "#690005" },
    {
        name: "--md-sys-color-on-error-container",
        light: "#410002",
        dark: "#ffdad6",
    },
    { name: "--md-sys-color-on-primary", light: "#ffffff", dark: "#561f0f" },
    {
        name: "--md-sys-color-on-primary-container",
        light: "#3a0b01",
        dark: "#ffdbd1",
    },
    { name: "--md-sys-color-on-secondary", light: "#ffffff", dark: "#442a22" },
    {
        name: "--md-sys-color-on-secondary-container",
        light: "#2c150f",
        dark: "#ffdbd1",
    },
    { name: "--md-sys-color-on-surface", light: "#231917", dark: "#f1dfda" },
    {
        name: "--md-sys-color-on-surface-variant",
        light: "#53433f",
        dark: "#d8c2bc",
    },
    { name: "--md-sys-color-on-tertiary", light: "#6c5d2f", dark: "#3b2f05" },
    {
        name: "--md-sys-color-on-tertiary-container",
        light: "#231b00",
        dark: "#f5e1a7",
    },
    { name: "--md-sys-color-outline", light: "#85736e", dark: "#a08c87" },
    {
        name: "--md-sys-color-outline-variant",
        light: "#d8c2bc",
        dark: "#53433f",
    },
    { name: "--md-sys-color-primary", light: "#8f4c38", dark: "#ffb5a0" },
    {
        name: "--md-sys-color-primary-container",
        light: "#ffdbd1",
        dark: "#723523",
    },
    { name: "--md-sys-color-scrim", light: "#000000", dark: "#000000" },
    { name: "--md-sys-color-secondary", light: "#77574e", dark: "#e7bdb2" },
    {
        name: "--md-sys-color-secondary-container",
        light: "#ffdbd1",
        dark: "#5d4037",
    },
    { name: "--md-sys-color-shadow", light: "#000000", dark: "#000000" },
    { name: "--md-sys-color-surface", light: "#fff8f6", dark: "#1a110f" },
    {
        name: "--md-sys-color-surface-bright",
        light: "#fff8f6",
        dark: "#423734",
    },
    {
        name: "--md-sys-color-surface-container",
        light: "#fceae5",
        dark: "#271d1b",
    },
    {
        name: "--md-sys-color-surface-container-high",
        light: "#f7e4e0",
        dark: "#322825",
    },
    {
        name: "--md-sys-color-surface-container-highest",
        light: "#f1dfda",
        dark: "#3d322f",
    },
    {
        name: "--md-sys-color-surface-container-low",
        light: "#fff1ed",
        dark: "#231917",
    },
    {
        name: "--md-sys-color-surface-container-lowest",
        light: "#ffffff",
        dark: "#140c0a",
    },
    { name: "--md-sys-color-surface-dim", light: "#e8d6d2", dark: "#1a110f" },
    { name: "--md-sys-color-tertiary", light: "#6c5d2f", dark: "#d8c58d" },
    {
        name: "--md-sys-color-tertiary-container",
        light: "#f5e1a7",
        dark: "#534619",
    },
];

export function applyTheme(theme: "light" | "dark" | null) {
    switch (theme) {
        case "light":
            THEME_CSS_PROPERTIES.forEach((p) =>
                document.documentElement.style.setProperty(p.name, p.light)
            );
            break;
        case "dark":
            THEME_CSS_PROPERTIES.forEach((p) =>
                document.documentElement.style.setProperty(p.name, p.dark)
            );
            break;
        default:
            THEME_CSS_PROPERTIES.forEach((p) =>
                document.documentElement.style.removeProperty(p.name)
            );
    }
}
