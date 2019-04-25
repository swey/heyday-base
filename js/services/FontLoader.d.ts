export default class FontLoader {
	addGroup(className: string, list: Array<FontFaceObserver>): void;
	start(): void;
}

export class FontFaceObserver {
	constructor(family: string, descriptors: object);
}