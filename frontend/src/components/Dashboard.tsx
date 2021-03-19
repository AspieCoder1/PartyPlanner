import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from '../redux/store';
import { UserState } from '../redux/user-slice';

type IProps = {
	user: UserState;
};

export class Dashboard extends React.Component<IProps, never> {
	render(): React.ReactNode {
		return (
			<div>
				<h1>Dashboard component</h1>
				<p>Hello {this.props.user.userName}</p>
			</div>
		);
	}
}

const mapStateToProps = (state: Store) => ({ user: state.user });
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
