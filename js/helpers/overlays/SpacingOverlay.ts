import BaseDevOverlay from './BaseDevOverlay';

interface ISpacingDefinition {
	name: string;
	color: string;
}

export default class SpacingOverlay extends BaseDevOverlay {
	private readonly spacingDefinitions: Record<number, ISpacingDefinition>;

	public constructor(spacingDefinitions: Record<number, ISpacingDefinition>) {
		super();

		this.spacingDefinitions = spacingDefinitions;
	}

	public show(): void {
		if (this.overlay) {
			return;
		}

		super.show();

		const elements: NodeListOf<Element> = document.querySelectorAll('[class]');

		elements.forEach((element: Element): void => {
			const marginTop: number = parseInt(window.getComputedStyle(element).getPropertyValue('margin-top'), 10);
			const marginBottom: number = parseInt(window.getComputedStyle(element).getPropertyValue('margin-bottom'), 10);
			const paddingTop: number = parseInt(window.getComputedStyle(element).getPropertyValue('padding-top'), 10);
			const paddingBottom: number = parseInt(window.getComputedStyle(element).getPropertyValue('padding-bottom'), 10);

			const rect: ClientRect = element.getBoundingClientRect();
			const center: number = rect.left + rect.width / 2;

			if (marginTop > 0) {
				this.drawSpacing(marginTop, window.pageYOffset + rect.top - marginTop, center); // eslint-disable-line no-mixed-operators
			}

			if (marginBottom > 0) {
				this.drawSpacing(marginBottom, window.pageYOffset + rect.top + rect.height, center); // eslint-disable-line no-mixed-operators
			}

			if (paddingTop > 0) {
				this.drawSpacing(paddingTop, window.pageYOffset + rect.top, center); // eslint-disable-line no-mixed-operators
			}

			if (paddingBottom > 0) {
				this.drawSpacing(paddingBottom, window.pageYOffset + rect.top + rect.height - paddingBottom, center); // eslint-disable-line no-mixed-operators
			}
		});
	}

	private drawSpacing(size: number, top: number, left: number): void {
		if (!Object.prototype.hasOwnProperty.call(this.spacingDefinitions, size) || !this.overlay) {
			return;
		}

		const spacingDefinition: ISpacingDefinition = this.spacingDefinitions[size];
		const spacing: HTMLElement = document.createElement('div');

		// No text for too small spacings
		if (size >= 10) {
			spacing.innerText = spacingDefinition.name;
		}

		spacing.style.cssText =
			'display: flex; align-items: center; justify-content: center; padding: 2px; font-size: 10px; color: white; text-overflow: hidden; position: absolute; z-index: 10000; transform: translateX(-50%);';
		spacing.style.minWidth = `${size}px`;
		spacing.style.height = `${size}px`;
		spacing.style.backgroundColor = spacingDefinition.color;

		spacing.style.top = `${Math.round(top)}px`;
		spacing.style.left = `${Math.round(left)}px`;

		this.overlay.appendChild(spacing);
	}

	public static convertSassStylesToMap(styles: any): Record<number, ISpacingDefinition> {
		const rawSpacingDefinitions: Record<string, any> = styles.global.$spacings.value;

		const spacingDefinitions: Record<number, ISpacingDefinition> = Object.keys(rawSpacingDefinitions).reduce(
			(acc: Record<number, ISpacingDefinition>, name): Record<number, ISpacingDefinition> => {
				const config = rawSpacingDefinitions[name].value;
				const size = config.value.value;

				acc[size] = {
					name,
					color: config.color.value.hex
				};

				return acc;
			},
			{}
		);

		return spacingDefinitions;
	}
}
