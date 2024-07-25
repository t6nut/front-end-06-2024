/* import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { CartSumContext } from '../store/CartSumContext';
import { AuthContext } from '../store/AuthContext';

// Mock dependencies
jest.mock('react-i18next');
jest.mock('react-redux');
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
}));

const mockedUseTranslation = useTranslation as jest.MockedFunction<any>;
const mockedUseContext = useContext as jest.MockedFunction<typeof useContext>;
const mockedUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockedUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;

mockedUseContext.mockImplementation((context) => {
	if (context === CartSumContext) {
		return { cartSum: 100 };
	}
	if (context === AuthContext) {
		return { loggedIn: true, setLoggedIn: jest.fn() };
	}
	return null;
});

describe('NavigationBar', () => {
	beforeEach(() => {
		mockedUseTranslation.mockReturnValue({
			t: (key: string) => key,
			i18n: { changeLanguage: jest.fn() },
		});

		

		mockedUseSelector.mockReturnValue(5);
		mockedUseNavigate.mockReturnValue(jest.fn());
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('renders navigation bar correctly', () => {
		render(
			<Router>
				<NavigationBar />
			</Router>
		);

		expect(screen.getByText('Webshop')).toBeInTheDocument();
		expect(screen.getByText('nav.admin')).toBeInTheDocument();
		expect(screen.getByText('nav.contact')).toBeInTheDocument();
		expect(screen.getByText('nav.shops')).toBeInTheDocument();
		expect(screen.getByText('nav.cart')).toBeInTheDocument();
		expect(screen.getByText('nav.logout')).toBeInTheDocument();
		expect(screen.getByText('5 /')).toBeInTheDocument();
		expect(screen.getByText('100.00 €')).toBeInTheDocument();
	});

	test('changes language when language icon is clicked', () => {
		render(
			<Router>
				<NavigationBar />
			</Router>
		);

		fireEvent.click(screen.getByAltText(''));
		expect(mockedUseTranslation().i18n.changeLanguage).toHaveBeenCalledWith('en');
		fireEvent.click(screen.getAllByAltText('')[1]);
		expect(mockedUseTranslation().i18n.changeLanguage).toHaveBeenCalledWith('ee');
	});

	test('calls logout function when logout link is clicked', () => {
		const setLoggedInMock = jest.fn();
		mockedUseContext.mockImplementation((context) => {
			if (context === AuthContext) {
				return { loggedIn: true, setLoggedIn: setLoggedInMock };
			}
			return null;
		});

		render(
			<Router>
				<NavigationBar />
			</Router>
		);

		fireEvent.click(screen.getByText('nav.logout'));
		expect(setLoggedInMock).toHaveBeenCalledWith(false);
		expect(mockedUseNavigate).toHaveBeenCalledWith('/');
	});

	test('renders login and signup links when not logged in', () => {
		mockedUseContext.mockImplementation((context) => {
			if (context === AuthContext) {
				return { loggedIn: false, setLoggedIn: jest.fn() };
			}
			return null;
		});

		render(
			<Router>
				<NavigationBar />
			</Router>
		);

		expect(screen.getByText('nav.login')).toBeInTheDocument();
		expect(screen.getByText('nav.signup')).toBeInTheDocument();
	});

	test('navigates to the correct URL when nav links are clicked', () => {
		const navigateMock = jest.fn();
		mockedUseNavigate.mockReturnValue(navigateMock);

		render(
			<Router>
				<NavigationBar />
			</Router>
		);

		fireEvent.click(screen.getByText('nav.admin'));
		expect(navigateMock).toHaveBeenCalledWith('/admin');

		fireEvent.click(screen.getByText('nav.contact'));
		expect(navigateMock).toHaveBeenCalledWith('/contact');

		fireEvent.click(screen.getByText('nav.shops'));
		expect(navigateMock).toHaveBeenCalledWith('/shops');

		fireEvent.click(screen.getByText('nav.cart'));
		expect(navigateMock).toHaveBeenCalledWith('/cart');

		fireEvent.click(screen.getByText('nav.login'));
		expect(navigateMock).toHaveBeenCalledWith('/login');

		fireEvent.click(screen.getByText('nav.signup'));
		expect(navigateMock).toHaveBeenCalledWith('/signup');
	});
}); */