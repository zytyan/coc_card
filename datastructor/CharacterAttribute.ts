export class Characteristic {
    public name: string;
    public value: number | string | any;
    public alterNames: string[] = [];    // 该字段包括了属性值的其他名称，用于搜索时的匹配

    constructor(name: string, value: any) {
        this.name = name
        this.value = value
    }
}

class Attribute extends Characteristic {
    constructor(name: string, value: number) {
        super(name, value);
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
        this.value += value
        if (this.value > this.max) {
            this.value = this.max;
            console.log(`The value of ${this.name} is greater than the maximum value ${this.max}`);
        }
    }

    public decrease(value: number) {
        this.value -= value
        if (this.value < this.min) {
            this.value = this.min;
            console.log(`The value of ${this.name} is less than the minimum value ${this.min}`);
        }
    }
}

export class Skill extends Characteristic {
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
        new Attribute('STR', base++),
        new Attribute('CON', base++),
        new Attribute('SIZ', base++),
        new Attribute('DEX', base++),
        new Attribute('APP', base++),
        new Attribute('INT', base++),
        new Attribute('POW', base++),
        new Attribute('EDU', base++),
        new Attribute('MOV', base++),
    ]
}