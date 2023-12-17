import styled from 'styled-components/native';

const AuthorView = styled.View`
  flex-direction: row;
`;

const AuthorImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 12px;
`;

const AuthorDetails = styled.View`
  flex: 1;
  justify-content: center;
`;

const AuthorFullName = styled.Text`
  font-size: 14px;
  font-weight: 400;
`;

const AuthorDate = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 2px;
`;

const AuthorCountry = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 2px;
`;

const truncateTitle = (str) => {
  if (str.length >= 50) {
    return str.substring(0, 50) + '...';
  }

  return str;
};

// date-fns => format

export const AuthorCard = ({ id, middleName, firstName, lastName, imageUrl, dateBirth, country }) => {
  return (
    <AuthorView style={{
      borderWidth: 1, // толщина рамки
      borderColor: 'black', // цвет рамки
      borderRadius: 10, // радиус скругления углов
      margin: 10,
      padding: 10,
      marginBottom: 0,
    }}>
      <AuthorImage source={{ uri: `http://127.0.0.1:8000/api/authors/${id}/image` }} />
      <AuthorDetails>
        <AuthorFullName>{truncateTitle(middleName + ' ' + firstName + ' ' + lastName)}</AuthorFullName>
        <AuthorDate>Дата рождения: {new Date(dateBirth).toLocaleDateString()}</AuthorDate>
        <AuthorCountry>Страна: {country}</AuthorCountry>
      </AuthorDetails>
    </AuthorView>
  );
};
