<script>
	// Array di URL delle GIF
	const toLoad = [
		'https://media1.tenor.com/m/dG_tr_lmYHkAAAAC/looking-around.gif',
		'https://media1.tenor.com/m/gYeQ1vdOQKQAAAAd/cat-stare.gif',
		'https://media1.tenor.com/m/RjP_c7YEOREAAAAd/the-rock-sus.gif',
		'https://media1.tenor.com/m/7HYOnFr3-aIAAAAd/sad-sad-monkey.gif',
		'https://media1.tenor.com/m/7JhCpDbT00YAAAAC/crycat-crying-cat.gif',
		'https://media1.tenor.com/m/rpv72Z5PGCYAAAAC/joks.gif',
		'https://media1.tenor.com/m/I9ZKdi0J3twAAAAd/doo-doo-doo.gif',
		'https://media1.tenor.com/m/pNFqGBftNHEAAAAC/nick-confused.gif',
		'https://media1.tenor.com/m/fu5pw2B-3HsAAAAd/e-boy.gif'
	];

	function getRandomGif() {
		return toLoad[Math.floor(Math.random() * toLoad.length)];
	}
</script>

<div class="flex flex-col items-center align-middle w-full justify-center">
	<h1>Not found buddy</h1>
	<img src={getRandomGif()} alt="Random GIF" />
</div>
