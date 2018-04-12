import { cyan300, yellow600, pink700, white } from 'material-ui/styles/colors';

export const style = {
	card: {
		display: 'flex',
		position: 'relative',
		padding: '30px 40px 25px',
		flexDirection: 'row',
		borderRadius: '0px',
		maxWidth: '500px',
		alignItems: 'center',
		backgroundColor: white
	},
	card_header: {
		display: 'flex',
		position: 'relative',
		padding: '10px 10px 10px',
		flexDirection: 'row',
		borderRadius: '0px',
		maxWidth: '500px',
		alignItems: 'center',
		backgroundColor: white
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
		width: '80%'
	},
	card_transactions_img: {
		width: '10%',
		float: 'left',
		paddingTop: '20px',
		paddingRight: '15px'

	},
	card_navigation_img: {
		width: '10%',
		float: 'left',
		paddingTop: '15px',
		paddingRight: '15px'

	},
	card_navigation_img2: {
		width: '10%',
		float: 'left',
		paddingRight: '15px'

	},
	balance_card: {
		textAlign: 'center',
		borderRadius: '0px',
		alignItems: 'center',
		padding: '30px 15px 25px',
		position: 'relative',
		maxWidth: '500px',
		backgroundColor: white

	},
	transaction_card: {
		borderRadius: '0px',
		maxWidth: '500px',
		alignItems: 'center',
		padding: '30px 40px',
		position: 'relative',
		backgroundColor: white

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
		left: '20%'
	},
	drawer_link_highlight: (path, route) => ({
		backgroundColor: path === route ? pink700 : null,
		color: path === route ? white : null,
	}),
	drawer_link_icon: (path, route) => ({ 
		color: path === route ? cyan300 : yellow600,
		position: 'absolute', 
		left: '40%' 
	}),
	nav_menu_icon: { 
		color: pink700, 
		position: 'absolute', 
		left: 20, 
		paddingTop: '5px' 
	},
	settings_card: {
		borderRadius: '0px',
		maxWidth: '500px',
		alignItems: 'center',
		padding: '0 0 30px',
		position: 'relative'
	},
	settings_close: {
		position: 'absolute',
		right: '5%', 
		top: 15
	},
	logout_btn: {
		float: 'right',
		color: 'white',
		zIndex: 104
	}
};
