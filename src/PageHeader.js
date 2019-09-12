import React, { useState } from 'react';
import { Typography, Row, Button, Modal } from 'antd';
import { pageInstructions, newColors } from './Constants';

const { Title, Text } = Typography;
const blue = { color: '#1890ff' };

const PageHeader = ({
	currentRound,
	active,
	setActive,
	numOfRounds,
	setCurrentRound,
	setPeople,
}) => {
	const [visible, setVisible] = useState(false);

	const instruction = pageInstructions[active].title;

	const getTitle = () => {
		if (active === 'Settings') return 'Welcome to Speedback';
		if (active === 'Feedback') return 'Thank you!';
		else return null;
	};

	return (
		<>
			<Row type="flex" justify="space-between">
				<Title
					level={3}
					style={{
						fontWeight: 600,
						textTransform: 'uppercase',
						letterSpacing: 4,
						color: '#fff',
					}}
				>
					{getTitle() ? (
						getTitle()
					) : (
						<>
							Round {currentRound} of {numOfRounds()}
						</>
					)}
				</Title>
				{active !== 'Settings' && (
					<Button
						shape="circle"
						icon="close"
						style={{ color: '#555353', border: '1px solid #555353' }}
						onClick={() => setVisible(true)}
					/>
				)}
			</Row>
			<Text style={{ fontSize: 17, color: newColors.indigo }}>
				<span
					style={{
						backgroundColor: '#fff',
						borderRadius: '50%',
						padding: 7,
						marginRight: 7,
					}}
				>
					👇
				</span>
				{instruction}
			</Text>
			<Modal
				visible={visible}
				onCancel={() => setVisible(false)}
				onOk={() => {
					setVisible(false);
					setActive('Settings');
					setCurrentRound(0);
				}}
				style={{ maxWidth: 360 }}
			>
				<Text>
					<span style={{ fontWeight: 600, fontSize: 16 }}>Exit session?</span>
					<br />
					<br />
					Are you sure you want to exit this session? All progress will be lost!
				</Text>
			</Modal>
		</>
	);
};

export default PageHeader;
