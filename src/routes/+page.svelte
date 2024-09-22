<script lang="ts">
  import "../app.css";
</script>

<div
  class="w-svw h-svh grid grid-cols-2 justify-center items-center flex-col uppercase tracking-[3px]"
>
  <div class=" h-full flex items-center pl-6">
    <h1 class="text-5xl text-white font-semibold up font-kolors tracking-wide">
      <span class="text-7xl">Auth</span> <br />
      <span class="text-9xl text-orange-500">Sveltekit</span>
    </h1>
  </div>
  <div class="grid grid-rows-2 h-full">
    <a
      href="/registration"
      class="h-full flex items-center transition-all justify-center hover:bg-orange-500"
    >
      <span class="text-gray-200 text-5xl">Registration</span
      >
    </a>
    <a
      class="flex items-center transition-all justify-center hover:bg-orange-500"
      href="/login"
    >
      <span class="text-5xl text-gray-200">Login</span>
    </a>
  </div>
</div>
