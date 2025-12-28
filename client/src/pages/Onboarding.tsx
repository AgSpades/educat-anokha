import React from 'react';
import { useTheme } from '../hooks/useTheme';
import AuthLayout from '../auth-components/AuthLayout';
import OnboardingForm from '../onboarding-components/OnboardingForm';

const Onboarding: React.FC = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <AuthLayout darkMode={darkMode} toggleTheme={toggleTheme} maxWidth="max-w-2xl">
            <OnboardingForm darkMode={darkMode} />
        </AuthLayout>
    );
};

export default Onboarding;
