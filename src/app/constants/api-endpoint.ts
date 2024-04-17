export class ApiEndPoint {
    // HTTP API constant
    public static API_VERSION = 'api/';//'api/v1/';
    public static API_BASE_ENDPOINT = 'http://localhost:8080/' + ApiEndPoint.API_VERSION;
    public static API_LOGIN_ENDPOINT = ApiEndPoint.API_BASE_ENDPOINT + 'login';
}