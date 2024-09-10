import { IconDefinition } from "./icon-definition";
import { Icon } from "./icon";

class IconLibraryService {

  private _libraries: Record<string, Record<string, Icon>> = {};

  public registerIcon(library:string, name: string, definition: IconDefinition | string) {
    if (!this._libraries[library]) {
      this._libraries[library] = {};
    }
    const icon = typeof definition === 'string' ? Icon.fromString(definition) : Icon.create(definition);
    if (icon) {
      this._libraries[library][name] = icon;
      return true;
    }
    return false;
  }

  public registerIcons(
    library: string,
    icons: Record<string, IconDefinition | string>,
  ) {
    Object.entries(icons).forEach(
      ([name, definition]) => {
        this.registerIcon(library, name, definition);
      },
    )
  }

  public getIcon(library: string, name: string): Icon | undefined {
    return this._libraries[library] ? this._libraries[library][name] : undefined;
  }
}

export const iconLibraries = new IconLibraryService;
