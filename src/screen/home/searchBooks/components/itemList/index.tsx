import Icon from "@react-native-vector-icons/lucide";
import type { FC } from "react";
import { Image, View } from "react-native";
import { ProgressBar, Text } from "@/common/components";
import { colors } from "@/common/theme";
import styles from "./styles";

type IItemList = {
	image: string;
	title: string;
	author: string;
	progress: number;
	qualification: number;
};

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
				source={{ uri: `file://${image}` }}
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
