/**
 * FontLoaderHead
 *
 * For usage in head of the pages.
 */
export default class FontLoaderHead {
	/**
	 * If the font is cached, add class right away
	 * for immediate use.
	 *
	 * @private
	 */
	static addLoadedFont(className) {
		if (!sessionStorage) {
			return;
		}

		if (sessionStorage[className] === 'true' || FontLoaderHead._isExcludedBrowser()) {
			document.documentElement.className += ` ${className}`;
		}
	}

	/**
	 * Exclude some browsers from the default font loading.
	 *
	 * IE14 (Edge): Loads the fonts without problems, but is not able to validate that
	 * bold fonts were loaded (for fonts with "font-weight: normal" that works fine as well)
	 *
	 * @returns {boolean}
	 * @private
	 */
	static _isExcludedBrowser() {
		return /edge\/14\./i.test(navigator.userAgent);
	}
}
