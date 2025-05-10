<template>
  <div :style='props.style' :class='cls'>
    <template v-if="isExtra || isTitle">
      <div :style='headerStyle' :class='headerCls'>
        <div :class='headerTitleCls'>
          <template v-if='props.title'>
            {{ props.title }}
          </template>
          <template v-else>
            <slot name='title' />
          </template>
        </div>
        <div :class='headerExtraCls'>
          <template v-if='props.extra'>
            {{ props.extra }}
          </template>
          <template v-else>
            <slot name='extra' />
          </template>
        </div>
      </div>
    </template>
    <div></div>
    <div :style='bodyStyle' :class='bodyCls'>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import clx from 'classnames';
import { defineProps, withDefaults, toValue, computed, StyleValue } from "vue"
import type { FormLayoutProps } from "../interface/layout"
import { useAttrsInject, useAttrsProvide } from "../hooks/useAttrs"
const preCls = 'carefrees-form-item';
const attrs = useAttrsInject();
const props = withDefaults(defineProps<FormLayoutProps>(), {})

defineOptions({
  name: 'Layout',
  inheritAttrs: false, // 可选，防止属性自动应用到根元素
});

const solts = defineSlots<{
  default: any,
  title: any,
  extra: any,
}>()

const colCount = computed(() => toValue(props.colCount) ?? toValue(attrs.value.colCount))
const errorLayout = computed(() => toValue(props.errorLayout) ?? toValue(attrs.value.errorLayout))
const labelMode = computed(() => toValue(props.labelMode) ?? toValue(attrs.value.labelMode))
const showColon = computed(() => toValue(props.showColon) ?? toValue(attrs.value.showColon))
const formItemClass = computed(() => toValue(props.formItemClass) ?? toValue(attrs.value.formItemClass))
const formItemStyle = computed(() => toValue(props.formItemStyle) ?? toValue(attrs.value.formItemStyle))
const formItemLabelClass = computed(() => toValue(props.formItemLabelClass) ?? toValue(attrs.value.formItemLabelClass))
const formItemLabelStyle = computed(() => toValue(props.formItemLabelStyle) ?? toValue(attrs.value.formItemLabelStyle))

useAttrsProvide({
  colCount,
  errorLayout,
  labelMode,
  showColon,
  formItemClass,
  formItemStyle,
  formItemLabelClass,
  formItemLabelStyle
})

const cls = computed(() => clx(preCls, props.class, { 'all-colspan': props.isAllColSpan, bordered: props.bordered, }));
const bodyCls = computed(() => clx(`${preCls}-body`, props.bodyClass));
const headerCls = computed(() => clx(`${preCls}-header`, props.headerClass));
const headerTitleCls = computed(() => clx(`${preCls}-header-title`));
const headerExtraCls = computed(() => clx(`${preCls}-header-extra`));

const bodyStyle = computed(() => {
  const css: StyleValue = {};
  if (typeof props.gap === 'string') {
    css.gap = props.gap;
  }
  if (typeof props.gap === 'number') {
    css.gap = `${props.gap}px`;
  }
  if (colCount) {
    css.gridTemplateColumns = `repeat(${colCount}, auto)`;
  }
  return [css, props.bodyStyle];
});

const isTitle = computed(() => {
  return !!props.title || solts.title;
})

const isExtra = computed(() => {
  return !!props.extra || solts.extra;
})
</script>