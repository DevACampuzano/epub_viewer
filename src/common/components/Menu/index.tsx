import Icon from "@react-native-vector-icons/lucide";
import {
	type ComponentProps,
	createContext,
	type FC,
	type PropsWithChildren,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import {
	type GestureResponderEvent,
	ScrollView,
	type TextProps,
	TouchableOpacity,
	type TouchableOpacityProps,
	View,
	type ViewProps,
} from "react-native";
import { Text } from "../Text";
import styles from "./styles";

type _MenuPosition = {
	x: {
		left?: number;
		right?: number;
	};
	y: number;
};

const MenuContext = createContext<{
	closeMenu: () => void;
} | null>(null);

type _MenuProps = {
	buttonProps?: Omit<TouchableOpacityProps, "style">;
	icon: ReactNode;
	style?: ViewProps["style"];
	menuProps?: ViewProps;
};

type _MenuItemProps = Omit<TouchableOpacityProps, "onPress"> & {
	textProps?: TextProps;
	hasSubmenu?: boolean;
	subMenuIconProps?: Partial<ComponentProps<typeof Icon>>;
	submenuItems?: ReactNode;
	onPress?: (() => void) | ((event: GestureResponderEvent) => void);
};

type _MenuComponent = FC<_MenuProps & PropsWithChildren> & {
	Item: FC<_MenuItemProps>;
};

const Menu: _MenuComponent = ({
	buttonProps,
	style,
	children,
	icon,
	menuProps,
}) => {
	const [open, setOpen] = useState(false);
	const [menuPosition, setMenuPosition] = useState<_MenuPosition>({
		x: {},
		y: 0,
	});
	const containerRef = useRef<View>(null);
	const menuRef = useRef<View>(null);

	const calculatePosition = useCallback(() => {
		if (menuRef.current && containerRef.current) {
			menuRef.current?.measure(
				(
					_menuX: number,
					_menuY: number,
					menuWidth: number,
					menuHeight: number,
				) => {
					containerRef.current?.measure(
						(
							containerX: number,
							_containerY: number,
							containerWidth: number,
							_height: number,
						) => {
							const cal = containerX - menuWidth;
							const newX =
								cal < 0
									? {
											left: containerWidth / 2,
											right: undefined,
										}
									: { left: undefined, right: containerWidth / 2 };
							setMenuPosition({
								x: newX,
								y: menuHeight * -1,
							});
						},
					);
				},
			);
		}
	}, []);

	useEffect(() => {
		if (open) {
			calculatePosition();
		}
	}, [open, calculatePosition]);

	const handleMenuLayout = useCallback(() => {
		if (open) {
			setTimeout(calculatePosition, 10);
		}
	}, [open, calculatePosition]);

	const closeMenu = useCallback(() => {
		setOpen(false);
	}, []);

	return (
		<MenuContext.Provider value={{ closeMenu }}>
			<TouchableOpacity
				onPress={open ? () => setOpen(false) : undefined}
				style={styles.btnWithoutFeedback}
				activeOpacity={1}
			/>
			<View
				style={[
					{
						position: "relative",
					},
					style,
				]}
				ref={containerRef}
			>
				<TouchableOpacity
					activeOpacity={0.7}
					{...buttonProps}
					onPress={() => setOpen((s) => !s)}
				>
					{icon}
				</TouchableOpacity>

				{open && (
					<View
						{...menuProps}
						ref={menuRef}
						onLayout={handleMenuLayout}
						style={[
							styles.menu,
							menuProps?.style,
							{
								...menuPosition.x,
								bottom: menuPosition.y,
							},
						]}
					>
						<ScrollView
							showsVerticalScrollIndicator={false}
							style={{ flex: 1 }}
						>
							{children}
						</ScrollView>
					</View>
				)}
			</View>
		</MenuContext.Provider>
	);
};

Menu.Item = ({
	children,
	textProps,
	hasSubmenu = false,
	submenuItems,
	subMenuIconProps,
	...props
}) => {
	const [submenuOpen, setSubmenuOpen] = useState(false);
	const submenuRef = useRef<View>(null);
	const menuContext = useContext(MenuContext);

	const handlePress = (event: GestureResponderEvent) => {
		if (hasSubmenu) {
			setSubmenuOpen(!submenuOpen);
		} else if (props.onPress) {
			props.onPress(event);
			menuContext?.closeMenu();
		}
	};

	return (
		<View style={{ position: "relative" }}>
			<TouchableOpacity
				activeOpacity={0.7}
				disabled={!hasSubmenu && props.onPress === undefined}
				{...props}
				style={[
					styles.optionSubMenu,
					hasSubmenu && submenuOpen && { backgroundColor: "#ffffff43" },
					props?.style,
				]}
				onPress={handlePress}
			>
				{typeof children === "string" ? (
					<Text {...textProps}>{children} </Text>
				) : (
					children
				)}
				{hasSubmenu && (
					<Icon
						name={submenuOpen ? "chevron-up" : "chevron-down"}
						size={16}
						color="#666"
						{...subMenuIconProps}
					/>
				)}
			</TouchableOpacity>

			{hasSubmenu && submenuOpen && submenuItems && (
				<View ref={submenuRef} style={styles.subMenuContainer}>
					{submenuItems}
				</View>
			)}
		</View>
	);
};

export { Menu };
