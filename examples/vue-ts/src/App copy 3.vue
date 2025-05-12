<script lang="ts" setup>
import { set, get } from "@carefrees/form-utils"
import { ref, watch, reactive } from "vue"

class Demo {
  store = reactive({})
  update = (name: string, value: any) => {
    set(this.store, name, value)
  }
  get = (name: string) => {
    return get(this.store, name)
  }
}

const name = 'a.b.c.d'

const demo = ref(new Demo());

watch(() => [get(demo.value.store, name)], () => {
  console.log("demo.value.store==2=>", demo.value.store)
})

const onClick = () => {
  demo.value.update(name, new Date().getTime())
  console.log("demo.value.store==1=>", demo.value.store)
}

</script>

<template>
  <div>
    <button @click='onClick'>更新</button>
  </div>
</template>

<style scoped></style>