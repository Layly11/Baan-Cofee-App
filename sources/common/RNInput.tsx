import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Colors, FontFamily, FontSize, hp, normalize, wp } from "../theme";

const RNInput = React.forwardRef((props: any, ref:any) => {
  const {
    inputStyle,
    iconstyle,
    placeholder,
    placeholderTextColor,
    style,
    onChangeText,
    onSubmitEditing,
    onEndEditing,
    onFocus,
    onBlur,
    keyboardType,
    returnKeyType,
    secureTextEntry,
    value,
    textAlign,
    maxLength,
    onChange,
    onKeyPress,
    editable,
    multiline,
    numberOfLines,
    spellCheck,
    toggleVisibility,
    LeftIcon,
    RightIcon,
  } = props;

  return (
    <View style={[styles.inputContainer, inputStyle]}>
      {LeftIcon && <View style={[iconstyle]}>{LeftIcon}</View>}

      <TextInput
        ref={ref}
        editable={editable}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor ?? Colors.Brown}
        style={[styles.input, style]}
        onKeyPress={onKeyPress}
        onChange={onChange}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onEndEditing={onEndEditing}
        onFocus={onFocus}
        onBlur={onBlur}
        keyboardType={keyboardType || "default"}
        returnKeyType={returnKeyType || "next"}
        secureTextEntry={secureTextEntry || false}
        value={value}
        textAlign={textAlign || "left"}
        textAlignVertical={"top"}
        autoCorrect={false}
        spellCheck={spellCheck ?? true}
        autoCapitalize={"none"}
        maxLength={maxLength}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />

      {toggleVisibility && (
        <TouchableOpacity onPress={toggleVisibility}>
          {RightIcon ? <View>{RightIcon}</View> : null}
        </TouchableOpacity>
      )}
    </View>
  );
});

RNInput.displayName = "RNInput"


const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: normalize(50),
    flexDirection: "row",
    alignItems: "center",
    height: hp(6),
    paddingHorizontal: wp(2),
    backgroundColor: Colors.Beige,
  },
  input: {
    flex: 1,
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    fontSize: FontSize.font18,
    fontFamily: FontFamily.SemiBold,
    color: Colors.DarkBrown,
  },
});

export default RNInput;
