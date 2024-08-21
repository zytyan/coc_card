import {Characteristic} from "@/datastructor/CharacterAttribute";

export class Character {
    public name: string;
    public attributes: { [key: string]: Characteristic };

    constructor(name: string, attributes: Characteristic[]) {
        this.name = name;
        this.attributes = {};
        attributes.forEach(attribute => {
            this.attributes[attribute.name] = attribute;
        });
    }
}