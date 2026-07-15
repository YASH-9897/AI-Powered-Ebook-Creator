export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register",
        GET_PROFILE: "/api/auth/profile",
        UPDATE_PROFILE: "/api/auth/profile",
    },

    BOOKS: {
        GET_BOOKS: "/api/books",
        GET_BOOK_BY_ID: (id) => `/api/books/${id}`,
        CREATE_BOOK: "/api/books",
        UPDATE_BOOK: (id) => `/api/books/${id}`,
        DELETE_BOOK: (id) => `/api/books/${id}`,
        UPLOAD_COVER_IMAGE: (id) => `/api/books/cover/${id}`,
    },

    AI: {
        GENERATE_OUTLINE: "/api/ai/generate-outline",
        GENERATE_CHAPTER_CONTENT: "/api/ai/generate-chapter-content",
    },

    EXPORT: {
        PDF: (id) => `/api/export/${id}/pdf`,
        DOC: (id) => `/api/export/${id}/doc`,
    },
};


export default API_PATHS;
