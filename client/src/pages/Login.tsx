import React from 'react';
import AuthLayout from '../auth-components/AuthLayout';
import LoginForm from '../auth-components/LoginForm';

const Login: React.FC = () => {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
};

export default Login;
