import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import '../styles/slider.css';
import Header from './Header';

class CreateParty extends Component {
	constructor(props) {
		super(props);

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeTime = this.onChangeTime.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.onChangeLocation = this.onChangeLocation.bind(this);
		this.onChangePublic = this.onChangePublic.bind(this);
		this.onChangeAge = this.onChangeAge.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			username: '',
			name: '',
			description: '',
			time: '00:01',
			date: new Date(),
			publicParty: false,
			ageRate: false,
			location: '',
			users: [],
		};
	}

	onSubmit(e) {
		e.preventDefault();
		const party = {
			organiser: this.state.username,
			name: this.state.name,
			description: this.state.description,
			time: this.state.time,
			date: this.state.date,
			publicParty: this.state.publicParty,
			ageRate: this.state.ageRate,
			location: this.state.location,
			attendeesID: [this.state.username],
		};
		console.log(party);
		// this.props.addParty(party)
	}

	onChangeUsername(e) {
		this.setState({
			username: e.target.value,
		});
	}

	onChangeName(e) {
		this.setState({
			name: e.target.value,
		});
	}

	onChangeDescription(e) {
		this.setState({
			description: e.target.value,
		});
	}

	onChangeTime(e) {
		this.setState({
			time: e,
		});
		console.log(e);
	}

	onChangeDate(date) {
		this.setState({
			date: date,
		});
	}

	onChangeLocation(e) {
		this.setState({
			location: e.target.value,
		});
	}

	onChangePublic(e) {
		this.setState({ publicParty: !this.state.publicParty });
	}

	onChangeAge(e) {
		this.setState({ ageRate: !this.state.ageRate });
	}

	render() {
		return (
			<>
				<Header />
				<div>
					<h3>Create New Party</h3>
					<form onSubmit={this.onSubmit}>
						<div className='form-group'>
							<label>Party Name: &nbsp;</label>
							<input
								type='text'
								required
								minLength='7'
								className='form-control'
								style={{ resize: 'both' }}
								value={this.state.name}
								onChange={this.onChangeName}
							/>
						</div>

						<br />
						<div className='form-group'>
							<label>Description: &nbsp;</label>
							<textarea
								type='textarea'
								required
								minLength='7'
								className='form-control'
								style={{ resize: 'both' }}
								value={this.state.description}
								onChange={this.onChangeDescription}
							/>
						</div>

						<br />
						<div className='form-group'>
							<label>Location: &nbsp;</label>
							<textarea
								type='textarea'
								required
								minLength='5'
								className='form-control'
								style={{ resize: 'both' }}
								value={this.state.location}
								onChange={this.onChangeLocation}
							/>
						</div>

						<br />
						<div className='form-group'>
							<div>
								<label>Date: &nbsp;</label>
								<DatePicker
									format='dd-MM-yyyy'
									clearIcon={null}
									value={this.state.date}
									onChange={this.onChangeDate}
									minDate={new Date()}
								/>
							</div>
						</div>

						<br />
						<div className='form-group'>
							<label>Time: &nbsp;</label>
							<TimePicker
								clockIcon={null}
								disableClock={true}
								value={'00:01'}
								clearIcon={null}
								onChange={this.onChangeTime}
							/>
						</div>

						<br />
						<div className='form-group'>
							<label>All Ages/Over 18:&nbsp;</label>
							<label className='switch'>
								<input type='checkbox' onChange={this.onChangeAge} />
								<span className='slider round'></span>
							</label>
						</div>

						<br />
						<div className='form-group'>
							<label>Private/Public:&nbsp;</label>
							<label className='switch'>
								<input type='checkbox' onChange={this.onChangePublic} />
								<span className='slider round'></span>
							</label>
						</div>

						<br />
						<div className='form-group'>
							<input
								type='submit'
								value='Create Party Log'
								className='btn btn-primary'
								onSubmit={this.onSubmit}
							/>
						</div>
					</form>
				</div>
			</>
		);
	}
}

export default CreateParty;
// const mapDispatchToProps = { addParty }
// export default connect({}, mapDispatchToProps)(CreateParty)
