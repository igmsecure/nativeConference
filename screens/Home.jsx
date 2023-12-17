import axios from 'axios';
import React from 'react';
import {
  Alert,
  Text,
  TextInput,
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { AuthorCard } from '../components/AuthorCard';

export const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState();
  const [value, onChangeText] = React.useState('');
  const [filteredItems, setFilteredItems] = React.useState([]);


  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get('http://127.0.0.1:8000/api/authors')
      .then(({ data }) => {
        setItems(data.authors);
        filterItems(data.authors, value); // Фильтруем данные при обновлении
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Не удалось получить статьи');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Функция для фильтрации данных
  const filterItems = (data, searchTerm) => {
    const filteredData = data.filter(item => item.middle_name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredItems(filteredData);
  };

  React.useEffect(fetchPosts, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 15 }}>Загрузка...</Text>
      </View>
    );
  }

  return (
    <View>
      <TextInput
        placeholder='Введите автора:'
        editable
        multiline
        numberOfLines={4}
        maxLength={40}
        onChangeText={text => {
          onChangeText(text);
          filterItems(items, text); // Фильтруем данные при изменении текста
        }}
        value={value}
        style={{
          padding: 10,
          margin: 10,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 7,
          textAlign: 'left'
        }}
      />
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
        data={filteredItems.length > 0 ? filteredItems : items}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('AuthorDetails', { id: item.id, firstName: item.first_name })}>

            <AuthorCard
              id={item.id}
              middleName={item.middle_name}
              firstName={item.first_name}
              lastName={item.last_name}
              imageUrl={item.image}
              dateBirth={item.date_of_birth}
              country={item.country}
            />

          </TouchableOpacity>
        )}
      />
    </View>
  );
};
