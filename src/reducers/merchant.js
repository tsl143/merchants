export default function Merchant(state = [], action) {

	const tempState = { ...state, isRefresh: false, isSaved: false, isLoading: false, isError: false }
	
	switch(action.type) {
		case 'LOADER':
			return { ...tempState, isLoading: true }
			break;
		case 'LIST':
			const dataList = action.payload.data? action.payload.data : [];
			const count = action.payload.count? action.payload.count : 0;
			return { ...tempState, dataList, count, page: action.payload.page,  }
			break;
		case 'COUNT':
			return { ...tempState, count: action.payload.data }
			break;
		case 'MERCHANT':
			return { ...tempState, merchant: action.payload.data }
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
