import { Lucide } from "@react-native-vector-icons/lucide";
import { Octicons } from "@react-native-vector-icons/octicons";
import { type FC, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, {
	Extrapolate,
	interpolate,
	type SharedValue,
	useAnimatedStyle,
	withSpring,
} from "react-native-reanimated";
import { ProgressBar, Text } from "@/common/components";
import { colors } from "@/common/theme";

type HighlightsProps = {
	progress: number;
	title: string;
	image: string;
	last: number;
	notes: number;
	currentPage: number;
	totalPage: number;
	bookmark: number;
	index: number;
	scrollX: SharedValue<number>;
};

export const Highlights: FC<HighlightsProps> = ({
	progress,
	title,
	image,
	last,
	notes,
	currentPage,
	totalPage,
	bookmark,
	index,
	scrollX,
}) => {
	const [width, setWidth] = useState(0);
	const lastDate = new Date(last);

	const animatedStyle = useAnimatedStyle(() => {
		// Calcular la posición del elemento en relación al centro
		const inputRange = [
			(index - 1) * width,
			index * width,
			(index + 1) * width,
		];

		// Escala: aumenta cuando está en el centro
		const scale = interpolate(
			scrollX.value,
			inputRange,
			[0.8, 1, 0.8],
			Extrapolate.CLAMP,
		);

		// Opacidad: más opaco cuando está en el centro
		const opacity = interpolate(
			scrollX.value,
			inputRange,
			[0.6, 1, 0.6],
			Extrapolate.CLAMP,
		);

		// Efecto de elevación cuando está en el centro
		const elevation = interpolate(
			scrollX.value,
			inputRange,
			[5, 15, 5],
			Extrapolate.CLAMP,
		);

		return {
			transform: [{ scale: withSpring(scale) }],
			opacity: withSpring(opacity),
			elevation: withSpring(elevation),
			zIndex: scale > 0.9 ? 10 : 1,
		};
	});

	return (
		<Animated.View
			style={[style.root, animatedStyle]}
			onLayout={({ nativeEvent }) => {
				const { width } = nativeEvent.layout;
				setWidth(width);
			}}
		>
			<ProgressBar
				progress={progress}
				style={style.progressBar}
				progressProps={{
					style: style.progress,
				}}
			/>
			<Octicons
				name="bookmark-filled"
				size={35}
				color={colors.primary}
				style={{
					position: "absolute",
					zIndex: 10,
					top: -10,
					left: (width * (progress > 92 ? 92 : progress)) / 100 - 17.5,
				}}
			/>
			<View style={style.container}>
				<Text numberOfLines={1} style={{ fontWeight: "bold" }}>
					{title}
				</Text>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						gap: 10,
					}}
				>
					<Image
						src={`file://${image}`}
						height={180}
						width={120}
						style={{
							borderRadius: 10,
						}}
					/>
					<View style={{ gap: 10 }}>
						<View style={style.details}>
							<Lucide name="book-open" size={12} color="gray" />
							<Text style={style.detailText}>
								Pág. {currentPage + 1}/{totalPage}
							</Text>
						</View>
						<View style={style.details}>
							<Lucide name="clock" size={12} color="gray" />
							<Text style={style.detailText}>
								Ultima Lectura {lastDate.toLocaleDateString()}
							</Text>
						</View>
						<View style={style.details}>
							<Lucide name="bookmark" size={12} color="gray" />
							<Text style={style.detailText}>Bookmarker: {bookmark}</Text>
						</View>
						<View style={style.details}>
							<Lucide name="sticky-note" size={12} color="gray" />
							<Text style={style.detailText}>Notas: {notes}</Text>
						</View>
						<View style={style.details}>
							<Lucide name="circle-fading-arrow-up" size={12} color="gray" />
							<Text style={style.detailText}>
								Progreso: {progress.toFixed(2)}%
							</Text>
						</View>
					</View>
				</View>
			</View>
		</Animated.View>
	);
};

const style = StyleSheet.create({
	root: {
		backgroundColor: "white",
		borderRadius: 16,
		borderEndEndRadius: 40,
		maxWidth: 320,
		minHeight: 200,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,

		elevation: 4,
		// transform: [{ scale: 1 }],
	},
	progressBar: {
		flex: 1,
		borderRadius: 16,
		borderEndEndRadius: 0,
		borderEndStartRadius: 0,
		overflow: "hidden",
	},
	progress: {
		backgroundColor: colors.primary,
		borderEndStartRadius: 0,
		borderRadius: 0,
	},
	container: { flex: 15, padding: 10, gap: 10 },
	details: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		gap: 5,
	},
	detailText: {
		color: "gray",
		fontSize: 12,
	},
});
