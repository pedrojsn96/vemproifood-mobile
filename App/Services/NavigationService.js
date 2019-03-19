import { NavigationActions } from 'react-navigation';

let _navigator;

/**
 * Set the top level screen to AppNavigation on RootCOntainer.
 * @author samuelmataraso
 * @method setTopLevelNavigator
 * @param object navigatorRef
 * @return func
 */
function setTopLevelNavigator(navigatorRef) {
	_navigator = navigatorRef;
}

/**
 * Manages inter-screen navigation.
 * @author samuelmataraso
 * @method navigate
 * @param object routeName
 * @param object params
 * @param object action
 * @return func
 */
function navigate(routeName, params, action) {
	_navigator.dispatch(
		NavigationActions.navigate({
			type: NavigationActions.NAVIGATE,
			routeName,
			params,
			action
		})
	);
}

export default {
	navigate,
	setTopLevelNavigator
};
