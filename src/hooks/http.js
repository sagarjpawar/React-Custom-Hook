import { useReducer, useCallback } from 'react';

const httpReducer = (state, action) => {
    switch (action.type) {
        case 'SEND':
            return { ...state, loading: true };
        case 'RESPONSE':
            return { ...state, loading: false, ...action.payload };
        case 'ERROR':
            return { loading: false, errorMsg: action.errorMsg };
        case 'CLEAR':
            return { ...intialState };
        default:
            return state;
    }
};
const intialState = {
    loading: false,
    errorMsg: null,
    responseObj: null,
    reqExtra: null,
    reqIdentifer: null,
    sentRequest: () => { }
}

function useHttp() {
    const [httpState, httpDispatch] = useReducer(httpReducer, intialState);

    const sentRequest = function (url, method, body, reqExtra, reqIdentifer) {
        httpDispatch({ type: 'SEND' });
        fetch(url, {
            method: method,
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((responseObj) => {
                // dispatch({ type: 'ADD', ingredient });
                httpDispatch({ type: 'RESPONSE', payload: { responseObj, reqExtra, reqIdentifer } });
            });
    };
    const onClear = useCallback(() => {
        httpDispatch({ type: 'CLEAR' });
      }, []);

    return {
        loading: httpState.loading,
        errorMsg: httpState.errorMsg,
        responseObj: httpState.responseObj,
        reqExtra: httpState.reqExtra,
        reqIdentifer: httpState.reqIdentifer,
        sentRequest: sentRequest,
        clear: onClear
    };
}

export default useHttp;