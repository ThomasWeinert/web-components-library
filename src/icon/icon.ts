import {IconDefinition} from "./icon-definition";

export class Icon {

  private readonly _properties: IconDefinition;

  public constructor(properties: Partial<IconDefinition>) {
    this._properties = {
      path: '',
      width: 24,
      height: 24,
      ...properties
    }
  }

  public toString() {
    return `data:image/svg+xml,${encodeURIComponent(this.toSvg())}`;
  }

  public toSvg() {
    const {width, height, path} = this._properties;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><path d="${path}"/></svg>`;
  }

  public static create(value: Partial<IconDefinition>) {
    return new Icon(value);
  }

  public static fromString(value: string, width = 24, height = 24) {
    console.log(value);
    return Icon.create({path: value, width, height})
  }
}
