export const JWT_SECRET = "its-a-secret"
export const JWT_REFRESH_SECRET = "its-a-refresh-secret"

export const JWT_OPTIONS = {
    accessToken: {
        expiresIn: '15m'
    },
    refreshToken: {
        expiresIn: '7d'
    }
} 