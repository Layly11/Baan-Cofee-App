import {createStackNavigator} from '@react-navigation/stack';
import NavConfigs from './NavConfigs';
import NavRoutes from './NavRoutes';
import OnBoard from '../screen/Auth/OnBoard';
import Login from '../screen/Auth/Login';
import Register from '../screen/Auth/Register';

const Stack = createStackNavigator()

const AuthRoute = () => {
    return (
        <Stack.Navigator screenOptions={NavConfigs.screenOptions}>
             <Stack.Screen name={NavRoutes.ONBOARD} component={OnBoard} />
              <Stack.Screen name={NavRoutes.LOGIN} component={Login} />
              <Stack.Screen name={NavRoutes.REGISTER} component={Register} />
        </Stack.Navigator>
    )
}

export default AuthRoute;
