import Icon from "@react-native-vector-icons/lucide";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { FC } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "@/components";
import { useSettingStore } from "@/stores";
import { colors } from "@/theme";
import { OptionTheme } from "./components";
import style from "./styles";

export const Setting: FC<BottomTabScreenProps<_IRootTabs, "settings">> = () => {
	const themes = useSettingStore((state) => state.themes);
	const currentTheme = useSettingStore((state) => state.currentTheme);
	const setCurrentTheme = useSettingStore((state) => state.setCurrentTheme);
	return (
		<ScrollView contentContainerStyle={style.root}>
			<View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
				<Icon
					name="book-open"
					color={colors.primary}
					size={30}
					style={style.icon}
				/>
				<View>
					<Text style={style.title}>Configuraciones</Text>
					<Text style={style.subtitle}>
						Personaliza tu experiencia de lectura
					</Text>
				</View>
			</View>
			<View style={style.section}>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
					<Icon name="palette" size={25} color={colors.primary} />
					<Text style={style.titleSection}>Tema de Lectura</Text>
				</View>
				<Text>Elige el tema que más te guste para leer</Text>
				{themes.map((theme, index) => (
					<OptionTheme
						key={`theme-${index.toString()}`}
						label={theme.label}
						description={theme.description}
						active={currentTheme.label === theme.label}
						onPress={() => setCurrentTheme(theme)}
					/>
				))}
			</View>
		</ScrollView>
	);
};
