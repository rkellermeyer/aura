import {registerApi} from './http';


@registerApi({base:'idyuh', url:'project_profiles'}, {base:'api', url:'projects'})
export class Project {}
