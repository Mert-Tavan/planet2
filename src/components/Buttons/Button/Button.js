import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../utils/colors';

const Button = ({icon, isIcon = false, text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {isIcon && icon}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 9,
    width: 144,
  },
  text:{
    fontSize: 15,
    lineHeight: 22.5,
    fontWeight: '500',
    color: colors.white
  }
});
