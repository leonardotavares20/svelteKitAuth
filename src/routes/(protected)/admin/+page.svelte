<script lang="ts">
  import { page } from '$app/stores';

  const admin = $page.data.user.role === 'ADMIN';
</script>

<h1>Admin Page</h1>

{#if admin}
  <p>Welcome {$page.data.user.name}!</p>
{/if}

{#if !admin}
  <p>You are an admin</p>
{/if}
