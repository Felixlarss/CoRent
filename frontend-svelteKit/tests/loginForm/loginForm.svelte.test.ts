import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/svelte';
import LoginForm from '$lib/LoginForm.svelte';
import * as memberApi from '$lib/services/memberApi';

vi.mock('$lib/services/memberApi', () => ({
	confirmLogin: vi.fn(),
	addMember: vi.fn(),
	getMemberData: vi.fn()
}));

describe('LoginForm', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
	});

	test('renders login form by default', () => {
		render(LoginForm, { signUpForm: false });

		expect(screen.getByRole('heading', { name: 'Log in' })).toBeTruthy();
		expect(screen.getByPlaceholderText('name')).toBeTruthy();
		expect(screen.getByPlaceholderText('Password')).toBeTruthy();
		expect(screen.queryByPlaceholderText('Repeat password')).toBeNull();
	});

	test('renders signup form when signUpForm is true', () => {
		render(LoginForm, { signUpForm: true });

		expect(screen.getByRole('heading', { name: 'Sign up' })).toBeTruthy();
		expect(screen.getByPlaceholderText('Repeat password')).toBeTruthy();
	});

	test('toggles between login and signup', async () => {
		render(LoginForm, { signUpForm: false });

		const toggleLink = screen.getByText('Sign up');
		await fireEvent.click(toggleLink);

		expect(screen.getByPlaceholderText('Repeat password')).toBeTruthy();
	});

	test('submits login form with correct values', async () => {
		vi.mocked(memberApi.confirmLogin).mockResolvedValue({ ok: true });
		vi.mocked(memberApi.getMemberData).mockResolvedValue({ ok: true });

		render(LoginForm);

		const nameInput = screen.getByPlaceholderText('name');
		const passwordInput = screen.getByPlaceholderText('Password');
		const submitButton = screen.getByRole('button', { name: 'Log in' });

		await fireEvent.input(nameInput, { target: { value: 'testuser' } });
		await fireEvent.input(passwordInput, { target: { value: 'testpass' } });
		await fireEvent.click(submitButton);

		expect(memberApi.confirmLogin).toHaveBeenCalledWith('testuser', 'testpass');
		expect(memberApi.getMemberData).toHaveBeenCalled();
	});

	test('displays error message on failed login', async () => {
		vi.mocked(memberApi.confirmLogin).mockResolvedValue({
			ok: false,
			error: 'Invalid credentials'
		});

		render(LoginForm);

		const nameInput = screen.getByPlaceholderText('name');
		const passwordInput = screen.getByPlaceholderText('Password');
		const submitButton = screen.getByRole('button', { name: 'Log in' });

		await fireEvent.input(nameInput, { target: { value: 'testuser' } });
		await fireEvent.input(passwordInput, { target: { value: 'wrongpass' } });
		await fireEvent.click(submitButton);

		expect(screen.getByText('Invalid credentials')).toBeTruthy();
	});

	test('calls addMember on signup', async () => {
		vi.mocked(memberApi.addMember).mockResolvedValue({ ok: true });

		render(LoginForm, { signUpForm: true });

		const nameInput = screen.getByPlaceholderText('name');
		const passwordInput = screen.getByPlaceholderText('Password');
		const confirmPasswordInput = screen.getByPlaceholderText('Repeat password');
		const submitButton = screen.getByRole('button', { name: 'Sign up' });

		await fireEvent.input(nameInput, { target: { value: 'newuser' } });
		await fireEvent.input(passwordInput, { target: { value: 'newpass' } });
		await fireEvent.input(confirmPasswordInput, { target: { value: 'newpass' } });
		await fireEvent.click(submitButton);

		expect(memberApi.addMember).toHaveBeenCalledWith('newuser', 'newpass', 'newpass');
	});
});
