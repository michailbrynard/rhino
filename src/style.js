import { yellow600, grey600, blue300, blue700, white } from 'material-ui/styles/colors';

export const style = {
	card: {
		height: 250,
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
		borderRadius: '10px',
		maxWidth: '500px',
		margin: 'auto'
	},
	balance_card: {
		width: '100%',
		textAlign: 'center',
		display: 'block',
		borderRadius: '10px',
		alignItems: 'center',
		margin: 'auto',
		position: 'relative',
		maxWidth: '500px'
	},
	transaction_card: {
		borderRadius: '10px',
	    maxWidth: '500px',
	    alignItems: 'center',
		margin: 'auto',
		position: 'relative',

	},
	user_nav_view: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0
	},
	drawer_logo: {
		margin: 'auto',
		display: 'block'
	},
	drawer_link: {
		position: 'absolute',
		left: '10%'
	},
	drawer_link_highlight: (path, route) => ({
		backgroundColor: path === route ? blue700 : null
	}),
	drawer_link_icon: (path, route) => ({ 
		color: path === route ? white : blue700, 
		position: 'absolute', 
		left: '40%' 
	}),
	nav_menu_icon: { 
		color: white, 
		position: 'absolute', 
		left: 20, 
		paddingTop: '5px' 
	},
	logout_btn: {
		float: 'right',
		color: 'white',
		zIndex: 104
	}
};
