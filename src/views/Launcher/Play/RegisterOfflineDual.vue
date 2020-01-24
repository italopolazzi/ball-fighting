<template>
  <div class="register-offline-dual">
    <PlayersRegister />
  </div>
</template>

<script>
import PlayersRegister from "@/components/Register/PlayersRegister";
import { mapGetters } from "vuex";
export default {
  name: "register-offline-dual",
  components: {PlayersRegister},
  computed: {
    ...mapGetters("register/dual", {})
  }
};
</script>

<style>
</style>