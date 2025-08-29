import Icon from "@react-native-vector-icons/lucide";
import type { FC } from "react";
import { ImageBackground, View } from "react-native";
import { ProgressBar, Text } from "@/common/components";
import { colors } from "@/common/theme";
import style from "./styles";

type ICardBook = {
	image: string;
	title: string;
	author: string;
	progress: number;
	qualification: number;
};

export const Card: FC<ICardBook> = ({
	title,
	author,
	progress,
	qualification,
	image,
}) => {
	return (
		<View style={style.card}>
			<ImageBackground
				src={`file://${image}`}
				style={style.imageBackground}
				resizeMode="stretch"
				resizeMethod="scale"
			>
				<View style={style.progressContainer}>
					<Text style={style.progressText}>Progreso</Text>
					<Text style={style.progressPercentage}>{Math.round(progress)}%</Text>
				</View>
				<ProgressBar progress={progress} />
			</ImageBackground>
			<View style={style.cardContent}>
				<View style={{ gap: 5 }}>
					<Text style={style.cardTitle}>{title}</Text>
					<Text style={style.cardAuthor}>{author}</Text>
				</View>
				<View style={style.ratingContainer}>
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
	);
};
