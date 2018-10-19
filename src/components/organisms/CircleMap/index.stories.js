import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CircleMap from '.';

import circleMapArray from './circlemap.json';

const favorite = [{ name: 'お気に入り1', color: 'red', spaceNo: ['ア01', 'ア02'] }, { name: 'お気に入り1', color: 'yellow', spaceNo: ['イ01', 'イ02'] }];

storiesOf('CircleMap', module).add('アとイの一部がお気に入り登録済', () => <CircleMap map={circleMapArray} selectCircle={action('サークル名タップ')} favorite={favorite} />);
