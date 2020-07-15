<template>
  <div class="register-offline-single">
    <RegistersStepper :namespace="namespace" />
  </div>
</template>

<script>
import RegistersStepper from "@/components/RegistersStepper";
export default {
  name: "register-offline-single",
  components: {
    RegistersStepper
  },
  computed: {
    namespace() {
      return this.$route.params.namespace;
    }
  }
};
</script>
