import React from 'react';
import { useTheme } from '../hooks/useTheme';
import AuthLayout from '../auth-components/AuthLayout';
import RegisterForm from '../auth-components/RegisterForm';

const Register: React.FC = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <AuthLayout darkMode={darkMode} toggleTheme={toggleTheme}>
            <RegisterForm darkMode={darkMode} />
        </AuthLayout>
    );
};

export default Register;
