/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { View } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import Layout from '../../constants/Layout';

const Labels = ({ slices }) => (
  slices.map((slice, index) => {
    const { pieCentroid, data } = slice;
    return (
      <Text
        key={index}
        x={pieCentroid[0]}
        y={pieCentroid[1]}
        fill="black"
        fontSize={16}
        alignmentBaseline="middle"
        textAnchor="middle"
      >
        {data.value}
      </Text>
    );
  })
);

const WorkOrdersDashboard = () => {
  const data = [50, 10];
  const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);
  const pieData = data
    .filter((value) => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: randomColor(),
      },
      key: `pie-${index}`,
    }));

  return (
    <View style={{ flex: 1, padding: Layout.sizes.padding }}>
      <PieChart style={{ height: 200, marginTop: 100 }} data={pieData} innerRadius="50%">
        <Labels />
      </PieChart>
    </View>
  );
};

export default WorkOrdersDashboard;
