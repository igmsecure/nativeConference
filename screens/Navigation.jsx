import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthorDetailsScreen } from './AuthorDetails';
import { HomeScreen } from './Home';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Авторы статей' }} />
        <Stack.Screen name="AuthorDetails" component={AuthorDetailsScreen} options={{ title: 'Подробнее об авторе' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
