<script setup>
import { ref, computed } from 'vue'

const props = defineProps([
  'autocomplete',
  'error',
  'forceDirty',
  'icon',
  'modelValue',
  'name',
  'title',
  'type',
  'width',
])

const emit = defineEmits(['update:modelValue'])

const dirty = ref(false)
const isDirty = computed(() => dirty.value || props.forceDirty)
</script>

<template>
  <div :class="`col-lg-${width}`">
    <label :for="name" class="form-label">{{ title }}</label>
    <div class="input-group has-validation">
      <span class="input-group-text">
        <i :class="`bi bi-${icon}`"></i>
      </span>
      <input
        :type="type"
        class="form-control"
        :class="{
          'is-valid': isDirty && !error,
          'is-invalid': isDirty && error,
        }"
        :autocomplete="autocomplete"
        :id="name"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="dirty = true"
      />
      <div class="invalid-feedback">{{ error }}</div>
    </div>
  </div>
</template>
