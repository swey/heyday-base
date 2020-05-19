import BaseDevOverlay from './BaseDevOverlay';

export default class AspectRatioOverlay extends BaseDevOverlay {
	public show(): void {
		if (this.overlay) {
			return;
		}

		super.show();

		const elements: NodeListOf<HTMLElement> = document.querySelectorAll('.o-aspect-ratio');

		elements.forEach((element: HTMLElement): void => {
			const regExpMatches = element.className.match(/\d+x\d+/);
			const aspectRatio = regExpMatches && regExpMatches.length ? regExpMatches[0] : '?';

			const circle = document.createElement('div');

			circle.innerText = aspectRatio;
			circle.style.cssText =
				'display: flex; align-items: center; justify-content: center; padding: 6px; opacity: 0.8; background: black; color: white; font-size: 16px; position: absolute; transform: translateX(-100%);';
			circle.style.top = `${Math.round(element.getBoundingClientRect().top + window.scrollY)}px`;
			circle.style.left = `${Math.round(
				element.getBoundingClientRect().left + element.getBoundingClientRect().width + window.scrollX
			)}px`;

			(this.overlay as Element).appendChild(circle);
		});
	}
}
