import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import db from '../config';

export default class SummaryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allStudents: [],
    };
  }

  async componentDidMount() {
    var reference = db.ref('/').on('value', async (data) => {

      var students = [];
      var classPeople = data.val();

      for (var i in classPeople) {
        students.push(classPeople[i]);
      }

      students.sort(function (a, b) {
        return a.number - b.number;
      });

      this.setState({ allStudents: students });
    });
  }

  render() {
    return (
      <View style={{ backgroundColor: 'orange' }}>
        {this.state.allStudents.map((element) => {
          return (
            <View>
              <Text style={styles.name}>{element.name}</Text>
              <Text style = {styles.status}>{element.hereornot.slice(0,7)}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    border: '2px solid blue',
    borderRadius: 20,
    padding: '5px',
    marginTop: '50px',
    marginLeft: '5%',
    fontSize: '20px',
    color: '#F9EEA6',
    backgroundColor: '#0B9FAD',
    textAlign: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  status: {
    border: '2px solid #F7EF99',
    borderRadius: 20,
    padding: '5px',
    marginTop: "-50px",
    marginBottom: "20px",
    marginLeft: '50%',
    fontSize: '20px',
    color: '#F78E69',
    backgroundColor: '#5D675B',
    textAlign: 'center',
    justifyContent: 'center',
    width: '30%',
  },
});
