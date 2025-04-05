// src/providers/gitee.ts

/**
 * @module providers/gitee
 */

// 定义配置对象的类型
interface GiteeConfig {
  // 这里可以根据实际情况添加更多配置项
  [key: string]: any;
}

// 定义返回的 OAuth 提供商配置对象的类型
interface GiteeProviderConfig {
  id: string;
  name: string;
  type: string;
  authorization: {
    url: string;
    params: {
      scope: string;
    };
  };
  token: {
    url: string;
    params: {
      grant_type: string;
    };
  };
  userinfo: {
    url: string;
    request: (params: {
      tokens: { access_token: string };
      provider: { userinfo: { url: string } };
    }) => Promise<{
      id: number;
      name?: string;
      login: string;
      email?: string;
      avatar_url: string;
    }>;
  };
  profile: (profile: {
    id: number;
    name?: string;
    login: string;
    email?: string;
    avatar_url: string;
  }) => {
    id: string;
    name: string;
    email?: string;
    image: string;
  };
  options: GiteeConfig;
}

/**
 * 创建 Gitee OAuth 提供商配置
 * @param config - 配置对象
 * @returns Gitee OAuth 提供商配置
 */
export default function Gitee(config: GiteeConfig): GiteeProviderConfig {
  const baseUrl = "https://gitee.com";
  const apiBaseUrl = "https://gitee.com/api/v5";

  return {
    id: "gitee",
    name: "Gitee",
    type: "oauth",
    authorization: {
      url: `${baseUrl}/oauth/authorize`,
      params: { scope: "" },
    },
    token: {
      url: `${baseUrl}/oauth/token`,
      params: {
        grant_type: "authorization_code",
      },
    },
    userinfo: {
      url: `${apiBaseUrl}/user`,
      async request({
        tokens,
        provider,
      }: {
        tokens: { access_token: string };
        provider: { userinfo: { url: string } };
      }) {
        const profile = (await fetch(provider.userinfo?.url as string, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            "User-Agent": "authjs",
          },
        }).then(async (res) => await res.json())) as {
          id: number;
          name?: string;
          login: string;
          email?: string;
          avatar_url: string;
        };

        if (!profile.email) {
          const res = await fetch(`${apiBaseUrl}/user/emails`, {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
              "User-Agent": "authjs",
            },
          });

          if (res.ok) {
            const emails: { primary: boolean; email: string }[] =
              await res.json();
            profile.email = (emails.find((e) => e.primary) ?? emails[0]).email;
          }
        }

        return profile;
      },
    },
    profile(profile: any) {
      return {
        id: profile.id.toString(),
        name: profile.name ?? profile.login,
        email: profile.email,
        image: profile.avatar_url,
      };
    },
    options: config,
  };
}
