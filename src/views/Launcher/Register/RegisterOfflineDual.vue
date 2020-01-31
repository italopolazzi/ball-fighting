<template>
  <div class="register-offline-dual">
    <RegistersStepper :module_key="module_key" />
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
      module_key: "dual"
    };
  }
};
</script>
