<script lang="ts">
  import { page } from '$app/stores';

  const admin = $page.data.user.role === 'ADMIN';
</script>

<h1>Admin Page</h1>

{#if admin}
  <p class="text-center text-5xl">Welcome <span class="text-orange-500">{$page.data.user.name}</span>!</p>
{/if}

{#if !admin}
  <p class="text-center text-2xl">You are not admin</p>
  <p class="text-center text-5xl">Bug hey <span class="text-orange-500">{$page.data.user.name}</span></p>
{/if}
