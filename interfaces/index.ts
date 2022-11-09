
export interface IAction {
  payload?: any
}

type T = string | number | null

export interface IFormState {
  sort_by?: string,
  release_date?: {
    from?: T
    to?: T
  },
  vote_average?: {
    from?: T
    to?: T
  },
  with_genres?: string
}