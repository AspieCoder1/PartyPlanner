import * as React from 'react';

type Props = {
	getParties: () => void;
};

class MyParties extends React.Component<Props, unknown> {
	componentDidMount() {
		this.props.getParties();
	}

	render(): React.ReactNode {
		return (
			<>
				<h1>My Parties</h1>
			</>
		);
	}
}


export default MyParties;