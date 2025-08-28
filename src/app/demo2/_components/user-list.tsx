"use client";

import type { User } from "@/lib/route-handler-helper";
import { useEffect } from "react";
import { postApi, userApi } from "@/lib/route-handler-helper";
import { useState } from "react";

function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      // Route Handlerを使用して投稿を削除
      await postApi.deleteAll();

      // Route Handlerを使用してユーザーを削除
      await userApi.deleteAll();

      // ユーザー作成（API経由）
      await userApi.create({
        email: "alice@example.com",
        name: "Alice",
        role: "ADMIN",
      });

      // 複数ユーザー作成（API経由）
      await userApi.createMany([
        {
          email: "bob@example.com",
          name: "Bob",
          role: "USER",
        },
        {
          email: "charlie@example.com",
          name: "Charlie",
          role: "USER",
        },
        {
          email: "eve@example.com",
          name: "Eve",
          role: "USER",
        },
        {
          email: "dave@example.com",
          role: "USER",
        },
      ]);

      // ユーザー一覧取得
      const data = await userApi.getAll();
      setUsers(data.users);
    }

    void fetchUsers();
  }, []);

  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">名前</th>
          <th className="border border-gray-300 px-4 py-2">メール</th>
          <th className="border border-gray-300 px-4 py-2">ロール</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr className="hover:bg-gray-50" key={user.id}>
            <td className="border border-gray-300 px-4 py-2">
              {user.name ?? "未設定"}
            </td>
            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
            <td className="border border-gray-300 px-4 py-2">{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserList;
