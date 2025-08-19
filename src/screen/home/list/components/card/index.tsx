import Icon from "@react-native-vector-icons/lucide";
import type { FC } from "react";
import { ImageBackground, Text, View } from "react-native";
import { ProgressBar } from "@/components";
import { colors } from "@/theme";
import style from "./styles";

interface ICardBook {
	image: string;
	title: string;
	author: string;
	progress: number;
	qualification: number;
}

const Card: FC<ICardBook> = ({
	title,
	author,
	progress,
	qualification,
	image,
}) => {
	return (
		<View style={style.card}>
			<ImageBackground
				src={image}
				style={style.imageBackground}
				resizeMode="stretch"
				resizeMethod="scale"
			>
				<View style={style.progressContainer}>
					<Text style={style.progressText}>Progreso</Text>
					<Text style={style.progressPercentage}>{progress}%</Text>
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

export default Card;
