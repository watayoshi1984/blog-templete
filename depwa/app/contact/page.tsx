'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // メール送信のシミュレーション
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);

      // 5秒後にホームページにリダイレクト
      setTimeout(() => {
        router.push('/');
      }, 5000);
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4">送信完了</h2>
              <p className="text-gray-600 mb-4">
                お問い合わせありがとうございます。
                5秒後にホームページに移動します。
              </p>
              <Button asChild>
                <Link href="/">ホームページに戻る</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">お問い合わせ</h1>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="prose max-w-none mb-8">
                <p>
                  バグ報告や機能リクエストなど、お気軽にお問い合わせください。
                  一般的な質問については、
                  <Link href="/faq" className="text-blue-600 hover:underline">
                    FAQページ
                  </Link>
                  をご確認ください。
                </p>
                <p className="text-sm text-gray-500">
                  ※ 緊急の対応はできかねますが、X（@Watayoshi1984）のDMでも受け付けています。
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    お名前
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={e =>
                      setFormData(prev => ({ ...prev, name: e.target.value }))
                    }
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    メールアドレス
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={e =>
                      setFormData(prev => ({ ...prev, email: e.target.value }))
                    }
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    お問い合わせ内容
                  </label>
                  <Select
                    value={formData.subject}
                    onValueChange={value =>
                      setFormData(prev => ({ ...prev, subject: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bug">バグ・エラー報告</SelectItem>
                      <SelectItem value="feature">機能リクエスト</SelectItem>
                      <SelectItem value="other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    詳細
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={e =>
                      setFormData(prev => ({ ...prev, message: e.target.value }))
                    }
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      送信中...
                    </>
                  ) : (
                    '送信'
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

