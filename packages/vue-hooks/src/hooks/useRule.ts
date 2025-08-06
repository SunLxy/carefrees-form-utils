import { RuleInstanceBase } from '../instance/ruleIntsnace';
import { ref, Ref, toValue } from 'vue';

/** 初始化 规则实例*/
export function useRules(rules?: Ref<RuleInstanceBase> | RuleInstanceBase) {
  const refRules = ref<RuleInstanceBase>();
  if (!refRules.value) {
    const value = toValue(rules);
    if (value) {
      refRules.value = value;
    } else {
      refRules.value = new RuleInstanceBase();
    }
  }
  return refRules as Ref<RuleInstanceBase>;
}
