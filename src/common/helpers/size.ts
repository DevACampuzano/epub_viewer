import { PixelRatio } from "react-native";

// De dp a px
export const dpToPx = (dp: number) => {
	return PixelRatio.getPixelSizeForLayoutSize(dp);
};

// De px a dp
export const pxToDp = (px: number) => {
	return PixelRatio.roundToNearestPixel(px / PixelRatio.get());
};
