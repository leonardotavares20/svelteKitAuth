<script lang="ts">
  import { page } from '$app/stores';
  import { applyAction, enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';

  import '../app.css';
</script>

<svelte:head>
  <title>Sveltekit Auth</title>
</svelte:head>

<nav>
  {#if !$page.data.user}
    <a href="/login">Login</a>
    <a href="/registration">Register</a>
  {/if}

  {#if $page.data.user}
    <a href="/admin">Admin</a>

    <form
      action="/logout"
      method="post"
      use:enhance={() => {
        return async ({ result }) => {
          invalidateAll();
          await applyAction(result);
        };
      }}
    >
      <button type="submit">Logout</button>
    </form>
  {/if}
</nav>

<main>
  <slot />
</main>
