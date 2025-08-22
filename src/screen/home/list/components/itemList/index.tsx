import Icon from "@react-native-vector-icons/lucide";
import type { FC } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ProgressBar, Text } from "@/components";
import { colors } from "@/theme";

interface IItemList {
	image: string;
	title: string;
	author: string;
	progress: number;
	qualification: number;
}
export const ItemList: FC<IItemList> = ({
	image,
	title,
	author,
	progress,
	qualification,
}) => {
	return (
		<View style={styles.root}>
			<Image
				source={{ uri: image }}
				style={styles.image}
				resizeMode="stretch"
				resizeMethod="scale"
			/>
			<View style={styles.containerInfo}>
				<View style={{ width: "50%" }}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.author}>{author}</Text>
				</View>
				<View style={{ width: "40%" }}>
					<View style={{ gap: 5 }}>
						<View style={styles.progressContainer}>
							<Text style={styles.progressText}>Progreso</Text>
							<Text>{Math.round(progress)}%</Text>
						</View>
						<ProgressBar progress={progress} />
					</View>
					<View style={styles.ratingContainer}>
						{Array.from({ length: 5 }, (_, index) => (
							<Icon
								key={`star-${qualification}-position-${index + 1}`}
								name="star"
								size={15}
								color={index < qualification ? colors.primary : "gray"}
							/>
						))}
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		backgroundColor: "#f5f5f5",
		borderRadius: 12,
		position: "relative",
		width: "100%",
		overflow: "hidden",
		flexDirection: "row",
	},
	containerInfo: {
		flex: 1,
		padding: 10,
		gap: 10,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	image: {
		aspectRatio: 9 / 16,
		maxWidth: "100%",
		overflow: "hidden",
	},
	title: {
		fontWeight: "bold",
		fontSize: 18,
		flexWrap: "wrap",
	},
	author: {
		color: "#666",
	},
	progressContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	progressText: {
		fontWeight: "bold",
	},
	ratingContainer: {
		flexDirection: "row",
		gap: 10,
		marginTop: 10,
	},
});
