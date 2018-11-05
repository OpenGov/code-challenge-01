import {
  PROJECTS_REQUEST,
  PROJECTS_SUCCESS,
  PROJECTS_ERROR,
  ADD_PROJECT,
  UPVOTE_PROJECT
} from './constants';

const initialState = {
  loading: false,
  error: false,
  projects: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };
    case PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.projects.reduce((projects, project) => {
          projects[project.id] = project;
          return projects;
        }, {}),
        loading: false,
        error: false
      };
    case PROJECTS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case ADD_PROJECT:
      const newProject = {
        id: Object.keys(state.projects).length + 1,
        name: action.projectName,
        votes: 0
      };

      return {
        ...state,
        projects: {
          ...state.projects,
          [newProject.id]: newProject
        }
      };
    case UPVOTE_PROJECT:
      const projectClicked = state.projects[action.project.id]
      const upvotedProj = Object.assign({}, projectClicked, { votes: projectClicked.votes + 1 })

      return {
        ...state,
        projects: {
          ...state.projects,
          [action.project.id]: upvotedProj
        }
      }
    default:
      return state;
  }
}
