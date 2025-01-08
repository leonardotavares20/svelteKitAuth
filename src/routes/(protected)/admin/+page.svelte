<script lang="ts">
  import { page } from '$app/stores';

  const admin = $page.data.user.role === 'ADMIN';

  console.log($page.data);
</script>

<h1 class="text-center text-7xl pb-8">Admin Page</h1>

{#if admin}
  <p class="text-center text-5xl">Welcome <span class="text-orange-500">{$page.data.user.name}</span>!</p>
{/if}

{#if !admin}
  <p class="text-center text-4xl text-red-500 pb-7">You are not admin</p>
  <p class="text-center text-5xl">But hey <span class="text-orange-500">{$page.data.user.name}</span></p>
{/if}

{#if $page.data.calendar}
  <div class="text-center m-auto max-w-[800px] flex flex-col gap-6">
    <h2 class="text-3xl text-orange-400 mt-7">Here are your Google Calendar</h2>

    <h3 class="text-3xl text-blue-400">Tasks</h3>
    {#each $page.data.calendar.items as item}
      {#if item.summary}
        <a class="hover:text-orange-600 transition-all" href={item.htmlLink} target="_blank" rel="noopener noreferrer">
          <p class="text-2xl"><span class="text-orange-500 text-3xl">Task</span> - {item.summary}</p>
        </a>
        {#if item.description}
          <p><span class="text-orange-400">Description:</span> {item.description}</p>
        {/if}
      {/if}
    {/each}
  </div>
{/if}
