<script lang="ts">
	let {value, label, precision = 3} = $props();
</script>

<div class="relative m-2 w-20 rounded-sm border p-1 text-2xl">
	<p class="absolute left-2 top-[-0.5rem] rounded-full bg-white text-sm">{label}</p>
	{value.toPrecision(precision)}
</div>
