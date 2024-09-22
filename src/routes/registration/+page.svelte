<script lang="ts">
  import type { PageData } from "./$types";
  import type { ActionData } from "./$types";

  export let data: PageData;
  export let form: ActionData;
</script>

<div class="w-svw h-svh">
  <form action="" method="post">
    <div>
      <label for="username" id="username">Username</label>
      <input type="text" name="username" placeholder="Username" />
    </div>
    <div>
      <label for="password" id="password">Password</label>
      <input type="password" name="password" placeholder="Password" />
    </div>
  </form>
</div>
