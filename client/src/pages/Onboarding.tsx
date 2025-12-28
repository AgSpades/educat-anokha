import React from 'react';
import AuthLayout from '../auth-components/AuthLayout';
import OnboardingForm from '../onboarding-components/OnboardingForm';

const Onboarding: React.FC = () => {
    return (
        <AuthLayout maxWidth="max-w-2xl">
            <OnboardingForm />
        </AuthLayout>
    );
};

export default Onboarding;
