export const EDIT_USER_INFO = 'EDIT_USER_INFO';
export function editUserInfo(userInfo) {
  return {
    type: EDIT_USER_INFO,
    payload: userInfo
  };
}

export const EDIT_PROFILE = 'EDIT_PROFILE';
export function editProfile() {
  console.log('in edit');
  return { type: EDIT_PROFILE };
}
export const VIEW_PROFILE = 'VIEW_PROFILE';
export function viewProfile() {
  return { type: VIEW_PROFILE };
}
