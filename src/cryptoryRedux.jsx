// The types of actions that you can dispatch to modify the state of the store
export const types = {
  ADD_TERM: "ADD_TERM",
  ADD_RELEVANT: "ADD_RELEVANT",
  REMOVE_RELEVANT: "REMOVE_RELEVANT",
  BACKUP_RELEVANT: "BACKUP_RELEVANT",
  RESTORE_RELEVANT: "RESTORE_RELEVANT",
  UPDATE_CHATS: "UPDATE_CHATS",
  CLEAR_MESSAGES: "CLEAR_MESSAGES",
  TOGGLE_RELEVANT: "TOGGLE_RELEVANT",
  TOGGLE_NORMAL: "TOGGLE_NORMAL",
  FETCH_RESULTS: "FETCH_RESULTS",
  SET_RESULTS: "SET_RESULTS",
  HAS_ERRORED: "HAS_ERRORED",
  LOADED: "LOADED",
  INITIAL: "INITIAL",
  ENSURE_LOGIN: "LOGGED_IN",
  SET_USER: "SET_USER",
  SET_MESSAGES: "SET_MESSAGES",
  SET_MESSAGE: "SET_MESSAGE",
  LOGIN_STATUS: "LOGIN_STATUS",
  CHAT_STATUS: "CHAT_STATUS",
  FETCH_USER: "FETCH_USER",
  SAVE_USER: "SAVE_USER",
  FETCH_CHATS: "FETCH_CHATS",
  ADD_MESSAGE: "ADD_MESSAGE",
  PROFILE_STATUS: "PROFILE_STATUS",
  SEND_CHAT: "SEND_CHAT"
};

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  setMessages: item => {
    return {type: types.SET_MESSAGES, payload: item};
  },
  setMessage: item => {
    return {type: types.SET_MESSAGE, payload: item};
  },
  add_relevant: item => {
    return {type: types.ADD_RELEVANT, payload: item};
  },
  remove_relevant: index => {
    return {type: types.REMOVE_RELEVANT, payload: index};
  },
  toggle_login: bool => {
    return {type: types.REMOVE_RELEVANT, payload: index};
  },
  setUser: user => {
    return {type: types.SET_USER, payload: user};
  },
  setLoginStatus: bool => {
    return {type: types.LOGIN_STATUS, payload: bool};
  },
  setChatStatus: item => {
    return {type: types.CHAT_STATUS, payload: item};
  },
  setProfileStatus: item => {
    return {type: types.PROFILE_STATUS, payload: item};
  },
  clearMessages: () => {
    return {type: types.CLEAR_MESSAGES};
  },
  fetchUser: (id) => {
    return dispatch => {
      dispatch(actionCreators.setProfileStatus('INITIAL'))
      const url = `/api/user/${id}`
      return fetch(url)
        .then(resp => {
          if (resp.ok) {
            resp.json().then(data => {
              console.log('props from express', data)
              fetch(`api/user/${user.data}`).then(response => {
                if (response.ok) {
                  response.json().then(data => {
                    dispatch(actionCreators.setUser(data))
                  });
                } else {
                  response.json().then(error => {
                    dispatch(actionCreators.hasError(true))
                  });
                }
              }).catch(err => {
                dispatch(actionCreators.hasError(true))
                throw(e)
              });
            }).catch((e) => {
              dispatch(actionCreators.hasError(true))
              throw(e)
            })

          }
        })
    }
  },
  updateChats: data => {
    return dispatch => {
        dispatch(actionCreators.setProfileStatus('INITIAL'))
        dispatch(actionCreators.setMessages(data))
    }
  },
  saveUser: (id, following) => {
    return dispatch => {
      const url = `api/user/save/${id}/${following}`
      return fetch(url).then().catch()
    }
  },
  fetchChats: () => {
    return dispatch => {
      const url = `/chats`
      dispatch(actionCreators.setChatStatus('LOADING'))
      dispatch(actionCreators.clearMessages())
      return fetch(url)
        .then(resp => {
          if (resp.ok) {
            resp.json().then(chats => {
              chats.map(chat => dispatch(actionCreators.addMessage(chat)))
            }).catch((e) => {
              dispatch(actionCreators.hasError(true))
              throw(e)
            })
            dispatch(actionCreators.setChatStatus('LOADED'))
          }
        }).catch((e) => {
          dispatch(actionCreators.hasError(true))
          throw(e)
        })
    }
  },
  sendMessage: (usr, msg, avatar) => {
    return dispatch => {
      // dispatch(actionCreators.setChatStatus('INITIAL'))
      fetch(`/chats/${usr}/${msg}/${avatar}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: usr, name: msg, avatar: avatar}),
      }).then(response => {
        if (response.ok) {
          dispatch(actionCreators.fetchChats())
        } else {
          response.json().then(error => {
            dispatch(actionCreators.hasError(true))
          });
        }
      }).catch(err => {
        dispatch(actionCreators.hasError(true))
      });
    }

    //   console.log('send message received', msg)
    //   return fetch('/chats', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       msg: msg
    //     }),
    //     headers: {"Content-Type": "application/json"}
    //   })
    //     .then(function (response) {
    //       return response.json()
    //     }).then(function (body) {
    //       console.log(body);
    //       dispatch(actionCreators.hasError(true))
    //     });
    // }
  },
  addMessage: item => {
    return {type: types.ADD_MESSAGE, payload: item}
  },
  toggle_relevant: (bool) => {
    return dispatch => {
      if (!bool) {
        dispatch(actionCreators.backup_relevant())
        dispatch(actionCreators.clear_relevant())
      } else {
        dispatch(actionCreators.restore_relevant())
      }
    }
  },
  backup_relevant: () => {
    return {type: types.BACKUP_RELEVANT}
  },
  restore_relevant: () => {
    return {type: types.RESTORE_RELEVANT}
  },
  hasError: bool => {
    return {type: types.HAS_ERRORED, payload: bool}
  },
  toggle_normal: bool => {
    return {type: types.TOGGLE_NORMAL, payload: bool}
  }
};

// Initial state of the store
const initialState = {
  loginStatus: false,
  user: {},
  term: '',
  message: '',
  results: [],
  relevantDocs: [],
  backupRelevantDocs: [],
  status: 'INITIAL',
  chatStatus: 'INITIAL',
  error: false,
  normalToggle: false,
  relevantToggle: false,
  endpointTicker: 'http://localhost:4001',
  endpointChat: 'http://localhost:4002',
  currencies: [],
  messages: []
  // currencies: {
  //   'BTC': {
  //     'SEK': {
  //       'current': '',
  //       'last': '',
  //     },
  //     'USD': {
  //       'current': '',
  //       'last': ''
  //     },
  //     'EUR': {
  //       'current': '',
  //       'last': ''
  //     }
  //   },
  //   'ETH': {
  //     'SEK': {
  //       'current': '',
  //       'last': '',
  //     },
  //     'USD': {
  //       'current': '',
  //       'last': ''
  //     },
  //     'EUR': {
  //       'current': '',
  //       'last': ''
  //     }
  //   },
  //   'ALT': {
  //     'SEK': {
  //       'current': '',
  //       'last': '',
  //     },
  //     'USD': {
  //       'current': '',
  //       'last': ''
  //     },
  //     'EUR': {
  //       'current': '',
  //       'last': ''
  //     }
  //   }
  // },
  // coins: [
  //   {
  //     id: 1,
  //     name: 'BTC',
  //     prices: [
  //       {
  //         id: 1,
  //         name: 'SEK',
  //         data: [
  //           {
  //             id: 1,
  //             current: this.state.currencies['BTC']['SEK']['current'],
  //           },
  //           {
  //             id: 2,
  //             last: this.state.currencies['BTC']['SEK']['last']
  //           }
  //         ],
  //       },
  //       {
  //         id: 2,
  //         name: 'EUR',
  //         data: [
  //           {
  //             id: 1,
  //             current: this.state.currencies['BTC']['EUR']['current'],
  //           },
  //           {
  //             id: 2,
  //             last: this.state.currencies['BTC']['EUR']['last']
  //           }
  //         ],
  //       },
  //       {
  //         id: 3,
  //         name: 'USD',
  //         data: [
  //           {
  //             id: 1,
  //             current: this.state.currencies['BTC']['USD']['current'],
  //           },
  //           {
  //             id: 2,
  //             last: this.state.currencies['BTC']['USD']['last']
  //           }
  //         ],
  //       }
  //     ]
  //   },
  //
  //
  // ],
}


// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const reducer = (state = initialState, action) => {
  const {profile} = state;
  const {type, payload} = action;

  switch (type) {
    case types.ADD_MESSAGE: {
      return {
        ...state,
        messages: [payload, ...state.messages]
      };
    }
  }
  switch (type) {
    case types.CHAT_STATUS: {
      return {
        ...state,
        chatStatus: payload
      };
    }
  }
  switch (type) {
    case types.LOGIN_STATUS: {
      return {
        ...state,
        loginStatus: payload
      };
    }
    case types.ENSURE_LOGIN: {
      return {
        ...state,
        login_status: state.login_status
      };
    }
    case types.FETCH_USER: {
      return {
        ...state,
        loginStatus: false,
        status: 'LOADING'
      };
    }
    case types.SAVE_USER: {
      return {
        ...state,
        loginStatus: false
      };
    }
    case types.CLEAR_MESSAGES: {
      return {
        ...state,
        messages: []
      };
    }
    case types.FETCH_CHATS: {
      return {
        ...state,
        chatStatus: 'LOADING',
      };
    }
    case types.UPDATE_CHATS: {
      return {
        ...state,
        messages: payload,
        chatStatus: 'EMIT'
      };
    }
    case types.SEND_CHAT: {
      return {
        ...state,
        chatStatus: 'LOADING'
      };
    }
    case types.SET_USER: {
      return {
        ...state,
        status: 'LOADED',
        loginStatus: true,
        user: payload
      };
    }
    case types.SET_MESSAGE: {
      return {
        ...state,
        message: payload,
      };
    }
    case types.SET_MESSAGES: {
      return {
        ...state,
        messages: payload,
        chatStatus: 'LOADED'
      };
    }
    case types.ADD_TERM: {
      return {
        ...state,
        term: payload
      };
    }
    case types.ADD_RELEVANT: {
      return {
        ...state,
        relevantDocs: [...state.relevantDocs, payload]
      };
    }
    case types.REMOVE_RELEVANT: {
      return {
        ...state,
        relevantDocs: state.relevantDocs.filter(item => item !== payload)
      };
    }
    case types.CLEAR_RELEVANT: {
      return {
        ...state,
        relevantToggle: false,
        relevantDocs: []
      };
    }
    case types.BACKUP_RELEVANT: {
      return {
        ...state,
        backupRelevantDocs: state.relevantDocs,
      };
    }
    case types.RESTORE_RELEVANT: {
      return {
        ...state,
        relevantDocs: state.backupRelevantDocs,
        relevantToggle: true
      };
    }
    case types.TOGGLE_RELEVANT: {
      return {
        ...state,
      };
    }
    case types.TOGGLE_NORMAL: {
      return {
        ...state,
        normalToggle: payload
      };
    }
    case types.CONVERT_RELEVANT: {
      return {
        ...state,
        results: {
          ...state.results,
          hits: {
            ...state.results.hits,
            hits: payload
          }
        }
      };
    }
    case types.SET_RESULTS: {
      return {
        ...state,
        results: payload,
        loading: types.LOADED
      };
    }
    case types.FETCH_RESULTS: {
      return {
        ...state,
        loading: true
      }
    }
    case types.HAS_ERRORED: {
      return {
        ...state,
        error: payload
      }
    }
  }
  return state;
};

