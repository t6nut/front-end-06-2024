import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { Accelerometer } from 'expo-sensors';

import {
	useResponsiveHeight,
	useResponsiveWidth
} from "react-native-responsive-dimensions";

export default function HomeScreen() {

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

	/* componentDidMount() {
		Accelerometer.addListener(item => {
			this.setState(
				{ movement: item.x * -100 })
		})
	} */

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
			<Text style={styles.text}>x: {x}</Text>
			<Text style={styles.text}>y: {y}</Text>
			<Text style={styles.text}>z: {z}</Text>
			{/* <View style={styles.buttonContainer}>
				<TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
					<Text>{subscription ? 'On' : 'Off'}</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
					<Text>Slow</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={_fast} style={styles.button}>
					<Text>Fast</Text>
				</TouchableOpacity> */}

				<Image source={require("../../assets/road.gif")} style={{ width: "100%", height: "33%" }}/>
				<Image source={require("../../assets/car.png")} style={{ width: 70, height: 50, flex: 1, position: "absolute", top: 400, left: left }}/>
				<Image source={require("../../assets/coin.png")} style={{ width: 20, height: 20, flex: 1, position: "absolute", top: 300, left: "50%" }}/>
			{/* </View> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
