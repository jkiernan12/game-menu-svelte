<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang='ts'>
  import { onMount } from 'svelte';
  import { getGames } from '$lib/utils/service';
  import { type Game } from '$lib/utils/service';

  let games: Game[];
  onMount(async () => {
    games = await getGames('jkiernan12');
	});
</script>


<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5 w-full p-4">
		<h1 class="h1">Game Menu</h1>
		<p>Start by exploring:</p>
    <section class="grid grid-cols-1 md:grid-cols-3 gap-8">

      {#if games}
      {#each games as game}
      <div class="card p-4 w-full">
        <header class="card-header">
          <img alt={game.name[0].value + ' cover image'} src={game.image} />
        </header>
        <section class={`p-4`}>
          <h3 class="h3">{game.name[0].value}</h3>
          <p class="line-clamp-6">{game.description}</p>
          <p><b>Players</b>: {game.minplayers.value}-{game.maxplayers.value}</p>
          <p><b>Playtme</b>: {game.minplaytime.value}-{game.maxplaytime.value} mins</p>
          <p><b>Weight</b>: {game.statistics.ratings.averageweight.value}</p>
        </section>
      </div>
      {/each}
      {:else}
      <p>Loading...</p>
      {/if}
    </section>
	</div>
</div>
