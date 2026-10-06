import { ScrollView, Text, TextInput, View } from 'react-native';
import { NativeButton } from '../NativePage';
import { authStyles as styles } from './styles.native';
import { useTheme } from '../../shared/themeContext/useTheme';
import { accountNotice, authContent, type AuthFormProps } from './content';

const AuthForm = ({ mode }: AuthFormProps) => {
  const { palette } = useTheme();
  const copy = authContent[mode];
  const signup = mode === `signup`;
  const fieldStyle = [styles.field, { color: palette.ink, borderColor: palette.border, backgroundColor: palette.paper }];

  return (
    <ScrollView
      nativeID={`${mode}-page`}
      keyboardShouldPersistTaps={`handled`}
      contentContainerStyle={styles.content}
      style={[styles.page, { backgroundColor: palette.paper }]}
    >
      <View nativeID={`${mode}-heading`} style={styles.heading}>
        <Text nativeID={`${mode}-eyebrow`} style={[styles.eyebrow, { color: palette.accent }]}>{copy.eyebrow}</Text>
        <Text nativeID={`${mode}-title`} accessibilityRole={`header`} style={[styles.title, { color: palette.ink }]}>{copy.title}</Text>
        <Text nativeID={`${mode}-subtitle`} style={[styles.subtitle, { color: palette.muted }]}>{copy.subtitle}</Text>
      </View>
      <View nativeID={`${mode}-card`} style={[styles.card, { borderColor: palette.border, backgroundColor: palette.surface }]}>
        <View nativeID={`${mode}-navigation`} style={styles.navigation}>
          <NativeButton id={`${mode}-tab-signin`} href={`/signin`} title={`→ Sign In`} primary={!signup} />
          <NativeButton id={`${mode}-tab-signup`} href={`/signup`} title={`+ Sign Up`} primary={signup} />
        </View>
        {signup ? (
          <View nativeID={`${mode}-name-field`} style={styles.fieldGroup}>
            <Text nativeID={`${mode}-name-label`} style={[styles.label, { color: palette.ink }]}>Name</Text>
            <TextInput
              maxLength={100}
              autoComplete={`name`}
              nativeID={`${mode}-name`}
              accessibilityLabel={`Name`}
              style={fieldStyle}
              placeholderTextColor={palette.muted}
              placeholder={`What should we call you?`}
            />
          </View>
        ) : null}
        <View nativeID={`${mode}-email-field`} style={styles.fieldGroup}>
          <Text nativeID={`${mode}-email-label`} style={[styles.label, { color: palette.ink }]}>Email</Text>
          <TextInput
            autoCorrect={false}
            autoComplete={`email`}
            nativeID={`${mode}-email`}
            autoCapitalize={`none`}
            keyboardType={`email-address`}
            accessibilityLabel={`Email`}
            style={fieldStyle}
            placeholder={`you@example.com`}
            placeholderTextColor={palette.muted}
          />
        </View>
        <View nativeID={`${mode}-password-field`} style={styles.fieldGroup}>
          <Text nativeID={`${mode}-password-label`} style={[styles.label, { color: palette.ink }]}>Password</Text>
          <TextInput
            secureTextEntry
            autoCorrect={false}
            autoCapitalize={`none`}
            nativeID={`${mode}-password`}
            accessibilityLabel={`Password`}
            style={fieldStyle}
            placeholderTextColor={palette.muted}
            placeholder={signup ? `Choose a password` : `Your password`}
            autoComplete={signup ? `new-password` : `current-password`}
          />
        </View>
        <Text nativeID={`${mode}-availability`} style={[styles.notice, { color: palette.muted }]}>{accountNotice}</Text>
        <NativeButton disabled primary id={`${mode}-submit`} title={`${signup ? `+` : `→`} ${copy.action}`} />
      </View>
      <NativeButton id={`${mode}-browse`} href={`/discover`} title={`← Keep Browsing Memes`} />
    </ScrollView>
  );
};

export default AuthForm;
