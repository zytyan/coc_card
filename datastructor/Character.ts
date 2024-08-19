import {CharacterAttribute, CharacterAttributeFixed} from "@/datastructor/CharacterAttribute";

export class Character {
    public name: string;
    public attributes: { [key: string]: CharacterAttribute };

    constructor(name: string, attributes: CharacterAttribute[]) {
        this.name = name;
        this.attributes = {};
        attributes.forEach(attribute => {
            this.attributes[attribute.name] = attribute;
        });
    }

    private adjustByAge(): void {}; // todo
}