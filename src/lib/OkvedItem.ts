enum EOkvedType {
  Section = "section",
  Class = "class",
  SubClass = "subClass",
  Group = "group",
  SubGroup = "subGroup",
  Kind = "kind",
}

export class OkvedItem {
  id: string;
  section: string;
  code: string;
  name: string;
  type: EOkvedType;

  constructor(section: string, code: string, name: string) {
    this.id = `${section}.${code}`;
    this.section = section;
    this.code = code;
    this.name = name;
    this.type = this._getType(code);
  }

  private _getType(code: string): EOkvedType {
    const classRegex = /^\d{2}$/;
    const subClassRegex = /^\d{2}\.\d$/;
    const groupRegex = /^\d{2}\.\d{2}$/;
    const subGroupRegex = /^\d{2}\.\d{2}\.\d$/;
    const kindRegex = /^\d{2}\.\d{2}\.\d{2}$/;

    if (classRegex.test(code)) return EOkvedType.Class;
    if (subClassRegex.test(code)) return EOkvedType.SubClass;
    if (groupRegex.test(code)) return EOkvedType.Group;
    if (subGroupRegex.test(code)) return EOkvedType.SubGroup;
    if (kindRegex.test(code)) return EOkvedType.Kind;
    return EOkvedType.Section;
  }
}
