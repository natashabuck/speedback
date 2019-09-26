import React, { useState } from 'react';
import { Typography, Select, Radio, Form, Button, Row } from 'antd';
import { newColors, allRadius } from './Constants';

const { Item } = Form;
const { Text } = Typography;

const radioStyle = {
	width: '33%',
	textAlign: 'center',
	height: 50,
	display: 'inline-grid',
};

const selectStyle = {
	maxHeight: 220,
	overflow: 'auto',
	textTransform: 'capitalize',
	width: '100%',
};

const Settings = ({
	people,
	setPeople,
	pairTime,
	setPairTime,
	numOfRounds,
	setActive,
	nextRound,
}) => {
	const [error, setError] = useState(false);

	const sessionLength = Math.floor(
		numOfRounds() * pairTime + numOfRounds() * 0.5,
	);

	return (
		<>
			<Row style={{ height: '10%' }}>
				<Text style={{ textAlign: 'center' }}>
					👇 Enter your participants below
				</Text>
			</Row>
			<Row style={{ height: '45%' }}>
				<Item
					validateStatus={error ? 'error' : 'success'}
					help={error ? 'Please enter two or more people to play' : null}
					style={{ marginBottom: 0 }}
				>
					<Select
						mode="tags"
						size="large"
						rows={4}
						placeholder={
							<Text type="secondary" style={{ textTransform: 'initial' }}>
								Press enter after each name
							</Text>
						}
						onChange={present => {
							setPeople(present);
							setError(present.length <= 1 && error);
						}}
						value={people}
						style={selectStyle}
						dropdownRender={menu => (
							<div style={{ display: 'none' }}>{menu}</div>
						)}
					/>
				</Item>
			</Row>
			<Row style={{ height: '25%' }}>
				<label
					style={{ display: 'grid', marginTop: 20, color: newColors.indigo }}
				>
					<Text strong>Minutes per pair</Text>
					<Radio.Group
						buttonStyle="solid"
						onChange={e => setPairTime(e.target.value)}
						defaultValue={pairTime}
					>
						{[3, 4, 5].map(num => (
							<Radio.Button key={num} value={num} style={radioStyle}>
								{`${num}`}
							</Radio.Button>
						))}
					</Radio.Group>
					{people.length !== 0 && (
						<Text
							style={{
								color: newColors.green,
								fontSize: 13,
								lineHeight: 3,
							}}
						>
							This session will last about {sessionLength} minutes.
						</Text>
					)}
				</label>
			</Row>
			<Row
				style={{
					height: '20%',
					display: 'flex',
					flexDirection: 'column-reverse',
				}}
			>
				<Button
					style={{
						borderRadius: allRadius,
						height: 50,
					}}
					size="large"
					type="primary"
					block
					onClick={() => {
						if (people.length > 1) {
							setActive('Pairs');
							nextRound();
						} else setError(true);
					}}
				>
					Begin Session
				</Button>
			</Row>
		</>
	);
};

export default Settings;
