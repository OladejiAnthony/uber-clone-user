import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const statuses = [
  {
    status: 'Package Received',
    date: '04-12-2024',
    time: '13:33',
    description: 'Your package has been signed for in Macaulay road, off Tunnise road, Lagos state.',
  },
  {
    status: 'Delivery in Progress',
    date: '04-12-2024',
    time: '13:33',
    description: 'Your package is on the way to Macaulay road, off Tunnise road.',
  },
  {
    status: 'Package Shipped',
    date: '04-12-2024',
    time: '13:33',
    description: 'Your package has been sent out by the seller to be delivered to Macaulay road, off Tunnise road.',
  },
  {
    status: 'Ordered',
    date: '04-12-2024',
    time: '13:33',
    description: 'You placed an order to be delivered to Macaulay road, off Tunnise road.',
  },
];



const Timeline = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {statuses.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.line} />
            <Icon name="circle" size={10} color={index === 0 ? 'orange' : 'gray'} />
            <View style={styles.line} />
          </View>
          
          <View style={styles.contentContainer}>
            <Text style={[styles.status, index === 0 && styles.activeStatus]}>{item.status}</Text>
            <Text style={[styles.date, index === 0 && styles.activeStatus]}>{item.date} {item.time}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 100,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  line: {
    width: 2,
    height: 70,
    backgroundColor: 'gray',
  },
  contentContainer: {
    flex: 1,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  activeStatus: {
    color: 'orange',
  },
  date: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Timeline;
