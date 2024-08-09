import React, { useState, useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, Text, View, StyleSheet, Image, Button } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function HomeScreen () {
	const [{ x, y, z }, setData] = useState({
		x: 0,
		y: 0,
		z: 0,
	});
	const [subscription, setSubscription] = useState<any>(null);
	const [left, setLeft] = useState(0);

	const _slow = () => Accelerometer.setUpdateInterval(1000);
	const _fast = () => Accelerometer.setUpdateInterval(16);

	const _subscribe = () => {
		setSubscription(Accelerometer.addListener(setData));
	};

	const _unsubscribe = () => {
		subscription && subscription.remove();
		setSubscription(null);
	};

	useEffect(() => {
		Accelerometer.addListener(item => {
			setLeft(item.x * - 100 + 150)
		})
		_subscribe();
		return () => _unsubscribe();
	}, []);

	const animatedValue = useRef(new Animated.Value(0)).current;
	const [isTop, setIsTop] = useState(true);

	const startAnimation = (toValue: number) => {
		Animated.timing(animatedValue, {
			toValue,
			duration: 1000,
			easing: Easing.linear,
			useNativeDriver: true
		}).start(() => {
			setIsTop(!isTop);
		})
	}

	useEffect(() => {
		startAnimation(isTop ? 1 : 0);
	}, [isTop]);

	const translateY = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [0, Dimensions.get('window').height - 400],
		extrapolate: 'clamp'
	})

	return (
		<View style={styles.container}>
				<Animated.View style={[styles.square, { transform: [{ translateY }] }]}>
					<Image source={require("../../assets/coin.png")} style={styles.square} />
				</Animated.View>
				{/* <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
					<Text style={styles.text}>x: {x}</Text>
					<Text style={styles.text}>y: {y}</Text>
					<Text style={styles.text}>z: {z}</Text> */}

				<Image source={require("../../assets/road.gif")} style={{ width: "100%", height: "33%" }} />
				<Image source={require("../../assets/car.png")} style={{ width: 70, height: 50, flex: 1, position: "absolute", top: 400, left: left }} />
			{/* </View> */}
		</View>
	);
}

const styles = StyleSheet.create({
	square: {
		width: 20,
		height: 20,
		left: "50%",
		zIndex: 2
	},
	image: {
		width: 20,
		height: 20,
		flex: 1,
		position: "absolute",
		top: 300,
		left: "50%",
	},
	container: {
		flex: 1,
		position: "relative",
		justifyContent: 'center',
		paddingHorizontal: 20,
	},
	text: {
		color: "white",
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		alignItems: 'stretch',
		marginTop: 15,
	},
	button: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#eee',
		padding: 10,
	},
	middleButton: {
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderColor: '#ccc',
	},
});
