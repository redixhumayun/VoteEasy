interface AuthConfig {
	CLIENT_ID: string, 
	CLIENT_DOMAIN: string,
	AUDIENCE: string, 
	REDIRECT: string, 
	SCOPE: string
}

export const AUTH_CONFIG: AuthConfig = {
	CLIENT_ID: 'ww0N09WlByUIVb-VVr6VqvX8Q379gFMO', 
	CLIENT_DOMAIN: 'redixhumayun.auth0.com', 
	AUDIENCE: 'https://redixhumayun.auth0.com/userinfo', 
	REDIRECT: 'http://localhost:4200/callback', 
	SCOPE: 'openid'
};

