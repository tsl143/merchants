export default function Merchant(state = [], action) {

	const tempState = { ...state, isRefresh: false, isSaved: false }
	
	switch(action.type) {
		case 'LIST':
			const dataList = action.payload.data? action.payload.data : []
			return { ...tempState, dataList, page: action.payload.page }
			break;
		case 'COUNT':
			return { ...tempState, count: action.payload }
			break;
		case 'MERCHANT':
			return { ...tempState, merchant: action.payload }
			break;
		case 'ADD':
			return { ...tempState, saveData: action.payload, isSaved: true }
			break;
		case 'UPDATE':
			return { ...tempState, saveData: action.payload, isSaved: true, isRefresh: true }
			break;
		case 'DELETE':
			return { ...tempState, isRefresh: true }
			break;
		default:
			return tempState;
	}
}
