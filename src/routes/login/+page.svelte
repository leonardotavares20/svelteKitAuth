<script lang="ts">
  import { page } from '$app/stores';
  import type { ActionData } from './$types';

  const form = $page.form as ActionData;
</script>

<div class="w-svw h-svh flex items-center justify-center">
  <form class="w-svw h-svh grid grid-cols-2" action="?/login" method="post">
    <div class="grid grid-rows-2">
      <div class="h-full w-full flex flex-col justify-end items-center pb-4">
        <input
          class="text-white text-2xl w-3/4 h-20 px-3 transition-all bg-[#101014] border-0 border-b-2 border-orange-400 outline-none placeholder:text-white focus:border-white"
          type="text"
          name="username"
          autocomplete="off"
          placeholder="Username"
        />
        {#if form?.login?.fieldErrors?.username}
          <p class="text-red-500 text-lg">
            {form?.login.fieldErrors?.username[0]}
          </p>
        {/if}
      </div>
      <div class="h-full w-full flex flex-col justify-start items-center pt-4">
        <input
          class="text-white text-2xl w-3/4 h-20 px-3 transition-all bg-[#101014] border-0 border-b-2 border-orange-400 outline-none placeholder:text-white focus:border-white"
          type="password"
          name="password"
          placeholder="Password"
        />
        {#if form?.login?.fieldErrors?.password}
          <p class="text-red-500 text-lg">
            {form?.login.fieldErrors?.password[0]}
          </p>
        {/if}
        {#if form?.credentials}
          <p class="text-red-500 text-lg">
            {form.credentials.message}
          </p>
        {/if}
      </div>
    </div>
    <div class="h-full">
      <button
        class="h-full w-full transition-all text-7xl hover:bg-orange-500"
        type="submit">Login</button
      >
    </div>
  </form>
</div>
