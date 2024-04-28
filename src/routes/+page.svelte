<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang='ts'>
  import { onMount } from 'svelte';
  import { getGames } from '$lib/utils/service';
  import { type Game } from '$lib/utils/service';
  import DoubleRangeSlider from '../lib/components/DoubleRangeSlider.svelte';
	import GameCard from '$lib/components/GameCard.svelte';

  let filteredGames: Game[];
  let games: Game[] = [];
  onMount(async () => {
    games = await getGames('jkiernan12');
	});

  const maxPlayTime = 200;
  const maxComplexity = 5;

  // form values
  let playerCount = 1;
	let startComplexity: number
	let endComplexity: number
  let startTime: number
	let endTime: number

	const handleSlide = (d: number, max: number, fixed: number) => {
		if (!d && d !== 0) return '';
    d *= max;
		return d.toFixed(fixed);
	}

  $: filteredGames = games.filter(game => {
    console.log(startTime)
    return (
      Number(game.maxplayers.value) >= playerCount &&
      Number(game.minplaytime.value) >= startTime * maxPlayTime && 
      Number(game.maxplaytime.value) <= endTime * maxPlayTime &&
      Number(game.statistics.ratings.averageweight.value) >= startComplexity * maxComplexity &&
      Number(game.statistics.ratings.averageweight.value) <= endComplexity * maxComplexity
    )
  })
</script>


<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5 w-full p-4">
		<h1 class="h1 text-center">Game Menu</h1>
    <section class="px-9 grid grid-cols-1 md:grid-cols-3 md:px-0 gap-8">

      <label class="label">
        <span>Players</span>
        <input bind:value={playerCount} class="input" type="number" min="1" max="10" />
      </label>
      <div>
        <label class="label">
          <span>Complexity</span>
          <DoubleRangeSlider bind:start={startComplexity} bind:end={endComplexity}/>
        </label>
        <div class="labels flex justify-between">
          <div class="label">{handleSlide(startComplexity, 5, 2)}</div>
          <div class="label">{handleSlide(endComplexity, 5, 2)}</div>
        </div>
      </div>
      <div>
        <label class="label">
          <span>Play time (mins)</span>
          <DoubleRangeSlider bind:start={startTime} bind:end={endTime}/>
        </label>
        <div class="labels flex justify-between">
          <div class="label">{handleSlide(startTime, 200, 0)}</div>
          <div class="label">{handleSlide(endTime, 200, 0)}</div>
        </div>
      </div>
    </section>
    <section class="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8">

      {#if games}
      {#each filteredGames as game}
      <GameCard game={game} />
      {/each}
      {:else}
      <p>Loading...</p>
      {/if}
    </section>
	</div>
</div>
