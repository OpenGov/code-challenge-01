import {
  PROJECTS_REQUEST,
  PROJECTS_SUCCESS,
  PROJECTS_ERROR,
  ADD_PROJECT,
  UPVOTE_PROJECT
} from './constants';
import { sortProjectsByName, objectToArray } from './utils';

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
      const sortedProjects = sortProjectsByName(action.projects)

      return {
        ...state,
        projects: sortedProjects,
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


      const allProjects = {
        ...state.projects,
        [newProject.id]: newProject
      }

      const allProjArray = objectToArray(allProjects)
      const sorted = sortProjectsByName(allProjArray)

      return {
        ...state,
        projects: {
          ...sorted
        }
      };
    case UPVOTE_PROJECT:
      const projectClicked = objectToArray(state.projects).filter(proj => proj.id === action.project.id)[0]
      projectClicked.votes = projectClicked.votes + 1

      return {
        ...state
      }
    default:
      return state;
  }
}
