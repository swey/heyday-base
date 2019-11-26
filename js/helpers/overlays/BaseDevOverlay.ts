import debounce from 'lodash/debounce';

export default class BaseDevOverlay {
	protected overlay?: Element;

	private readonly resizeListener: () => any;

	public constructor() {
		this.resizeListener = debounce((): void => {
			this.hide();
			this.show();
		}, 150);
	}

	public toggle(): void {
		if (this.overlay) {
			this.hide();
		} else {
			this.show();
		}
	}

	public show(): void {
		if (this.overlay) {
			return;
		}

		this.overlay = document.createElement('div');
		document.body.appendChild(this.overlay);

		window.addEventListener('resize', this.resizeListener);
	}

	public hide(): void {
		if (!this.overlay) {
			return;
		}

		document.body.removeChild(this.overlay);
		delete this.overlay;

		window.removeEventListener('resize', this.resizeListener);
	}
}
