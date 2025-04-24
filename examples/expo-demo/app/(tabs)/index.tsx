import { Image, StyleSheet, Platform, View, Text, TextInput, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Form, FormItem, useForm, FormLayout } from '@carefrees/form-utils-react-native';

export default function HomeScreen() {
  const form = useForm();

  const onPress = async () => {
    try {
      console.log('onPressLearnMore');
      const result = await form.validate();
      console.log('result', result);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Image source={require('@/assets/images/partial-react-logo.png')} style={styles.reactLogo} />}
    >
      {/* <TextInput onChange={(event) => {
        console.log('onChange', event.nativeEvent.text)
      }}
        placeholder='请输入' /> */}

      <Form form={form}>
        <FormItem rules={[{ required: true, message: '必填' }]} name="a" label="a">
          <TextInput style={{ width: '100%' }} placeholder="请输入" />
        </FormItem>
        <FormItem name="b" label="b">
          <TextInput style={{ width: '100%' }} placeholder="请输入" />
        </FormItem>

        <FormLayout labelMode="left">
          <FormItem rules={[{ required: true, message: '必填' }]} name="a" label="a">
            <TextInput style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem name="b" label="b">
            <TextInput style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
        </FormLayout>

        <FormLayout labelMode="between">
          <FormItem rules={[{ required: true, message: '必填' }]} name="a" label="a">
            <TextInput style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem name="b" label="b">
            <TextInput style={{ width: '100%', textAlign: 'right' }} placeholder="请输入" />
          </FormItem>
        </FormLayout>
      </Form>
      <Button onPress={onPress} title="验证" color="#841584" />
      {/* <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView> */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
