import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

export const ContactUs = () => {
	const form = useRef();

	const sendEmail = (e: any) => {
		e.preventDefault();

		emailjs
			.sendForm('service_4kqtz04', 'template_blapspn', form.current, {
				publicKey: '92wTREyCsK8B3_N8K',
			})
			.then(
				() => {
					console.log('SUCCESS!');
					toast.success('Thank you, your message has been sent!');
				},
				(error) => {
					console.log('FAILED...', error.text);
				},
			);
	};

	return (
		<div>
			<h1>Contact us</h1>
			<form ref={form} onSubmit={sendEmail}>
				<label>Name</label><br />
				<input type="text" name="user_name" /><br />
				<label>Email</label><br />
				<input type="email" name="user_email" /><br />
				<label>Message</label><br />
				<textarea name="message" /><br />
				<input type="submit" value="Send" /><br />
			</form>
		</div>
		
	);
};