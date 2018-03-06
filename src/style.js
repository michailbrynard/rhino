import { yellow600, grey600, blue300, blue700, white } from 'material-ui/styles/colors';

export const style = {
	card: {
		display: 'flex',
		position: 'relative',
		padding: '30px 40px 25px',
		flexDirection: 'row',
		borderRadius: '10px',
		maxWidth: '500px',
		alignItems: 'center'
	},
	card_right: {
		width: '200px',
		alignItems: 'center'
	},
	card_left: {
		width: '200px',
		alignItems: 'center',
		textAlign: 'center',
		paddingRight: '20px'
	},
	card_left_img: {
		width: '100%'
	},
	balance_card: {
		textAlign: 'center',
		borderRadius: '10px',
		alignItems: 'center',
		padding: '30px 15px 25px',
		position: 'relative',
		maxWidth: '500px'
	},
	transaction_card: {
		borderRadius: '10px',
	  maxWidth: '500px',
	  alignItems: 'center',
		padding: '30px 40px',
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
		left: '60%'
	},
	drawer_link_highlight: (path, route) => ({
		backgroundColor: path === route ? yellow600 : null
	}),
	drawer_link_icon: (path, route) => ({ 
		color: path === route ? white : yellow600, 
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
