// Cloudflare Pages Function: 跨设备访问量统计（基于 KV 持久化）
// 部署后在 Cloudflare Dashboard 绑定 KV namespace 到变量名 VISITS

interface Env {
  VISITS: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;

  // KV 未绑定时返回友好提示（本地开发或未配置时）
  if (!env.VISITS) {
    return new Response(
      JSON.stringify({ count: 0, error: 'KV_NOT_BOUND' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  // 读取当前计数并 +1
  const current = parseInt((await env.VISITS.get('count')) || '0', 10);
  const next = current + 1;
  await env.VISITS.put('count', String(next));

  return new Response(JSON.stringify({ count: next }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store',
    },
  });
};
