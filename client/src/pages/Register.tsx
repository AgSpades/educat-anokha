import React from 'react';
import AuthLayout from '../auth-components/AuthLayout';
import RegisterForm from '../auth-components/RegisterForm';

const Register: React.FC = () => {
    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>
    );
};

export default Register;
