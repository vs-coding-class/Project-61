import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import db from '../config';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allStudents: [],
    };
  }

  componentDidMount() {
    var ref = db.ref('/').on('value', (data) => {
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

  updateAttendance(rollNumber, status) {
    var id = rollNumber;

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;

    var ref = db.ref(id + '/');
    ref.update({
      "hereornot": status + " " + today,
    });
  }

  render() {
    return (
      <View style={{ backgroundColor: 'orange' }}>
        {this.state.allStudents.map((element) => {
          return (
            <View>
              <Text style={styles.namebutton}>{element.name}</Text>

              <TouchableOpacity
                style={styles.presentButton}
                onPress={() => {
                  this.updateAttendance(element.number, 'present');
                }}>
                <Text style={{ color: 'navy' }}>Present</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.absentButton}
                onPress={() => {
                  this.updateAttendance(element.number, 'absent');
                }}>
                <Text style={{ color: 'navy' }}>Absent</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        <View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              this.props.navigation.navigate('SummaryScreen');
            }}>
            <Text style={{ color: '#837A75' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  namebutton: {
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
  presentButton: {
    marginTop: '-50px',
    marginBottom: '70px',
    marginLeft: '45%',
    border: '1px solid black',
    width: '20%',
    height: '20%',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'olive',
  },
  absentButton: {
    marginTop: '-100px',
    marginBottom: '70px',
    marginLeft: '75%',
    border: '1px solid black',
    width: '20%',
    height: '20%',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  submitButton: {
    border: '2px solid #56203D',
    borderRadius: 20,
    padding: '20px',
    alignSelf: 'center',
    fontSize: '20px',
    backgroundColor: '#D7E8BA',
    textAlign: 'center',
    justifyContent: 'center',
    width: '50%',
  },
});
