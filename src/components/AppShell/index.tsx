import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { NativeButton } from '../NativePage';
import { navigation, routes } from '../../shared/routes';
import { nativeStyles as styles } from '../NativePage/styles.native';
import { useTheme } from '../../shared/themeContext/useTheme';
import { useMemes } from '../../shared/memesContext/useMemes';

const AppShell = ({ children, sticky = true }: { children: ReactNode; sticky?: boolean }) => {
  const { theme, palette, error, toggleTheme } = useTheme();
  const { notice, dismissNotice } = useMemes();
  return <View nativeID={`app-shell`} style={[styles.shell, { backgroundColor: palette.paper }]}><View nativeID={`site-header`} style={[styles.header, { borderColor: palette.border }]} accessibilityLabel={sticky ? `Sticky header` : `Header`}><View style={[styles.row, { justifyContent: `space-between` }]}><Text style={[styles.brand, { color: palette.ink }]}>Memes Database</Text><NativeButton title={theme === `dark` ? `☀ Light` : `☾ Dark`} onPress={toggleTheme} /></View><View style={styles.row}>{navigation.map(item => <NativeButton key={item.path} id={`nav-${item.label}`} title={item.label} href={item.path} />)}<NativeButton title={`+ Add`} href={routes.add} primary /><NativeButton id={`header-account-access`} title={`Sign In / Sign Up`} href={routes.signin} primary /></View></View>{error ? <Text accessibilityRole={`alert`} style={[styles.small, { color: palette.coral, padding: 15 }]}>{error}</Text> : null}<View style={styles.body}>{children}</View>{notice ? <View style={[styles.row, { padding: 15 }]}><Text style={[styles.small, { color: palette.ink, flex: 1 }]}>{notice}</Text><NativeButton title={`×`} onPress={dismissNotice} /></View> : null}<View nativeID={`site-footer`} style={[styles.footer, { borderColor: palette.border }]}><View style={styles.row}><NativeButton title={`About`} href={routes.about} /><NativeButton title={`Terms`} href={routes.terms} /><NativeButton title={`Privacy`} href={routes.privacy} /><NativeButton title={`Contact`} href={routes.contact} /></View><View style={[styles.row, { justifyContent: `space-between` }]}><Text style={[styles.small, { color: palette.muted }]}>© {new Date().getFullYear()} Memes-Database</Text><NativeButton title={`Piratechs ↗`} href={`https://piratechs.com/`} /></View></View></View>;
};

export default AppShell;
