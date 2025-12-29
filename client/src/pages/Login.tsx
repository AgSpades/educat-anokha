import SplitAuthLayout from '../auth-components/SplitAuthLayout';
import LoginForm from '../auth-components/LoginForm';

const Login: React.FC = () => {
    return (
        <SplitAuthLayout>
            <LoginForm />
        </SplitAuthLayout>
    );
};

export default Login;
