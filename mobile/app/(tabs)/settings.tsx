import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Button } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput } from 'react-native-gesture-handler';
import { useRef, useState } from 'react';

interface Profile {
	email: string;
	firstName: string;
	lastName: string;
}


export default function TabTwoScreen() {
	/* const emailRef = useRef<TextInput>(null); */
	const [profile, setProfile] = useState({email: "", firstName: "", lastName: ""});

	const changeProfile = (event: any) => {
		console.log(event.target.id);
		
		if (event.target === null) {
			return;
		}
		//profile[email] = "test@email.ee"
		/* const updatedProfile = profile[event.target.id]; */
		profile[event.target.id as keyof Profile] = event.target.value;
		setProfile({...profile});
	}

	const save = () => {
			localStorage.setItem("profile", JSON.stringify(profile));
	}

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
			headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">Settings</ThemedText>
			</ThemedView>
			<ThemedText>This page lets you change settings.</ThemedText>
			
			<TextInput
				id="email"
				onChange={changeProfile}
				style={styles.input}
				value={profile.email}
				placeholder="email"
			/>
			<TextInput
				id="firstName"
				onChange={changeProfile}
				style={styles.input}
				value={profile.firstName}
				placeholder="First Name"
			/>
			<TextInput
				id="lastName"
				onChange={changeProfile}
				style={styles.input}
				value={profile.lastName}
				placeholder="Last Name"
			/>

			<Button
				onPress={save}
				title="Save"
				color="#841584"
				accessibilityLabel="Learn more about this purple button"
			/>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
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