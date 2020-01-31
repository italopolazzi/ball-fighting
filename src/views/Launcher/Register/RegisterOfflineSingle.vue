<template>
  <div class="register-offline-single">
    <RegistersStepper :module_key="module_key" />
  </div>
</template>

<script>
import RegistersStepper from "@/components/RegistersStepper";
export default {
  name: "register-offline-single",
  components: {
    RegistersStepper
  },
  data() {
    return {
      module_key: "single"
    };
  }
};
</script>
