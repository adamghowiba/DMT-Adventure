function resize({ target }: any) {
	target.style.height = '1px';
	target.style.height = +target.scrollHeight + 'px';
}

export default function (node: HTMLElement) {
	resize({ target: node });
	node.style.overflow = 'hidden';
	node.addEventListener('input', resize);

	return {
		destroy: () => node.removeEventListener('input', resize)
	};
}
