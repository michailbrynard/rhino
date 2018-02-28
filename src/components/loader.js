import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import CircularProgress from 'material-ui/CircularProgress';


const style = {
	refresh: {
		display: 'inline-block',
		position: 'relative'
	},
	loading: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100vh',
		width: '85%'
	}
};

const RefreshLoader = () => (
	<div style={style.loading}>
		<RefreshIndicator
			size={50}
			left={70}
			top={0}
			loadingColor="#FF9800"
			status="loading"
			style={style.refresh}
		/>
	</div>
);

export default RefreshLoader;

export const SmallLoader = () => (
	<CircularProgress />
)