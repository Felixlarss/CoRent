<script lang="ts">
  import {
    confirmLogin,
    addMember,
	getMemberData,
  } from "../lib/services/memberApi.ts";

  type Props = {
    signUpForm?: boolean;
  };

  let member_name: string = $state("");
  let password: string = $state("");
  let confirmPassword: string = $state("");
  let error: { error: unknown } = $state({ error: "" });
  let { signUpForm = false }: Props = $props();
  let loginRedirect: "Loggin in..." | null = $state(null);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (signUpForm) {
      // signUpForm
      const create_res = await addMember(
        member_name,
        password,
        confirmPassword,
      );
      if (!create_res.ok) error.error = create_res.error;
      console.log(password)
    } else {
      // logIn form
      const confirm_response = await confirmLogin(member_name, password);
      if (!confirm_response.ok) {
        error.error = confirm_response.error;
      } else {
        // check if user credentials are valid
        const member_response = await getMemberData();
        if (!member_response.ok) {
          error.error = member_response.error;
        }
      }
      //get member with token
      if (!error.error) {
        loginRedirect = "Loggin in...";
        setTimeout(() => {
          window.location.href ='/new-user';
        }, 1000);
      }
    }
  }
</script>


<div class="flex flex-col p-5 items-center">
  <form onsubmit={handleSubmit} class="flex sm:w-screem md:w-1/4 p-5 flex-col gap-3">
  <h1 class="flex font-bold text-3xl">{signUpForm ? "Sign up" : "Log in"}</h1>
    <input
      bind:value={member_name}
      placeholder="name"
      required
    />
    <input
      bind:value={password}
      placeholder="Password"
      type="password"
      required
    />
    {#if signUpForm}
      <input
        bind:value={confirmPassword}
        placeholder="Repeat password"
        type="password"
        required
      />
    {/if}
    {#if error.error}
      <p class="text-wrap text-red-500 text-sm">
        {error.error}
      </p>
    {/if}
    {#if loginRedirect}
      <p class="text-wrap text-green-500 text-sm">
        {loginRedirect}
      </p>
    {/if}
    <div class="flex justify-between">
      <button type="submit" class="w-fit p-2"
        onclick={() => {
          if (signUpForm){
          alert('SignUp Confirmed')
          }
        }}
        >{signUpForm ? "Sign up" : "Log in"}</button
      >
      <a
        type="button"
        onclick={() => {
          signUpForm = !signUpForm;
        }}
        class="w-fit none p-2 cursor-pointer hover:underline bg text-amber-600"
        >{signUpForm ? "Log in" : "Sign up"}</a
      >
    </div>
  </form>
</div>
