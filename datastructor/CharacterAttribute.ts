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
    // Player information
    const playerInformation = [
        new BaseInformation('PlayerName', '狐狸'),
        new BaseInformation('CharacterName', '姜子瑜'),
        new BaseInformation('Career', '实验室助理'),
        new BaseInformation('Gender', '女'),
        new BaseInformation('Address', '首尔'),
        new BaseInformation('Hometown', '光州'),
    ]

    // Base Attribute
    const AGE = new BaseAttribute('AGE', 26);
    const STR = new BaseAttribute('STR', 40);
    const CON = new BaseAttribute('CON', 50);
    const SIZ = new BaseAttribute('SIZ', 45);
    const DEX = new BaseAttribute('DEX', 60);
    const APP = new BaseAttribute('APP', 60);
    const INT_IDE = new BaseAttribute('INT/IDE', 75);
    const POW = new BaseAttribute('POW', 55);
    const EDU = new BaseAttribute('EDU', 75);
    const MOV = new BaseAttribute('MOV', 8);
    const LUC = new BaseAttribute('LUC', 60);

    // 计算状态推导属性 HP
    const MaxHP = new DerivedAttribute('MaxHP', (attrs) => Math.floor((attrs.SIZ.value + attrs.CON.value) / 10), {'SIZ': SIZ, 'CON': CON});
    const CurrentHP = new BaseAttribute('CurrentHP', MaxHP.value);
    const HP = new StatusAttribute('HP', CurrentHP, MaxHP);

    // 计算状态推导属性 MP
    const MaxMP = new DerivedAttribute('MaxMP', (attrs) => Math.floor((attrs).POW.value / 5), {'POW': POW});
    const CurrentMP = new BaseAttribute('CurrentMP', MaxMP.value);
    const MP = new StatusAttribute('MP', CurrentMP, MaxMP);

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
    const Dodge = new Skill('Dodge', BaseDodge.value, 0, 0, 0)

    // 克苏鲁神话技能
    const CthulhuMythos = new Skill('CthulhuMythos', 1, 4, 0, 0);

    // 计算状态推导属性 SAN (SAN值的最大值 = 99 - 克苏鲁神话技能, 初始值 = 意志)
    const MaxSAN = new DerivedAttribute('MaxSAN', (attrs) => 99 - attrs.CthulhuMythos.value, {'CthulhuMythos': CthulhuMythos});
    const CurrentSAN = new BaseAttribute('CurrentSAN', POW.value);
    const SAN = new StatusAttribute('SAN', CurrentSAN, MaxSAN);

    // 技能列表
    const skills = [
        CthulhuMythos,
        new Skill('Accounting', 5, 0, 0, 0),
        new Skill('Law', 5, 0, 0, 10),
        new Skill('Anthropology', 1, 0, 60, 10),
        new Skill('Library Use', 20, 0, 30, 0),
        new Skill('Appraise', 5, 0, 0, 0),
        new Skill('Listen', 20, 0, 0, 0),
        new Skill('Archaeology', 1, 0, 0, 10),
        new Skill('Locksmith', 1, 0, 0, 0),
        new Skill('Acting', 5, 0, 0, 0),
        new Skill('Mechanical Repair', 10, 0, 0, 0),
        new Skill('Singing', 5, 0, 0, 10),
        new Skill('Medicine', 1, 0, 0, 20),
        new Skill('Craft', 5, 0, 0, 0),
        new Skill('Natural World', 10, 0, 0, 30),
        new Skill('Charm', 15, 0, 0, 0),
        new Skill('Navigate', 10, 0, 0, 0),
        new Skill('Climb', 20, 0, 0, 0),
        new Skill('Occult', 5, 0, 0, 20),
        new Skill('Computer Use Ω', 5, 0, 30, 0),
        new Skill('Operate Heavy Machinery', 1, 0, 0, 0),
        new Skill('Disguise', 5, 0, 0, 0),
        new Skill('Psychoanalysis', 1, 0, 0, 0),
        new Skill('Dodge', 30, 0, 0, 0),
        new Skill('Psychology', 10, 30, 0, 0),
        new Skill('Drive Auto', 20, 0, 0, 0),
        new Skill('Ride', 5, 0, 0, 0),
        new Skill('Electrical Repair', 10, 60, 0, 0),
        new Skill('Science: Chemistry', 1, 20, 0, 0),
        new Skill('Electronics Ω', 1, 0, 0, 0),
        new Skill('Science: Meteorology', 1, 20, 0, 0),
        new Skill('Fast Talk', 5, 0, 0, 0),
        new Skill('Science: Geology', 1, 20, 0, 0),
        new Skill('Fighting: Brawl', 25, 0, 0, 0),
        new Skill('Sleight of Hand', 10, 0, 0, 0),
        new Skill('Fighting', 0, 0, 0, 0),
        new Skill('Spot Hidden', 25, 60, 0, 0),
        new Skill('Stealth', 20, 10, 0, 0),
        new Skill('Firearms: Handgun', 15, 10, 0, 0),
        new Skill('Survival', 10, 0, 0, 0),
        new Skill('First Aid', 30, 0, 0, 0),
        new Skill('Throw', 20, 5, 0, 0),
        new Skill('History', 5, 0, 0, 0),
        new Skill('Track', 10, 0, 0, 0),
        new Skill('Intimidate', 15, 0, 0, 0),
        new Skill('Jump', 20, 0, 0, 0),
        new Skill('Craft', 5, 0, 0, 0),
        new Skill('Language: Own', 75, 0, 0, 0),
    ];

    // Return all attributes and skills
    return [
        ...playerInformation,
        AGE, STR, CON, SIZ, DEX, APP, INT_IDE, POW, EDU, MOV, LUC, DM, BUI,
        MaxHP, CurrentHP, HP, MaxSAN, CurrentSAN, SAN, MaxMP, CurrentMP, MP, BaseDodge, Dodge,
        ...skills
    ];
};

