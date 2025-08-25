import Slider from "@react-native-community/slider";
import Icon from "@react-native-vector-icons/lucide";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { type FC, useEffect } from "react";
import {
	ScrollView,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "@/components";
import { useSettingStore } from "@/stores";
import { colors } from "@/theme";
import { OptionTheme, Section } from "./components";
import style from "./styles";

const textAlignValues: TextAlign[] = ["left", "center", "right", "justify"];
export const Setting: FC<BottomTabScreenProps<_IRootTabs, "settings">> = () => {
	const themes = useSettingStore((state) => state.themes);
	const currentTheme = useSettingStore((state) => state.currentTheme);
	const fontSize = useSettingStore((state) => state.fontSize);
	const textAlign = useSettingStore((state) => state.textAlign);
	const lineHeight = useSettingStore((state) => state.lineHeight);

	const setCurrentTheme = useSettingStore((state) => state.setCurrentTheme);
	const setFontSize = useSettingStore((state) => state.setFontSize);
	const setTextAlign = useSettingStore((state) => state.setTextAlign);
	const setLineHeight = useSettingStore((state) => state.setLineHeight);

	const { width, height } = useWindowDimensions();
	const { bottom } = useSafeAreaInsets();

	const isPortrait = height > width;

	useEffect(() => {
		console.log("Font size changed:", fontSize);
	}, [fontSize]);

	return (
		<ScrollView
			contentContainerStyle={style.root}
			showsVerticalScrollIndicator={false}
		>
			<View style={style.headerRow}>
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
			<Section
				title="Tema de Lectura"
				description="Elige el tema que más te guste para leer"
				icon="palette"
			>
				{themes.map((theme, index) => (
					<OptionTheme
						key={`theme-${index.toString()}`}
						label={theme.label}
						description={theme.description}
						active={currentTheme.label === theme.label}
						onPress={() => setCurrentTheme(theme)}
					/>
				))}

				<View
					style={[
						style.imageTheme,
						{
							width: isPortrait ? "50%" : "25%",
							backgroundColor: currentTheme.value.body.background,
						},
					]}
				>
					<Text
						style={[
							style.titleExample,
							{
								color: currentTheme.value.p.color.split(" ")[0],
							},
						]}
					>
						Titulo de ejemplo
					</Text>
					<Text
						style={[
							style.textExample,
							{
								color: currentTheme.value.p.color.split(" ")[0],
							},
						]}
					>
						texto de ejemplo
					</Text>
				</View>
			</Section>
			<Section
				title="Ajuste de la fuente"
				description="Ajusta el tamaño del texto, alineación y espaciado para una lectura cómoda"
				icon="type"
			>
				<Text style={{ fontWeight: "bold" }}>Ajustar alineación</Text>
				<View
					style={{
						flexDirection: "row",
						gap: 10,
						marginVertical: 8,
					}}
				>
					{textAlignValues.map((align) => (
						<TouchableOpacity
							key={align}
							activeOpacity={0.7}
							style={{
								padding: 8,
								borderRadius: 5,
								backgroundColor:
									textAlign === align ? colors.secondary : "#fff",
							}}
							onPress={() => setTextAlign(align)}
						>
							<Icon
								name={`align-${align}`}
								size={20}
								color={textAlign === align ? colors.primary : undefined}
							/>
						</TouchableOpacity>
					))}
				</View>
				<Text style={{ fontWeight: "bold" }}>
					Tamaño de Fuente: {fontSize}px
				</Text>
				<Slider
					style={{ width: "100%", height: 20 }}
					minimumValue={16}
					maximumValue={50}
					value={fontSize}
					onValueChange={setFontSize}
					upperLimit={50}
					lowerLimit={16}
					step={1}
					thumbTintColor={colors.primary}
					minimumTrackTintColor={colors.primary}
					maximumTrackTintColor={colors.secondary}
				/>
				<Text style={{ fontWeight: "bold" }}>
					Espaciado: {lineHeight.toFixed(1)}
				</Text>
				<Slider
					style={{ width: "100%", height: 20 }}
					minimumValue={1.3}
					maximumValue={2}
					value={lineHeight}
					onValueChange={setLineHeight}
					upperLimit={2}
					lowerLimit={1.3}
					step={0.1}
					thumbTintColor={colors.primary}
					minimumTrackTintColor={colors.primary}
					maximumTrackTintColor={colors.secondary}
				/>

				<Text
					style={[
						style.textExampleHighlighted,
						{
							backgroundColor: currentTheme.value.body.background,
							color: currentTheme.value.p.color.split(" ")[0],
							fontSize,
							textAlign,
							lineHeight: lineHeight * fontSize,
						},
					]}
				>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae,
					architecto incidunt itaque expedita praesentium earum?
				</Text>
			</Section>

			<View style={{ height: isPortrait ? bottom + 40 : bottom + 20 }} />
		</ScrollView>
	);
};
