import React from 'react';
import axios from 'axios';
import { View, Text, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Loading } from '../components/Loading';

const AuthorFullName = styled.Text`
  text-align:center;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const AuthorImage = styled.Image`
  border-radius: 10px;
  margin-bottom: 10px;
`;

const AuthorBiography = styled.Text`
  margin-top: 10px;
  font-size: 14px;
`;

const AuthorDetails = styled.View`
  justify-content: column;
`;

const AuthorText = styled.Text`
  font-size: 14px;
  line-height: 24px;
`;

export const AuthorDetailsScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const { id, title } = route.params;

  React.useEffect(() => {
    navigation.setOptions({
      title,
    });
    axios
      .get('http://127.0.0.1:8000/api/authors/' + id)
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Не удалось получить автора');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={{
      borderWidth: 1, // толщина рамки
      borderColor: 'black', // цвет рамки
      borderRadius: 10, // радиус скругления углов
      margin: 10, //внешний отступ
      padding: 10, // отступ внутри рамки
    }}>

      <ScrollView>

        <AuthorFullName>{data.middle_name + ' ' + data.first_name + ' ' + data.last_name}</AuthorFullName>
        <AuthorImage style={{
          borderWidth: 1, // толщина рамки
          borderColor: 'black', // цвет рамки
          borderRadius: 10, // радиус скругления углов
          margin: 0, //внешний отступ
          justifyContent: 'center',
          width: '100%', aspectRatio: 1

        }} source={{ uri: `http://127.0.0.1:8000/api/authors/${data.id}/image` }} />

        <AuthorDetails style={{
          borderWidth: 1, // толщина рамки
          borderColor: 'black', // цвет рамки
          borderRadius: 10, // радиус скругления углов
          margin: 0, //внешний отступ
          padding: 10
        }}>
          <AuthorText>Дата рождения: {data.date_of_birth}</AuthorText>
          <AuthorText>Страна: {data.country}</AuthorText>
          <AuthorText>Город: {data.city}</AuthorText>
          <AuthorText>Место работы: {data.affiliation}</AuthorText>
          <AuthorBiography>{data.biography}</AuthorBiography>
        </AuthorDetails>

      </ScrollView>

    </View>
  );
};
