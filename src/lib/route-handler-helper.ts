// API通信のためのユーティリティ関数
export interface ApiResponse {
  count?: number;
  error?: string;
  message?: string;
  user?: User;
}

// ユーザー作成用の型
export interface CreateUserData {
  email: string;
  name?: string;
  role?: "ADMIN" | "USER";
}

// レスポンスの型定義
export interface User {
  email: string;
  id: string;
  name: null | string;
  role: string;
}

export interface UsersResponse {
  users: User[];
}

// ユーザー関連のAPI
export const userApi = {
  // 単一ユーザー作成
  create: async (userData: CreateUserData): Promise<ApiResponse> => {
    const response = await fetch(`/api/users`, {
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    return response.json() as Promise<ApiResponse>;
  },

  // 複数ユーザー作成
  createMany: async (usersData: CreateUserData[]): Promise<ApiResponse> => {
    const response = await fetch(`/api/users`, {
      body: JSON.stringify(usersData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    return response.json() as Promise<ApiResponse>;
  },

  // 全ユーザー削除
  deleteAll: async (): Promise<ApiResponse> => {
    const response = await fetch(`/api/users`, {
      method: "DELETE",
    });
    return response.json() as Promise<ApiResponse>;
  },

  // ユーザー一覧取得
  getAll: async (): Promise<UsersResponse> => {
    const response = await fetch(`/api/users`, {
      cache: "no-store",
      method: "GET",
    });
    return response.json() as Promise<UsersResponse>;
  },
};

// 投稿関連のAPI
export const postApi = {
  // 全投稿削除
  deleteAll: async (): Promise<ApiResponse> => {
    const response = await fetch(`/api/posts`, {
      method: "DELETE",
    });
    return response.json() as Promise<ApiResponse>;
  },
};
