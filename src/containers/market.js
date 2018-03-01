import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import Loader from '../components/loader'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPerkData } from '../actions'

const Market = ({ data }) => (
	<div className='container'>
		<div className='row'>
		<br/>
			{
				data && data.length > 0 ?
				data.map((item, index) => (
						<div key={index} className='col-12'>
							<Paper style={style.card} zDepth={3}>
								<div className='container'>
									<div className='row'>
										<div className='col-6'>
											<br /><br />
											<img className='container' src='logo.png' />
										</div>
										<div className='col-6 right'>
											<h3>{item.perk_name}</h3>
											<h1>{item.perk_amount} HIVE</h1>
										</div>
									</div>
								</div>
							</Paper>
							<br />
						</div>
				)) :
				<h3>No Perks</h3>
			}
		</div>
	</div>
)

class MarketContainer extends Component {
	componentDidMount() {
		const user_data = JSON.parse(localStorage.getItem('user'))
		this.props.getPerkData(user_data.company)
	}

	render() {
		const { loading, data } = this.props
		return (
			<div>
				{
					loading ?
					<Loader/> :
					<Market data={data}/>
				}
			</div>
		)
	}
}


const style = {
	card: {
		height: 250,
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
		borderRadius: '10px',
		maxWidth: '500px',
		margin: 'auto'
	},
};

function mapStateToProps(state) {
	const { data, loading } = state.perk
	return {
		data,
		loading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getPerkData: bindActionCreators(getPerkData, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketContainer)