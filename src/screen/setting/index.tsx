import Slider from "@react-native-community/slider";
import Icon from "@react-native-vector-icons/lucide";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { FC } from "react";
import {
	FlatList,
	Modal,
	Platform,
	ScrollView,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ColorPicker, {
	BrightnessSlider,
	InputWidget,
	OpacitySlider,
	Panel2,
} from "reanimated-color-picker";
import { Button, Divider, Text, TextInput } from "@/common/components";
import { colors } from "@/common/theme";
import { OptionTheme, Section } from "./components";
import style, { colorPickerStyle } from "./styles";
import useSetting from "./useSetting";

const textAlignValues: TextAlign[] = ["left", "center", "right", "justify"];

export const Setting: FC<BottomTabScreenProps<_IRootTabs, "settings">> = () => {
	const {
		themes,
		currentTheme,
		fontSize,
		textAlign,
		lineHeight,
		setCurrentTheme,
		setFontSize,
		setTextAlign,
		setLineHeight,
		showModal,
		setShowModal,
		handleAddNote,
		handleRemoveNote,
		onChange,
		onColorChange,
		onColorPick,
		color,
		label,
		style: styleMarker,
		notes,
		paddingHorizontal,
		setPaddingHorizontal,
	} = useSetting();
	const { width, height } = useWindowDimensions();
	const { bottom, top } = useSafeAreaInsets();
	const isPortrait = height > width;
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
				<Text style={{ fontWeight: "bold" }}>
					Margen: {paddingHorizontal + 20}
				</Text>
				<Slider
					style={{ width: "100%", height: 20 }}
					minimumValue={0}
					maximumValue={20}
					value={paddingHorizontal}
					onValueChange={setPaddingHorizontal}
					upperLimit={20}
					lowerLimit={0}
					step={1}
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
							paddingHorizontal: 20 + paddingHorizontal,
						},
					]}
				>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae,
					architecto incidunt itaque expedita praesentium earum?
				</Text>
			</Section>
			<Section
				title="Notas"
				description="Personaliza tus notas"
				icon="notebook-pen"
			>
				<View style={{ gap: 10, flexDirection: "row", marginBottom: 10 }}>
					<FlatList
						data={notes}
						// horizontal
						scrollEnabled={false}
						contentContainerStyle={{
							justifyContent: "center",
							// alignItems: "center",
							gap: 10,
						}}
						renderItem={({ item }) => (
							<View
								style={{
									backgroundColor: currentTheme.value.body.background,
									padding: 5,
									borderRadius: 5,
									width: "100%",
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<Text
									style={{
										color: currentTheme.value.p.color.split(" ")[0],
										textDecorationLine:
											item.style === "highlight" ? "none" : "underline",
										textDecorationColor:
											item.style === "highlight" ? undefined : item.color,
										backgroundColor:
											item.style === "highlight" ? item.color : undefined,
									}}
								>
									{item.label}
								</Text>
								<TouchableOpacity
									onPress={() => handleRemoveNote(item.id)}
									activeOpacity={0.7}
								>
									<Icon name="trash" size={20} color={colors.danger} />
								</TouchableOpacity>
							</View>
						)}
						keyExtractor={(item) => item.id}
						ListEmptyComponent={<Text>No hay notas disponibles</Text>}
					/>
				</View>

				<Button label="Añadir Nota" onPress={() => setShowModal(true)} />
			</Section>
			<Modal visible={showModal} animationType="slide">
				<View
					style={{
						padding: 20,
						paddingTop: Platform.OS === "ios" ? top : undefined,
						flex: 1,
						gap: 10,
					}}
				>
					<View
						style={{
							alignItems: "center",
							justifyContent: "space-between",
							flexDirection: "row",
						}}
					>
						<Text style={{ fontWeight: "bold", fontSize: 20 }}>
							Añadir Nota
						</Text>
						<TouchableOpacity
							onPress={() => setShowModal(false)}
							activeOpacity={0.7}
						>
							<Text style={{ color: colors.primary }}>Cancelar</Text>
						</TouchableOpacity>
					</View>
					<TextInput
						value={label}
						onChangeText={(text) => onChange(text, "label")}
						placeholder="Identificador del marcador"
						style={{
							marginBottom: 10,
						}}
					/>
					<Text style={{ fontWeight: "bold", fontSize: 16 }}>
						Color de la Nota
					</Text>
					<ColorPicker
						value={color}
						sliderThickness={25}
						thumbSize={30}
						thumbShape="rect"
						onChange={onColorChange}
						onCompleteJS={onColorPick}
						style={colorPickerStyle.picker}
					>
						<Panel2
							style={colorPickerStyle.panelStyle}
							thumbShape="ring"
							reverseVerticalChannel
						/>
						<BrightnessSlider style={colorPickerStyle.sliderStyle} />
						<OpacitySlider style={colorPickerStyle.sliderStyle} />
						<Divider />
						<InputWidget
							inputStyle={colorPickerStyle.inputStyle}
							iconColor="#707070"
						/>
					</ColorPicker>
					<Text style={{ fontWeight: "bold", fontSize: 16 }}>
						Estilo de la Nota
					</Text>
					<View style={{ flexDirection: "row", gap: 20, marginBottom: 10 }}>
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => onChange("highlight", "style")}
							style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
						>
							<View
								style={
									styleMarker === "highlight"
										? {
												borderWidth: 5,
												padding: 7,
												borderRadius: 50,
												borderColor: colors.primary,
											}
										: {
												borderWidth: 1,
												padding: 10,
												borderRadius: 50,
												borderColor: "#cdcece",
											}
								}
							/>
							<Text>Resaltar</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => onChange("underline", "style")}
							style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
						>
							<View
								style={
									styleMarker === "underline"
										? {
												borderWidth: 5,
												padding: 7,
												borderRadius: 50,
												borderColor: colors.primary,
											}
										: {
												borderWidth: 1,
												padding: 10,
												borderRadius: 50,
												borderColor: "#cdcece",
											}
								}
							/>
							<Text>Subrayar</Text>
						</TouchableOpacity>
					</View>

					<Text
						style={[
							style.textExampleHighlighted,
							{
								color: currentTheme.value.p.color.split(" ")[0],
								textAlign: "justify",
							},
							styleMarker === "highlight"
								? {
										backgroundColor: color,
									}
								: {
										textDecorationLine: "underline",
										textDecorationColor: color,
										textDecorationStyle: "double",
									},
						]}
					>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae,
						architecto incidunt itaque expedita praesentium earum?
					</Text>
					<Button label="Guardar" onPress={handleAddNote} />
				</View>
			</Modal>

			<View style={{ height: isPortrait ? bottom + 40 : bottom + 20 }} />
		</ScrollView>
	);
};
