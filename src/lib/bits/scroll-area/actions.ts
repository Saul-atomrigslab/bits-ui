type ResizeObserverActionParams = {
	handleSizeChange: () => void;
};

export function resizeObserver(node: HTMLElement, params: ResizeObserverActionParams) {
	let animationFrame = 0;

	const observer = new ResizeObserver(() => {
		cancelAnimationFrame(animationFrame);
		animationFrame = requestAnimationFrame(params.handleSizeChange);
	});

	observer.observe(node);

	return {
		destroy() {
			window.cancelAnimationFrame(animationFrame);
			observer.unobserve(node);
		}
	};
}
