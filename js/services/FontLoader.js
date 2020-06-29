import FontFaceObserver from 'fontfaceobserver/fontfaceobserver';

export const events = {
	fontsLoaded: 'fontsLoaded.FontLoader'
};

/**
 * FontLoader
 */
export default class FontLoader {
	// static saveInStorage = true;

	constructor() {
		this._fontGroups = [];
	}

	addGroup(className, list) {
		// Don't add if already loaded
		if (sessionStorage && sessionStorage[className] === 'true') {
			return;
		}

		this._fontGroups.push(FontLoader._loadFonts(className, list));
	}

	/**
	 * Loads fonts with FontFaceObserver
	 *
	 * @public
	 */
	async start() {
		if (!this._fontGroups.length) {
			return;
		}

		await Promise.all(this._fontGroups);

		// Trigger an event as soon all fonts are loaded
		window.setTimeout(() => document.dispatchEvent(new CustomEvent(events.fontsLoaded)), 100);
	}

	/**
	 * Loads the fonts in list, saves the load status in the
	 * session and adds the given className to the className
	 * of the html tag.
	 *
	 * @param {string} className
	 * @param {Array.<FontFaceObserver>} list
	 * @private
	 */
	static async _loadFonts(className, list) {
		try {
			await Promise.all(list.map(font => font.load(null, 5000)));

			document.documentElement.className += ` ${className}`;

			// console.log(`${className} with FontFaceObserver.`);

			try {
				if (FontLoader.saveInStorage) {
					sessionStorage[className] = 'true';
				}
			} catch (error) {
			}
		} catch (err) {
			try {
				if (FontLoader.saveInStorage) {
					sessionStorage[className] = 'false';
				}
			} catch (error) {
			}
		}
	}
}

FontLoader.saveInStorage = true;

export { default as FontFaceObserver } from 'fontfaceobserver/fontfaceobserver';
