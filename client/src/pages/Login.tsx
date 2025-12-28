import React from 'react';
import { useTheme } from '../hooks/useTheme';
import AuthLayout from '../auth-components/AuthLayout';
import LoginForm from '../auth-components/LoginForm';

const Login: React.FC = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <AuthLayout darkMode={darkMode} toggleTheme={toggleTheme}>
            <LoginForm darkMode={darkMode} />
        </AuthLayout>
    );
};

export default Login;
