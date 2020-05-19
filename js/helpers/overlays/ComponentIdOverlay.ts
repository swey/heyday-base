// eslint-disable-next-line import/no-webpack-loader-syntax
import BaseDevOverlay from './BaseDevOverlay';

export default class ComponentIdOverlay extends BaseDevOverlay {
	public show(): void {
		if (this.overlay) {
			return;
		}

		super.show();

		const components: NodeListOf<HTMLElement> = document.querySelectorAll('[data-component-id]');

		components.forEach((component: HTMLElement): void => {
			const componentId: string = component.dataset.componentId as string;
			const isModule: boolean = componentId.indexOf('M') === 0;

			const circle: HTMLElement = document.createElement('div');

			circle.innerText = componentId;
			circle.style.cssText =
				'display: flex; align-items: center; justify-content: center; padding: 2px; opacity: 0.8; border-radius: 3px; color: white; font-size: 12px; position: absolute;';

			if (isModule) {
				circle.style.backgroundColor = '#17d5cf';
				circle.style.padding = '6px';
				circle.style.fontSize = '16px';

				component.style.boxShadow = 'inset 0 0 10px #17d5cf'; // eslint-disable-line no-param-reassign
			} else {
				circle.style.backgroundColor = '#ec11a1';
				circle.style.transform = 'translateY(-100%)';
			}

			circle.style.top = `${Math.round(component.getBoundingClientRect().top + window.scrollY)}px`;
			circle.style.left = `${Math.round(component.getBoundingClientRect().left + window.scrollX)}px`;

			(this.overlay as Element).appendChild(circle);
		});
	}

	public hide(): void {
		if (!this.overlay) {
			return;
		}

		super.hide();

		const components: NodeListOf<HTMLElement> = document.querySelectorAll('[data-component-id^="M"]');

		components.forEach((component: HTMLElement): void => {
			component.style.boxShadow = ''; // eslint-disable-line no-param-reassign
		});
	}
}
