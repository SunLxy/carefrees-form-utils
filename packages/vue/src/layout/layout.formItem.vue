<template>
  <div :class='cls' :style='style'>
    <div :class='containerCls'>
      <template v-if='_isLabel'>
        <div :class='labelWarpCls'>
          <label :style='labelStyle' :class='labelCls' :for='toValue(props.htmlFor)'>
            <template v-if='props.label'>
              {{ props.label }}
            </template>
            <template v-else>
              <slot name='label' />
            </template>
          </label>
        </div>
      </template>
      <div :class='preCls + "-body"'>
        <div :class='inputCls'>
          <slot />
        </div>
        <template v-if='isHelpText'>
          <div :class='preCls + "-body-help"'>
            <template v-if='props.helpText'>
              {{ props.helpText }}
            </template>
            <template v-else>
              <slot name='helpText' />
            </template>
          </div>
        </template>
        <template v-if='!!tips'>
          <div :class='errorCls'>{{ tips }}</div>
        </template>
      </div>
    </div>
    <template v-if='isExtra'>
      <div :class='preCls + "-extra"'>
        <template v-if='props.extra'>
          {{ props.extra }}
        </template>
        <template v-else>
          <slot name='extra' />
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import clx from 'classnames';
import { defineProps, withDefaults, toValue, computed, StyleValue, watch } from "vue"
import type { LayoutFormItemProps } from "../interface/layout.formItem"
import { useAttrsInject } from "../hooks/useAttrs"
const preCls = 'carefrees-form-item';
defineOptions({
  name: 'LayoutFormItem',
  inheritAttrs: false, // 可选，防止属性自动应用到根元素
});
const attrs = useAttrsInject();
const props = withDefaults(defineProps<LayoutFormItemProps>(), {})

const solts = defineSlots<{
  default: any,
  label: any,
  helpText: any,
  extra: any,
}>()

const labelMode = computed(() => props.labelMode ?? toValue(attrs.value.labelMode) ?? 'top')
const showColon = computed(() => props.showColon ?? toValue(attrs.value.showColon))
const errorLayout = computed(() => props.errorLayout ?? toValue(attrs.value.errorLayout) ?? "left-bottom")
const tips = computed(() => {
  const v = toValue(props.validateResult)?.tip
  if (Array.isArray(v)) {
    return v.join(',')
  }
  return v
});
watch(() => [props.validateResult?.value], () => {
  console.log(props.validateResult)
})

const cls = computed(() => clx(preCls, props.class, toValue(attrs.value.formItemClass), { 'dx-invalid': !!toValue(props.validateResult)?.isInvalid }))
const containerCls = computed(() => clx(`${preCls}-container`, { [`${labelMode.value}`]: !!labelMode.value }));
const labelCls = computed(() => clx(`${preCls}-label`, { required: !!props.required, 'show-colon': showColon && (labelMode.value === 'left' || labelMode.value === 'between'), },));
const labelWarpCls = computed(() => clx(`${preCls}-label-warp`, toValue(props.labelClass), toValue(attrs.value.formItemLabelClass)));
const inputCls = computed(() => clx(`${preCls}-body-input`));
const errorCls = computed(() => clx(`${preCls}-body-error`, { [errorLayout.value]: !!errorLayout.value }));
const _isLabel = computed(() => (props.label || solts.label) && labelMode.value !== 'hide');

const style = computed(() => {
  const css: StyleValue = {};

  if (props.onlyRuleStyle) {
    css.padding = '0px';
  }

  if (props.colSpan) {
    const colCount = toValue(attrs.value.colCount) || 4;
    const end = colCount > props.colSpan ? props.colSpan : colCount;
    css.gridColumnEnd = `span ${end}`;
  }

  if (props.rowSpan) {
    css.gridRowEnd = `span ${props.rowSpan}`;
  }

  return [toValue(attrs.value.formItemStyle), props.style, css]
})

const labelStyle = computed(() => {
  return [toValue(attrs.value.formItemLabelStyle), props.labelStyle]
})

const isHelpText = computed(() => {
  return !!props.helpText || solts.helpText;
})

const isExtra = computed(() => {
  return !!props.extra || solts.extra;
})

</script>