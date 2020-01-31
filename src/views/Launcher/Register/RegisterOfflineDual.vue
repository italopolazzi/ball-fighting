<template>
  <div class="register-offline-dual">
    <RegistersStepper :namespace="namespace" />
  </div>
</template>

<script>
import RegistersStepper from "@/components/RegistersStepper";
export default {
  name: "register-offline-dual",
  components: {
    RegistersStepper
  },
  data() {
    return {
      namespace: "dual"
    };
  }
};
</script>
