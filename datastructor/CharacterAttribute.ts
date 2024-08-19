export class Characteristic{
    public name: string;
    public value: number | string | any;
    public alterNames: string[] = [];    // 该字段包括了属性值的其他名称，用于搜索时的匹配

    constructor(name, value){
        this.name = name
        this.value = value
    }
}

class Attribute extends Characteristic{
    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
    }
}

export class DerivedAttribute extends Attribute {
    constructor(name: string, calculate: (attributes: Attribute[]) => number, attributes: Attribute[]) {
        super(name, calculate(attributes));
    }
}

export class StatusAttribute extends Attribute {
    public max: number;
    public min: number;

    constructor(name: string, value: number) {
        super(name, value);
    }

    public increase(value: number) {
        self.value += value
         if (self.value > this.max) {
            this.value = this.min;
            console.log(`The value of ${this.name} is greater than the maximum value ${this.max}`);
        }
    }

    public decrease(value: number) {
            self.value -= value
             if (self.value < this.min) {
                this.value = this.min;
                console.log(`The value of ${this.name} is less than the minimum value ${this.min}`);
            }
        }
}

export class Skill  extends Characteristic {
    constructor(name: string, value: number) {
            super(name, value)
    }
}

export class Background extends Characteristic {
    constructor(name: string, value: string) {
        super(name, value)
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