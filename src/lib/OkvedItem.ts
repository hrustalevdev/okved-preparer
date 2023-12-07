export enum EOkvedType {
  Section = "section",
  Class = "class",
  SubClass = "subClass",
  Group = "group",
  SubGroup = "subGroup",
  Kind = "kind",
}

export interface IOkvedItem {
  id: string;
  parentId: string;
  type: EOkvedType;
  section: string;
  code: string;
  name: string;
  items?: IOkvedItem[];

  addChild(child: IOkvedItem): void;
}

export class OkvedItem implements IOkvedItem {
  id: string;
  parentId: string;
  type: EOkvedType;
  section: string;
  code: string;
  name: string;
  items?: IOkvedItem[];

  addChild(child: IOkvedItem): void {
    if (!this.items) {
      this.items = [];
    }
    this.items.push(child);
  }

  constructor(section: string, code: string, name: string) {
    this.id = this._getId(section, code);
    this.parentId = this._getParentId(section, code);
    this.type = this._getType(code);
    this.section = section;
    this.code = code.trim();
    this.name = name;
  }

  private _checkCodeType(code: string, type: EOkvedType): boolean {
    const regexps: Record<EOkvedType, RegExp> = {
      [EOkvedType.Section]: /^[a-zA-Z]$/,
      [EOkvedType.Class]: /^\d{2}$/,
      [EOkvedType.SubClass]: /^\d{2}\.\d$/,
      [EOkvedType.Group]: /^\d{2}\.\d{2}$/,
      [EOkvedType.SubGroup]: /^\d{2}\.\d{2}\.\d$/,
      [EOkvedType.Kind]: /^\d{2}\.\d{2}\.\d{2}$/,
    };

    return regexps[type].test(code);
  }

  private _getId(section: string, code: string): string {
    return code.trim() ? `${section}.${code}` : section;
  }

  private _getParentId(section: string, code: string): string {
    switch (true) {
      case this._checkCodeType(code, EOkvedType.Class):
        return section;
      case this._checkCodeType(code, EOkvedType.SubClass):
        return `${section}.${code.slice(0, -2)}`;
      case this._checkCodeType(code, EOkvedType.Group):
        return `${section}.${code.slice(0, -1)}`;
      case this._checkCodeType(code, EOkvedType.SubGroup):
        return `${section}.${code.slice(0, -2)}`;
      case this._checkCodeType(code, EOkvedType.Kind):
        return `${section}.${code.slice(0, -1)}`;
      default:
        return "";
    }
  }

  private _getType(code: string): EOkvedType {
    switch (true) {
      case this._checkCodeType(code, EOkvedType.Class):
        return EOkvedType.Class;
      case this._checkCodeType(code, EOkvedType.SubClass):
        return EOkvedType.SubClass;
      case this._checkCodeType(code, EOkvedType.Group):
        return EOkvedType.Group;
      case this._checkCodeType(code, EOkvedType.SubGroup):
        return EOkvedType.SubGroup;
      case this._checkCodeType(code, EOkvedType.Kind):
        return EOkvedType.Kind;
      default:
        return EOkvedType.Section;
    }
  }
}
