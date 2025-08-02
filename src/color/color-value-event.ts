interface ColorValue {
    hue: number, saturation: number, lightness: number, alpha: number
};

const DefaultColorValue = {
    hue: 0,
    saturation: 1,
    lightness: 0.5,
    alpha: 1,
}
export class ColorValueEvent extends CustomEvent<ColorValue> {

    public  readonly color: ColorValue;

    public constructor(
        type: string,
        eventInitDict: EventInit,
        color: Partial<ColorValue> = {}
    ) {
        const validatedColor = {...DefaultColorValue, ...color};
        super(type, {...eventInitDict, detail: validatedColor})
        this.color = validatedColor;
    }
}
