export class ApiEndPoint {
    // HTTP API constant
    public static API_VERSION = 'api/';//'api/v1/';
    public static API_BASE_ENDPOINT = 'http://localhost:8080/' + ApiEndPoint.API_VERSION;
    public static API_REGISTER_ENDPOINT = ApiEndPoint.API_BASE_ENDPOINT + 'auth/register';
    public static API_LOGIN_ENDPOINT = ApiEndPoint.API_BASE_ENDPOINT + 'auth/login';
    public static API_ALL_EMPLOYEE_ENDPOINT = ApiEndPoint.API_BASE_ENDPOINT + 'employee_info/get_all';
    public static API_ADD_EMPLOYEE_ENDPOINT = ApiEndPoint.API_BASE_ENDPOINT + 'employee_info/add';
    public static API_UPDATE_EMPLOYEE_ENDPOINT = ApiEndPoint.API_BASE_ENDPOINT + 'employee_info/update';
}