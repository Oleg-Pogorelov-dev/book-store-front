import { FETCHED_MY_PROFILE, REQUESTED_MY_PROFILE, REQUESTED_MY_PROFILE_SUCCEEDED } from "./actions"

export const getMyProfile = () => {
  return { type: FETCHED_MY_PROFILE }
}

export const requestMyProfile = () => {
  return { type: REQUESTED_MY_PROFILE }
}

export const requestMyProfileSuccess = (data) => {
  return { type: REQUESTED_MY_PROFILE_SUCCEEDED, data }
}