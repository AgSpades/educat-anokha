import SplitAuthLayout from '../auth-components/SplitAuthLayout';
import RegisterForm from '../auth-components/RegisterForm';

const Register: React.FC = () => {
    return (
        <SplitAuthLayout variant="register">
            <RegisterForm />
        </SplitAuthLayout>
    );
};

export default Register;
