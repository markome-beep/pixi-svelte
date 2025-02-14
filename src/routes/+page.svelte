<script lang="ts">
	import Game from './components/Game.svelte';
	import DebugLabel from './components/DebugLabel.svelte';
	let fps = $state(0);
</script>

<div class="flex h-screen flex-col overflow-hidden border-4 border-red-900">
	<div class="flex flex-row gap-2">
		<DebugLabel value={fps} label="FPS" />
	</div>
	<Game class="m-2 h-full overflow-clip rounded-lg" bind:fps_disp={fps} />
</div>
