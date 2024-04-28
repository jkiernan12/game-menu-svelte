<script lang='ts'>
	import type { Game } from "$lib/utils/service";

  export let game: Game;
  let expanded = false;
</script>

<div class="card p-4 w-full">
  <header class="card-header">
    <img alt={game.name[0].value + ' cover image'} src={game.image} />
  </header>
  <section class={`p-4`}>
    <h3 class="h3">{game.name[0].value}</h3>
    <p class={expanded ? null : "line-clamp-6"}>
      {game.description}
    </p>
    <button on:click={() => expanded = !expanded} class="font-bold underline">Read {expanded ? 'less' : 'more'}</button>
    <div class='py-4'>
      <p><b>Players</b>: {game.minplayers.value}-{game.maxplayers.value}</p>
      <p><b>Playtme</b>: {game.minplaytime.value}-{game.maxplaytime.value} mins</p>
      <p><b>Weight</b>: {game.statistics.ratings.averageweight.value}</p>
    </div>
  </section>
</div>