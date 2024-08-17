export class CharacterAttribute {
    public name: string;
    public value: number | string | any;
    // 该字段包括了属性值的其他名称，用于搜索时的匹配
    public alterNames: string[] = [];
    public canBeModifiedInGame: boolean;

    // 该字段决定了该属性是否会在主页面中出现修改该值的按钮

    constructor(name: string, value: number, canBeModifiedInGame: boolean = true) {
        this.name = name;
        this.value = value;
    }
}

export class CharacterAttributeFixed extends CharacterAttribute {
    constructor(name: string, value: number) {
        super(name, value, false);
    }
}

export class CharacterAttributeModifiable extends CharacterAttribute {
    public max: number;
    public min: number;

    constructor(name: string, value: number) {
        super(name, value, true);
    }

    setValue = (value: any) => {
        if (typeof value !== 'number') {
            this.value = value;
            return;
        }
        if (value < this.min) {
            this.value = this.min;
            console.log(`The value of ${this.name} is less than the minimum value ${this.min}`);
        } else if (value > this.max) {
            this.value = this.max;
            console.log(`The value of ${this.name} is greater than the maximum value ${this.max}`);
        } else {
            this.value = value;
        }
    }
}

export const testDefaultCharacterAttributes = (base: number) => {
    return [
        new CharacterAttributeFixed('STR', base++),
        new CharacterAttributeFixed('CON', base++),
        new CharacterAttributeFixed('SIZ', base++),
        new CharacterAttributeFixed('DEX', base++),
        new CharacterAttributeFixed('APP', base++),
        new CharacterAttributeFixed('INT', base++),
        new CharacterAttributeFixed('POW', base++),
        new CharacterAttributeFixed('EDU', base++),
        new CharacterAttributeFixed('MOV', base++),
    ]
}