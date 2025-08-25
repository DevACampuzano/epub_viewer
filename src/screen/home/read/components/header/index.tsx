import DeviceBrightness from "@adrianso/react-native-device-brightness";
import Slider from "@react-native-community/slider";
import Icon from "@react-native-vector-icons/lucide";
import type { FC } from "react";
import {
	Animated,
	FlatList,
	Platform,
	Pressable,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";
import DropShadow from "react-native-drop-shadow";
import { Divider, Menu, Text, TextInput } from "@/components";
import { colors } from "@/theme";
import style from "./styles";
import useHeader from "./useHeader";

export const Header: FC<_IHeaderProps> = ({
	currentTheme,
	title,
	onClose,
	opacity,
	toc,
}) => {
	const {
		openMenu,
		setOpenMenu,
		brightness,
		setBrightness,
		flow,
		changeFlow,
		drawerOption,
		drawerOptions,
		flowOptions,
		isOpenDrawer,
		setDrawerOption,
		setIsOpenDrawer,
		goToLocation,
		positionDrawerOut,
		position,
		search,
		handleChangeSearchText,
		searchResults,
	} = useHeader();
	const color = currentTheme.value.p.color.split(" ")[0];

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
						<TouchableOpacity
							style={style.backButton}
							onPress={onClose}
							activeOpacity={0.7}
						>
							<Icon name="chevron-left" size={30} color={color} />
							<Text
								style={{
									color: color,
									fontSize: 18,
									fontWeight: "bold",
								}}
							>
								{title}
							</Text>
						</TouchableOpacity>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								gap: 15,
							}}
						>
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => setOpenMenu(true)}
							>
								<Icon name="columns-3-cog" size={20} color={colors.primary} />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => setIsOpenDrawer(true)}
								activeOpacity={0.7}
							>
								<Icon name={"menu"} size={20} color={colors.primary} />
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
						<Text style={[style.titleMenu, { color: color }]}>Flujo</Text>
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
										color={flow === item.value ? colors.primary : color}
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
			{isOpenDrawer && (
				<View style={[style.drawer]}>
					<Animated.View
						style={[
							style.drawerContainer,
							{ backgroundColor: currentTheme.value.body.background },
							{
								transform: [{ translateX: position }],
							},
						]}
					>
						<View style={style.drawerHeader}>
							<Text
								style={{
									fontSize: 25,
									fontWeight: "bold",
									color: color,
								}}
							>
								Navegador
							</Text>
							<TouchableOpacity
								onPress={() => positionDrawerOut()}
								activeOpacity={0.7}
							>
								<Icon name="x" size={25} color={color} />
							</TouchableOpacity>
						</View>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							style={{ marginVertical: 10, maxHeight: 70 }}
							contentContainerStyle={{
								gap: 15,
								// height: 70,

								alignItems: "center",
							}}
						>
							{drawerOptions.map((option) => (
								<TouchableOpacity
									style={[
										style.drawerOptionView,
										option.value === drawerOption.value && {
											backgroundColor: colors.secondary,
										},
									]}
									key={option.value}
									onPress={() => setDrawerOption(option)}
									activeOpacity={0.7}
								>
									<Icon
										name={option.icon}
										size={20}
										color={
											option.value === drawerOption.value
												? colors.primary
												: color
										}
									/>
									<Text
										style={{
											color:
												option.value === drawerOption.value
													? colors.primary
													: color,
										}}
									>
										{option.label}
									</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
						<Divider />
						<View style={{ paddingVertical: 10, flex: 1 }}>
							<Text
								style={[style.drawerOptionTitle, { color, marginBottom: 5 }]}
							>
								{drawerOption.title}
							</Text>
							{drawerOption.value === "chapters" && (
								<FlatList
									data={toc}
									style={{ paddingVertical: 10, height: "80%" }}
									contentContainerStyle={{
										gap: 10,
									}}
									renderItem={({ item }) => (
										<Menu.Item
											style={{
												width: "100%",
												paddingVertical: 10,
												paddingHorizontal: 10,
												borderRadius: 5,
											}}
											textProps={{
												style: { color },
											}}
											subMenuIconProps={{
												color,
											}}
											hasSubmenu={item.subitems.length > 0}
											onPress={
												item.subitems.length > 0
													? undefined
													: () => goToLocation(item.href)
											}
											submenuItems={item.subitems.map((subItem) => (
												<TouchableOpacity
													key={subItem.id}
													onPress={() => goToLocation(subItem.href)}
												>
													<Text style={{ color }}>{subItem.label}</Text>
												</TouchableOpacity>
											))}
										>
											{item.label.trim()}
										</Menu.Item>
									)}
									showsVerticalScrollIndicator={false}
									keyExtractor={(item) => item.id}
									ListEmptyComponent={() => (
										<Text style={{ color, textAlign: "center" }}>
											No se encontraron datos del contenido
										</Text>
									)}
								/>
							)}
							{drawerOption.value === "search" && (
								<View>
									<TextInput
										value={search}
										onChangeText={handleChangeSearchText}
										placeholder="Buscar..."
										placeholderTextColor={colors.secondary}
										style={{
											color,
										}}
									/>
									<FlatList
										data={searchResults}
										style={{ paddingVertical: 20 }}
										contentContainerStyle={{
											gap: 20,
										}}
										renderItem={({ item }) => (
											<TouchableOpacity
												activeOpacity={0.7}
												onPress={() => goToLocation(item.cfi)}
											>
												<Text style={{ color }}>
													{item.section.label ? item.section.label.trim() : ""}
												</Text>
												<Text style={{ color, fontSize: 12, paddingLeft: 15 }}>
													{item.excerpt ? item.excerpt.trim() : ""}
												</Text>
											</TouchableOpacity>
										)}
										keyExtractor={(item) => item.cfi}
										showsVerticalScrollIndicator={false}
										ListEmptyComponent={() => (
											<Text style={{ color, textAlign: "center" }}>
												No se encontraron resultados
											</Text>
										)}
									/>
								</View>
							)}
						</View>
					</Animated.View>
					<Pressable style={{ flex: 1 }} onPress={() => positionDrawerOut()} />
				</View>
			)}
		</>
	);
};
