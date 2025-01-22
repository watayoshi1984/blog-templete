interface Env {
  // Cloudflare Workersの環境変数の型定義
  TURNSTILE_SECRET_KEY: string;
}

export interface RequestData {
  request: Request;
  env: Env;
  params: any;
}

export const onRequestPost = async ({ request, env }: RequestData) => {
  try {
    const formData = await request.formData();
    const turnstileResponse = formData.get('cf-turnstile-response');

    // Turnstileトークンの検証
    const turnstileVerification = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileResponse,
        }),
      }
    );

    const outcome = await turnstileVerification.json();
    if (!outcome.success) {
      return new Response(
        JSON.stringify({ success: false, error: '認証に失敗しました' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // メール送信の設定
    const emailData = {
      to: 'yoshiki@wanatabe.uk',
      subject: `[お問い合わせ] ${subject}`,
      text: `
名前: ${name}
メールアドレス: ${email}
件名: ${subject}

メッセージ:
${message}
      `
    };

    // Cloudflare Email Routingを使用してメールを送信
    await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: emailData.to }],
          },
        ],
        from: {
          email: 'noreply@yourdomain.com',
          name: 'お問い合わせフォーム',
        },
        subject: emailData.subject,
        content: [
          {
            type: 'text/plain',
            value: emailData.text,
          },
        ],
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}; 