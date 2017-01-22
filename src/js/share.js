const shareButtons = document.querySelectorAll(".share > .item");

if (shareButtons) {
	[].forEach.call(shareButtons, function(button) {
		button.addEventListener("click", function(event) {
			event.preventDefault();

			const title = 'Share Dialog';
			const width = 650;
			const height = 450;
			const configs = `menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=${width},height=${height},top=${(screen.height/2-height/2)}',left=${(screen.width/2-width/2)}`;

			window.open(this.href, title, configs);
		});
	});
}
