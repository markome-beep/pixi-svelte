<script lang="ts">
	import { Application } from 'pixi.js';
	import { onMount } from 'svelte';
	import { Input } from '$lib/input';
	import { init_game, update } from '$lib/gameHandler';
	import { avg_val } from '$lib';

	let {
		class: cls = '',
		fps_disp = $bindable()
	}: {
		class?: string;
		fps_disp: number;
	} = $props();

	let game_canvas: HTMLCanvasElement;
	let container: HTMLDivElement;

	let fps_calc = avg_val(100);
	const app = new Application();

	const game = async () => {
		const input = new Input();

		// Initialize the application
		await app.init({
			background: '#1099bb',
			canvas: game_canvas,
			resizeTo: container
		});
		app.stage.hitArea = app.screen;
		await init_game(app.stage);

		const update_func = update(input, app.stage);
		let timeAccum = 0;
		const tickThreshold = 10;
		app.ticker.add((ticker) => {
			timeAccum += ticker.deltaTime;
			fps_disp = fps_calc(60 / ticker.deltaTime);
			if (timeAccum > tickThreshold) {
				timeAccum -= tickThreshold;
				// updateGame();
				update_func();
			}
			// renderGame();
		});
	};

	onMount(game);
</script>

<div class={cls} bind:this={container}>
	<div class="image-pixelated h-0">
		<canvas class="w-full" bind:this={game_canvas}></canvas>
	</div>
</div>

<style>
	.image-pixelated {
		image-rendering: pixelated;
	}
</style>
