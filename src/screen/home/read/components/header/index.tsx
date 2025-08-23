import DeviceBrightness from "@adrianso/react-native-device-brightness";
import type { Flow } from "@epubjs-react-native/core";
import Slider from "@react-native-community/slider";
import Icon, { type LucideIconName } from "@react-native-vector-icons/lucide";
import { type FC, useEffect, useState } from "react";
import {
	Animated,
	FlatList,
	Platform,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import DropShadow from "react-native-drop-shadow";
import { Divider, Text } from "@/components";
import { useSettingStore } from "@/stores";
import { colors } from "@/theme";

type IHeaderProps = {
	currentTheme: ITheme;
	title: string;
	onClose: () => void;
	opacity: Animated.Value;
};

type FlowOption = {
	value: Flow;
	label: string;
	icon: LucideIconName;
};

const flowOptions: FlowOption[] = [
	{ value: "paginated", label: "Paginado", icon: "book-open" },
	{ value: "scrolled", label: "Desplazado", icon: "gallery-vertical" },
	{
		value: "scrolled-doc",
		label: "Desplazado documento",
		icon: "gallery-vertical",
	},
	{
		value: "scrolled-continuous",
		label: "Desplazado continuo",
		icon: "gallery-vertical",
	},
];

export const Header: FC<IHeaderProps> = ({
	currentTheme,
	title,
	onClose,
	opacity,
}) => {
	const [openMenu, setOpenMenu] = useState(false);
	const [brightness, setBrightness] = useState(0);
	const flow = useSettingStore((state) => state.currentFlow);
	const changeFlow = useSettingStore((state) => state.setFlow);

	useEffect(() => {
		const data = async () => {
			const currentBrightness =
				Platform.OS === "android"
					? await DeviceBrightness.getSystemBrightnessLevel()
					: await DeviceBrightness.getBrightnessLevel();
			setBrightness(currentBrightness);
		};
		data();
	}, []);

	return (
		<>
			<Animated.View
				style={[
					style.root,
					{
						opacity,
					},
				]}
			>
				<DropShadow style={style.boxShadow}>
					<View
						style={[
							style.container,
							{ backgroundColor: currentTheme.value.body.background },
						]}
					>
						<TouchableOpacity style={style.backButton} onPress={onClose}>
							<Icon
								name="chevron-left"
								size={30}
								color={currentTheme.value.p.color.split(" ")[0]}
							/>
							<Text
								style={{
									color: currentTheme.value.p.color.split(" ")[0],
									fontSize: 18,
									fontWeight: "bold",
								}}
							>
								{title}
							</Text>
						</TouchableOpacity>
						<View>
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => setOpenMenu(true)}
							>
								<Icon
									name="columns-3-cog"
									size={20}
									color={currentTheme.value.p.color.split(" ")[0]}
								/>
							</TouchableOpacity>
						</View>
					</View>
				</DropShadow>
			</Animated.View>
			{openMenu && (
				<TouchableOpacity
					style={style.menuContainer}
					onPress={() => setOpenMenu(false)}
					activeOpacity={1}
				>
					<View
						style={[
							style.menu,
							{
								backgroundColor: currentTheme.value.body.background,
							},
						]}
					>
						<Text
							style={[
								style.titleMenu,
								{ color: currentTheme.value.p.color.split(" ")[0] },
							]}
						>
							Flujo
						</Text>
						<FlatList
							data={flowOptions}
							renderItem={({ item }) => (
								<TouchableOpacity
									style={[
										{
											alignItems: "center",
											flex: 1,
											gap: 5,
											padding: 10,
											borderRadius: 5,
										},
										{
											backgroundColor:
												flow === item.value ? colors.secondary : "transparent",
										},
									]}
									onPress={() => changeFlow(item.value)}
								>
									<Icon
										name={item.icon}
										size={30}
										color={
											flow === item.value
												? colors.primary
												: currentTheme.value.p.color.split(" ")[0]
										}
									/>
									<Text
										style={[
											{ textAlign: "center" },
											flow === item.value && {
												color: colors.primary,
											},
										]}
									>
										{item.label}
									</Text>
								</TouchableOpacity>
							)}
							key={2}
							style={{ width: 250 }}
							contentContainerStyle={{
								gap: 15,
							}}
							columnWrapperStyle={{
								justifyContent: "center",
								alignItems: "center",
								gap: 10,
							}}
							numColumns={2}
							keyExtractor={(item) => item.value}
						/>
						<Divider />
						<View
							style={{
								flex: 1,
								gap: 10,
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Icon name="sun-dim" size={20} color={colors.primary} />
							<Slider
								style={{ flex: 1 }}
								step={0.01}
								value={brightness}
								thumbTintColor={colors.primary}
								minimumTrackTintColor={colors.primary}
								maximumTrackTintColor={
									Platform.OS === "android" ? colors.success : colors.secondary
								}
								onValueChange={async (value) => {
									setBrightness(value);
									await DeviceBrightness.setBrightnessLevel(value);
								}}
								minimumValue={0}
								maximumValue={1}
							/>
							<Icon name="sun" size={20} color={colors.success} />
						</View>
					</View>
				</TouchableOpacity>
			)}
		</>
	);
};

const style = StyleSheet.create({
	root: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		zIndex: 10,
	},
	boxShadow: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	container: {
		paddingHorizontal: 20,
		height: 55,
		borderBottomColor: "#ddddddff",
		borderBottomWidth: 1,

		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	backButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	menuContainer: {
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: 20,
		backgroundColor: "#0000001c",
	},
	menu: {
		minWidth: 150,
		minHeight: 50,
		borderBottomColor: "#ddddddff",
		borderBottomWidth: 1,
		padding: 10,
		paddingHorizontal: 20,
		position: "absolute",
		top: 10,
		right: 10,
		zIndex: 21,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		borderRadius: 10,

		elevation: 5,
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
	},
	titleMenu: {
		fontSize: 18,
		fontWeight: "bold",
	},
});
