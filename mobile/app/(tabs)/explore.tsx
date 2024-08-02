import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';

export default function TabTwoScreen() {
	const [prices, setPrices] = useState<{'timestamp': number, "price": number}[]>([])

	useFocusEffect(
		useCallback(() => {
			fetchPrices();
		}, [])
	);

	async function fetchPrices() {
		//fetch('https://dashboard.elering.ee/api/nps/price')
			//.then(response => response.json)
			//.then(json)
		const response = await fetch('https://react-webshop-e5eea-default-rtdb.europe-west1.firebasedatabase.app/elering.json');
		const json = await response.json();
		setPrices(json.data.ee);
	}

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>

			<FlatList
				data={prices}
				renderItem={price => <Item price={price.item.price} timestamp={price.item.timestamp}/>}
			/>

    </ParallaxScrollView>
  );
}

function getDateAndTime(timestamp: number) {
	const date = new Date(timestamp * 1000);
	const day = date.getDate()
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	const hour = date.getHours();
	const minutes = date.getMinutes();

	return day + "." + month + "." + year + " " + hour + ":00";
}

const Item = (timestamp_price: {"timestamp": number, "price": number}) => (
	<View style={styles.price}>
		<Text style={styles.price}>
			{timestamp_price.price}€ - {getDateAndTime(timestamp_price.timestamp)}
		</Text>
	</View>
);

const styles = StyleSheet.create({
	price: {
		backgroundColor: '#f9c2ff',
		fontWeight: "bold",
		color: "red",
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
