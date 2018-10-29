import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { graphql } from 'react-apollo';

import { USERS_QUERY } from '../graphql/users.query';

/* const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
    flex: 1,
  },
  tendencyContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  userName: {
    fontWeight: 'bold',
    flex: 0.7,
  },
}); */
const Tendency = ({ users: { id, username } }) => (
  <TouchableHighlight key={id}>
    <View>
      <Text>{username}</Text>
    </View>
  </TouchableHighlight>
);
Tendency.propTypes = {
  users: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
  }),
};
class Tendencies extends Component {
  /* static navigationOptions = {
    title: '',
  }; */

  keyExtractor = item => item.id.toString();

  renderItem = ({ item }) => <Tendency users={item} />;

  render() {
    const { users } = this.props;
    console.log('dlfkhghpdfh', users);
    return (
      <View>
        <FlatList
          data={users.slice().reverse()}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
Tendencies.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      album: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
        }),
      ),
    }),
  ),
};
const usersQuery = graphql(USERS_QUERY, {
  options: () => ({}), // fake the user for now
  props: ({ data: { users } }) => ({
    users: users || [],
  }),
});
export default usersQuery(Tendencies);
