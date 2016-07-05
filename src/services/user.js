import {registerApi} from './http';

@registerApi({base: 'api', url: 'users'}, {base: 'idyuh', url: 'user_profiles'})
export class Users {}
