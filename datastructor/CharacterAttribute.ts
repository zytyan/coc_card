export class Characteristic {
    public name: string;
    public value: number | string | any;
    public alterNames: string[] = [];    // 该字段包括了属性值的其他名称，用于搜索时的匹配

    constructor(name: string, value: any) {
        this.name = name
        this.value = value
    }
}

export class Attribute extends Characteristic {
    constructor(name: string, value: number) {
        super(name, value);
    }
}

export class BaseAttribute extends Attribute {
    // BaseAttribute数值可以手动调整
    // BaseAttribute调整之后需要更新DerivedAttribute、StatusAttribute和DerivedInformation

    constructor(name: string, value: number) {
        super(name, value);
    }
}

export class DerivedAttribute extends Attribute {
    // DerivedAttribute数值不能手动设置，只能根据BaseAttribute推导出

    constructor(name: string, calculate: (attributes: { [key: string]: Attribute }) => number, attributes: { [key: string]: Attribute }) {
        super(name, calculate(attributes));
    }
}

export class StatusAttribute extends Characteristic {
    // StatusAttribute显示两个数值，分别表示当前数值和最大数值

    public current: Attribute;
    public max: Attribute;

    constructor(name: string, initialAttribute: Attribute, maxAttribute: Attribute) {
        super(name, `${initialAttribute.value}/${maxAttribute.value}`);

        this.current = initialAttribute;
        this.max = maxAttribute;
        this.updateValue();
    }

    public updateValue() {
        if (this.current.value > this.max.value) {
            this.current.value = this.max.value;
            console.log(`The value of ${this.current.name} is greater than the maximum value ${this.max.value}`);
        } // 只判断上届，不判断下届。有时可能出现Value小于0的情况。
        this.value = `${this.current.value} / ${this.max.value}`;
    }

    public increase(value: number) {
        this.current.value += value;
        this.updateValue();
    }

    public decrease(value: number) {
        this.current.value -= value;
        this.updateValue();
    }
}

export class Skill extends Characteristic {
    constructor(name: string, baseValue: number, growth: number, occupation: number, personalInterest: number) {
        super(name, baseValue)
        this.value += growth + occupation + personalInterest
    }
}

export class Information extends Characteristic {
    constructor(name: string, value: string) {
        super(name, value)
    }
}

export class BaseInformation extends Information {
    // BaseInformation可以手动调整

    constructor(name: string, value: string) {
        super(name, value)
    }
}

export class DerivedInformation extends Information {
    // DerivedInformation不能手动设置，只能根据BaseAttribute推导出，但是不依赖于BaseInformation

    constructor(name: string, calculate: (attributes: { [key: string]: Attribute }) => string, attributes: { [key: string]: Attribute }) {
        super(name, calculate(attributes));
    }
}

export const testDefaultCharacterAttributes = (base: number) => {
    const STR = new BaseAttribute('STR', 45);
    const CON = new BaseAttribute('CON', 30);
    const SIZ = new BaseAttribute('SIZ', 75);
    const DEX = new BaseAttribute('DEX', 50);
    const APP = new BaseAttribute('APP', 50);
    const INT_IDE = new BaseAttribute('INT/IDE', 50);
    const POW = new BaseAttribute('POW', 90);
    const EDU = new BaseAttribute('EDU', 90);
    const MOV = new BaseAttribute('MOV', 7);

    // 计算状态推导属性 HP
    const MaxHP = new DerivedAttribute('MaxHP', (attrs) => Math.floor((attrs.SIZ.value + attrs.CON.value) / 10), {'SIZ': SIZ, 'CON': CON});
    const CurrentHP = new BaseAttribute('CurrentHP', MaxHP.value);
    const HP = new StatusAttribute('HP', CurrentHP, MaxHP);


    // 计算推导属性 DM (Damage Bonus)
    const DM = new DerivedInformation('DM', (attrs) => {
        const total = attrs.STR.value + attrs.SIZ.value;
        if (total <= 64) return '-2';
        if (total <= 84) return '-1';
        if (total <= 124) return '0';
        if (total <= 164) return '1d4';
        if (total <= 204) return '1d6';
        if (total <= 284) return '2d6';
        if (total <= 364) return '3d6';
        if (total <= 444) return '4d6';
        return '5d6';
    }, {'STR': STR, 'SIZ': SIZ});

    // 计算推导属性 BUI (Build)
    const BUI = new DerivedAttribute('BUI', (attrs) => {
        const total = attrs.STR.value + attrs.SIZ.value;
        if (total <= 64) return -2;
        if (total <= 84) return -1;
        if (total <= 124) return 0;
        if (total <= 164) return 1;
        if (total <= 204) return 2;
        if (total <= 284) return 3;
        if (total <= 364) return 4;
        if (total <= 444) return 5;
        return 6;
    }, {'STR': STR, 'SIZ': SIZ});

    // 计算基础闪避 (基础闪避(自身属性) = DEX/2。最终闪避(技能) = 基础闪避 + 成长点 + 职业点 + 兴趣点)
    const BaseDodge = new DerivedAttribute('BaseDodge', (attrs) => Math.floor(attrs.DEX.value / 2), {'DEX': DEX});


    // 克苏鲁神话技能
    const CthulhuMythos = new Skill('CthulhuMythos', 1, 4, 0, 0)

    // 计算状态推导属性 SAN (SAN值的最大值 = 99 - 克苏鲁神话技能, 初始值 = 意志)
    const MaxSAN = new DerivedAttribute('MaxSAN', (attrs) => 99 - attrs.CthulhuMythos.value, {'CthulhuMythos': CthulhuMythos});
    const CurrentSAN = new BaseAttribute('CurrentSAN', POW.value);
    const SAN = new StatusAttribute('SAN', CurrentSAN, MaxSAN);

    return [STR, CON, SIZ, DEX, APP, INT_IDE, POW, EDU, MOV, DM, BUI,
        MaxHP, CurrentHP, HP,
        MaxSAN, CurrentSAN, SAN,
        CthulhuMythos,
    ];
}
