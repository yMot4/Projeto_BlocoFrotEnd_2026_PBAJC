import { Pressable, View } from 'react-native';

export default function Button({ ariaLabel, onClick, children, style }) {
  return (
    <Pressable
      accessibilityLabel={ariaLabel}
      accessibilityRole="button"
      onPress={onClick}
      style={style}
    >
      <View>{children}</View>
    </Pressable>
  );
}
